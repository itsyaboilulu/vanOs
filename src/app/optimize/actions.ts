'use server';

import {
  getBatteryLifeRecommendation as getBatteryLifeRecommendationFlow,
  type BatteryLifeRecommendationInput,
} from '@/ai/flows/battery-recommendation';

export async function getBatteryLifeRecommendation(
  input: BatteryLifeRecommendationInput
) {
  return await getBatteryLifeRecommendationFlow(input);
}
