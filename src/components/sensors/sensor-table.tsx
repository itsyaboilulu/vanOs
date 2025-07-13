'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

const sensors = [
  {
    id: 'SRC-001',
    name: 'Main Li-Ion Pack',
    status: 'online' as const,
    lastVoltage: 12.6,
    lastCurrent: -0.5,
    lastSeen: 'Just now',
  },
  {
    id: 'SRC-002',
    name: 'Solar Panel Input',
    status: 'online' as const,
    lastVoltage: 18.2,
    lastCurrent: 2.1,
    lastSeen: '2 minutes ago',
  },
  {
    id: 'SRC-003',
    name: 'Backup SLA',
    status: 'offline' as const,
    lastVoltage: 12.1,
    lastCurrent: 0.0,
    lastSeen: '3 hours ago',
  },
  {
    id: 'SRC-004',
    name: 'Workshop Bench Power',
    status: 'standby' as const,
    lastVoltage: 5.0,
    lastCurrent: 0.0,
    lastSeen: '1 day ago',
  },
];

export function SensorTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Configured Sensors</CardTitle>
        <CardDescription>
          List of all active and inactive data sources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Voltage</TableHead>
              <TableHead className="text-right">Last Current</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sensors.map((sensor) => (
              <TableRow key={sensor.id}>
                <TableCell className="font-medium">
                  {sensor.name}
                  <div className="text-xs text-muted-foreground font-code">
                    {sensor.id}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sensor.status === 'online'
                        ? 'default'
                        : sensor.status === 'offline'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {sensor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-code">
                  {sensor.lastVoltage.toFixed(2)}V
                </TableCell>
                <TableCell className="text-right font-code">
                  {sensor.lastCurrent.toFixed(2)}A
                </TableCell>
                <TableCell>{sensor.lastSeen}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View Configuration</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
