import { useMemo } from 'react';
import type { DashboardPayload } from '../../types/dashboard';

export const useChartShowcaseData = (payload: DashboardPayload) =>
  useMemo(
    () => ({
      businessTrend: payload.monthlyMetrics,
      implementationTrend: payload.chartImplementationMetrics,
      capabilityTree: payload.chartCapabilityTree,
      categoryShare: payload.chartCategoryShare,
      qualityDistribution: payload.qualityPoints,
      workflow: payload.workflow,
    }),
    [payload],
  );
