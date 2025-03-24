// src/lib/api/services/recommendations.ts
import { apiClient } from '../services/apiClient';
import { FormData, Recommendation } from '@/app/types';

export const getBuildingRecommendations = async (
  buildingData: FormData
): Promise<Recommendation[]> => {
  return apiClient.post<FormData, Recommendation[]>('/recommendations', buildingData);
};