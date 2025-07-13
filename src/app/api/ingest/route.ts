import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { sendSensorData } from '../../lib/websocket';

const prisma = new PrismaClient();

const minifiedIngestSchema = z.object({
  V: z.array(z.object({ s: z.string(), v: z.number() })).optional(),
  A: z.array(z.object({ s: z.string(), v: z.number() })).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = ingestSchema.safeParse(body);

    const parsedData = minifiedIngestSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid data format', details: parsedData.error.flatten() },
        { status: 400 }
      );
    }
    const { V, A } = parsedData.data;

    const voltageReadings = V?.map((reading) => ({
      vr_source_id: reading.s,
      vr_value: reading.v,
    }));

    const currentReadings = A?.map((reading) => ({
      cr_source_id: reading.s,
      cr_value: reading.v,
    }));

    if (voltageReadings && voltageReadings.length > 0) {
      await prisma.voltage_reading.createMany({
        data: voltageReadings,
        skipDuplicates: true, // Or handle duplicates as needed
      });
    }

    if (currentReadings && currentReadings.length > 0) {
      await prisma.current_reading.createMany({
        data: currentReadings,
        skipDuplicates: true, // Or handle duplicates as needed
      });
    }

    // Emit latest data via WebSocket
    // This part would need more complex logic to aggregate and send relevant data
    sendSensorData({ latestVoltage: V, latestCurrent: A });

    return NextResponse.json(
      { message: 'Data ingested successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ingestion error:', error);    return NextResponse.json(      { error: 'Failed to process request' },      { status: 500 }    );
  }
}
