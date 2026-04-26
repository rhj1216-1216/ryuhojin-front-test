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
  payload: DashboardPayload;
}

export const ChartShowcaseSection = ({
  section,
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
          title="Bar + Line"
          description="월별 지표와 전환율을 하나의 option builder에서 생성합니다."
        >
          <EChart
            option={buildBusinessTrendOption(chartData.businessTrend)}
            ariaLabel="Monthly revenue, active users, and conversion rate chart"
            fallbackDescription="월별 지표를 막대와 라인으로 함께 비교하는 차트입니다."
          />
        </Card>
        <Card
          title="Portfolio Chart Trend"
          description="전년도 비교 막대와 리뷰 점수를 함께 보여주고, 긴 데이터는 dataZoom으로 탐색합니다."
        >
          <EChart
            option={buildImplementationTrendOption(chartData.implementationTrend)}
            ariaLabel="Portfolio chart implementation trend chart"
            fallbackDescription="이전 값과 현재 값을 비교하고 리뷰 점수를 라인으로 표시하는 복합 차트입니다."
          />
        </Card>
        <Card
          title="Capability Treemap"
          description="차트 아카이브의 구현 영역을 크기와 색상 강도로 재구성한 treemap 예제입니다."
        >
          <EChart
            option={buildCapabilityTreemapOption(chartData.capabilityTree)}
            ariaLabel="Portfolio visualization capability treemap"
            fallbackDescription="ECharts, 마크업 차트, 공통 UX 항목의 비중을 treemap으로 표시합니다."
          />
        </Card>
        <Card
          title="Chart Category Share"
          description="범례와 라벨이 있는 pie chart로 차트 예제 분포를 요약합니다."
        >
          <EChart
            option={buildCategoryShareOption(chartData.categoryShare)}
            ariaLabel="Chart category share pie chart"
            fallbackDescription="차트 예제 카테고리별 비율을 도넛 차트로 표시합니다."
          />
        </Card>
        <Card
          className="chart-card--wide"
          title="커스텀 컴포넌트 + Sankey Flow"
          description="전년 대비 판정현황 화면을 참고해 좌우 상태 막대와 흐름선, 범례, 수치를 분리해 구성했습니다."
        >
          <FlowSankeyChart workflow={chartData.workflow} />
        </Card>
      </div>
    </Section>
  );
};
