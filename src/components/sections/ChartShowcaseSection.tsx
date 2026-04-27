import type { DashboardPayload } from '../../types/dashboard';
import {
  buildCapabilityTreemapOption,
  buildCategoryShareOption,
  buildBusinessTrendOption,
  buildImplementationTrendOption,
} from '../../features/charts/chartOptions';
import { EChart } from '../../features/charts/EChart';
import { FlowSankeyChart } from '../../features/charts/FlowSankeyChart';
import { useChartShowcaseData } from '../../features/charts/useChartShowcaseData';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

interface ChartShowcaseSectionProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  chartCards: {
    businessTrend: {
      title: string;
      description: string;
      ariaLabel: string;
      fallbackDescription: string;
    };
    implementationTrend: {
      title: string;
      description: string;
      ariaLabel: string;
      fallbackDescription: string;
    };
    capabilityTreemap: {
      title: string;
      description: string;
      ariaLabel: string;
      fallbackDescription: string;
    };
    categoryShare: {
      title: string;
      description: string;
      ariaLabel: string;
      fallbackDescription: string;
    };
    sankey: {
      title: string;
      description: string;
    };
  };
  sankeyCopy: {
    ariaLabel: string;
    legendLabel: string;
    fallbackDescription: string;
    previousYear: string;
    currentYear: string;
    unitLabel: string;
    legendItems: {
      veryImproved: string;
      improved: string;
      noChange: string;
      worsened: string;
      veryWorsened: string;
    };
  };
  payload: DashboardPayload;
}

export const ChartShowcaseSection = ({
  section,
  chartCards,
  sankeyCopy,
  payload,
}: ChartShowcaseSectionProps) => {
  const chartData = useChartShowcaseData(payload);

  return (
    <Section
      id="charts"
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
    >
      <div className="grid grid--2 chart-grid">
        <Card
          title={chartCards.businessTrend.title}
          description={chartCards.businessTrend.description}
        >
          <EChart
            option={buildBusinessTrendOption(chartData.businessTrend)}
            ariaLabel={chartCards.businessTrend.ariaLabel}
            fallbackDescription={chartCards.businessTrend.fallbackDescription}
          />
        </Card>
        <Card
          title={chartCards.implementationTrend.title}
          description={chartCards.implementationTrend.description}
        >
          <EChart
            option={buildImplementationTrendOption(chartData.implementationTrend)}
            ariaLabel={chartCards.implementationTrend.ariaLabel}
            fallbackDescription={chartCards.implementationTrend.fallbackDescription}
          />
        </Card>
        <Card
          title={chartCards.capabilityTreemap.title}
          description={chartCards.capabilityTreemap.description}
        >
          <EChart
            option={buildCapabilityTreemapOption(chartData.capabilityTree)}
            ariaLabel={chartCards.capabilityTreemap.ariaLabel}
            fallbackDescription={chartCards.capabilityTreemap.fallbackDescription}
          />
        </Card>
        <Card
          title={chartCards.categoryShare.title}
          description={chartCards.categoryShare.description}
        >
          <EChart
            option={buildCategoryShareOption(chartData.categoryShare)}
            ariaLabel={chartCards.categoryShare.ariaLabel}
            fallbackDescription={chartCards.categoryShare.fallbackDescription}
          />
        </Card>
        <Card
          className="chart-card--wide"
          title={chartCards.sankey.title}
          description={chartCards.sankey.description}
        >
          <FlowSankeyChart workflow={chartData.workflow} copy={sankeyCopy} />
        </Card>
      </div>
    </Section>
  );
};
