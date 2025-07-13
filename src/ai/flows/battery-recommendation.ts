// Battery-recommendation.ts
'use server';

/**
 * @fileOverview Battery life recommendation AI agent.
 *
 * - getBatteryLifeRecommendation - A function that provides battery life recommendations based on historical data.
 * - BatteryLifeRecommendationInput - The input type for the getBatteryLifeRecommendation function.
 * - BatteryLifeRecommendationOutput - The return type for the getBatteryLifeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BatteryLifeRecommendationInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical battery data, including voltage and current readings over time.'
    ),
  batteryCapacity: z.number().describe('The battery capacity in mAh.'),
  usagePatterns: z.string().describe('The current usage patterns of the device.'),
});
export type BatteryLifeRecommendationInput = z.infer<
  typeof BatteryLifeRecommendationInputSchema
>;

const BatteryLifeRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'AI-powered recommendations for optimal usage patterns to extend battery life.'
    ),
  explanation: z
    .string()
    .describe(
      'Explanation of why the recommendations were made, based on the historical data and usage patterns.'
    ),
});
export type BatteryLifeRecommendationOutput = z.infer<
  typeof BatteryLifeRecommendationOutputSchema
>;

export async function getBatteryLifeRecommendation(
  input: BatteryLifeRecommendationInput
): Promise<BatteryLifeRecommendationOutput> {
  return batteryLifeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'batteryLifeRecommendationPrompt',
  input: {schema: BatteryLifeRecommendationInputSchema},
  output: {schema: BatteryLifeRecommendationOutputSchema},
  prompt: `You are an AI assistant specializing in battery health optimization.

  Based on the historical battery data, battery capacity, and current usage patterns, provide recommendations for optimal usage to extend battery life.

  Historical Data: {{{historicalData}}}
  Battery Capacity: {{{batteryCapacity}}} mAh
  Usage Patterns: {{{usagePatterns}}}

  Provide clear and actionable recommendations along with explanations.
  Ensure the recommendations align with the goal of extending battery life and improving overall battery health.
  
  Format the response as follows:
  Recommendations: [List of recommendations]
  Explanation: [Explanation of the recommendations]`,
});

const batteryLifeRecommendationFlow = ai.defineFlow(
  {
    name: 'batteryLifeRecommendationFlow',
    inputSchema: BatteryLifeRecommendationInputSchema,
    outputSchema: BatteryLifeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
