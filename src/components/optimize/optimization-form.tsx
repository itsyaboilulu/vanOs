'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, Loader2, ServerCrash, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { BatteryLifeRecommendationOutput } from '@/ai/flows/battery-recommendation';
import { getBatteryLifeRecommendation } from '@/app/optimize/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  historicalData: z
    .string()
    .min(50, 'Please provide more detailed historical data.')
    .max(4000, 'Data is too long. Please provide a summary.'),
  batteryCapacity: z.coerce
    .number()
    .positive('Battery capacity must be a positive number.'),
  usagePatterns: z
    .string()
    .min(20, 'Please describe usage patterns in more detail.')
    .max(1000, 'Description is too long.'),
});

type FormValues = z.infer<typeof formSchema>;

export function OptimizationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BatteryLifeRecommendationOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalData: '',
      batteryCapacity: 5000,
      usagePatterns: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    try {
      const res = await getBatteryLifeRecommendation(values);
      setResult(res);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Recommendations',
        description:
          'There was a problem communicating with the AI. Please try again later.',
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analysis Input</CardTitle>
          <CardDescription>
            Provide your battery data to receive personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="batteryCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Battery Capacity (mAh)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste a summary of historical data, e.g., 'Voltage ranged from 12.8V to 12.1V over 24h, with average current of -0.5A...'"
                        className="h-32 font-code"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a summary of voltage and current readings over
                      time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usagePatterns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Patterns</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe how the device is typically used, e.g., 'Device runs 24/7, with high load during daytime hours...'"
                        className="h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the typical load and usage schedule.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-bold">Analyzing data...</p>
            <p className="text-sm">
              Our AI is processing your information.
            </p>
          </div>
        )}
        {result && (
          <div className="w-full space-y-4">
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Lightbulb className="text-primary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm prose-invert whitespace-pre-wrap">
                {result.recommendations}
              </CardContent>
            </Card>
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="font-headline">Explanation</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm prose-invert whitespace-pre-wrap">
                {result.explanation}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
