import { NextResponse } from 'next/server';
import { z } from 'zod';

const ingestSchema = z.object({
  sourceId: z.string(),
  voltage: z.number(),
  current: z.number(),
  timestamp: z.number().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = ingestSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid data format', details: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    // In a real application, you would store this data in a time-series database.
    console.log('Received sensor data:', parsedData.data);

    return NextResponse.json(
      { message: 'Data ingested successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      { error: 'Failed to parse request body' },
      { status: 400 }
    );
  }
}
