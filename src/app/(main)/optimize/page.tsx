import { OptimizationForm } from '@/components/optimize/optimization-form';

export default function OptimizePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          Battery Health Optimization
        </h1>
        <p className="text-muted-foreground">
          Analyze historical data to get AI-powered recommendations.
        </p>
      </div>
      <OptimizationForm />
    </div>
  );
}
