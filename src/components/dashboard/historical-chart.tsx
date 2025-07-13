'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const baseVoltage = 12.8;
  const voltageDrop = (hour / 23) * 0.7; // Total drop of 0.7V
  const usageCurrent =
    hour > 8 && hour < 18 ? Math.random() * 0.5 + 0.5 : Math.random() * 0.2; // Higher usage during day
  const batteryDrain = (hour / 23) * 30; // Total drain of 30%

  return {
    time: `${String(i).padStart(2, '0')}:00`,
    voltage:
      Math.round((baseVoltage - voltageDrop + (Math.random() - 0.5) * 0.1) * 100) / 100,
    current: -Math.round(usageCurrent * 100) / 100,
    battery: Math.round(100 - batteryDrain - Math.random() * 5),
  };
});

export function HistoricalChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Historical Data</CardTitle>
        <CardDescription>
          Voltage, current, and battery level over the last 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted))"
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'V / A', angle: -90, position: 'insideLeft', offset: 10, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: '%', angle: -90, position: 'insideRight', offset: -10, fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--card))' }}
                content={<ChartTooltipContent indicator="line" className="bg-popover border-border shadow-lg" />}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="voltage"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Voltage (V)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="current"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
                name="Current (A)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="battery"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
                name="Battery (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
