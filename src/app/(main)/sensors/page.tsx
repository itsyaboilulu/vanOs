import { SensorTable } from '@/components/sensors/sensor-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function SensorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Sensor Sources</h1>
          <p className="text-muted-foreground">
            Manage your configured sensor sources.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Sensor
        </Button>
      </div>
      <SensorTable />
    </div>
  );
}
