import { HistoricalChart } from '@/components/dashboard/historical-chart';
import { StatsCards } from '@/components/dashboard/stats-cards';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time and historical sensor data overview.
        </p>
      </div>
      <StatsCards />
      <HistoricalChart />
    </div>
  );
}
