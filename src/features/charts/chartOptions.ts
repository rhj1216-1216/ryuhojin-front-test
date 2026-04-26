import type { EChartsOption } from 'echarts';
import type {
  ChartCapabilityNode,
  ChartCategoryShare,
  ChartImplementationMetric,
  MonthlyBusinessMetric,
  QualityScatterPoint,
  WorkflowSankeyData,
} from '../../types/dashboard';

const axisTextColor = '#64717f';
const splitLineColor = '#e4eaf0';
export const workflowSourceOrder = ['A', 'C', 'D2'] as const;
export const workflowTargetOrder = ['A-1', 'C-1', 'D2-1'] as const;

export const judgmentFlowColors = {
  veryImproved: '#4f8df7',
  improved: '#8db8ff',
  noChange: '#b9c6d8',
  worsened: '#f3a49b',
  veryWorsened: '#e36f68',
};

export const getWorkflowLinkColor = (source: string, target: string) => {
  if (source === 'A' && target === 'A-1') return judgmentFlowColors.noChange;
  if (source === 'A' && target === 'C-1') return judgmentFlowColors.worsened;
  if (source === 'A' && target === 'D2-1') return judgmentFlowColors.veryWorsened;
  if (source === 'C' && target === 'A-1') return judgmentFlowColors.improved;
  if (source === 'C' && target === 'C-1') return judgmentFlowColors.noChange;
  if (source === 'C' && target === 'D2-1') return judgmentFlowColors.worsened;
  if (source === 'D2' && target === 'A-1') return judgmentFlowColors.veryImproved;
  if (source === 'D2' && target === 'C-1') return judgmentFlowColors.improved;
  if (source === 'D2' && target === 'D2-1') return judgmentFlowColors.noChange;

  return judgmentFlowColors.noChange;
};

export const buildBusinessTrendOption = (
  metrics: MonthlyBusinessMetric[],
): EChartsOption => ({
  aria: { enabled: true },
  color: ['#2563eb', '#0f766e', '#b45309'],
  tooltip: { trigger: 'axis' },
  legend: {
    top: 0,
    textStyle: { color: axisTextColor },
  },
  grid: {
    left: 42,
    right: 48,
    top: 52,
    bottom: 34,
  },
  xAxis: {
    type: 'category',
    data: metrics.map((metric) => metric.month),
    axisLabel: { color: axisTextColor },
    axisLine: { lineStyle: { color: splitLineColor } },
  },
  yAxis: [
    {
      type: 'value',
      name: 'Revenue',
      axisLabel: { color: axisTextColor },
      splitLine: { lineStyle: { color: splitLineColor } },
    },
    {
      type: 'value',
      name: 'Conversion',
      axisLabel: { color: axisTextColor },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: 'Revenue index',
      type: 'bar',
      barWidth: 18,
      data: metrics.map((metric) => metric.revenue),
    },
    {
      name: 'Active users',
      type: 'bar',
      barWidth: 18,
      data: metrics.map((metric) => metric.activeUsers),
    },
    {
      name: 'Conversion rate',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbolSize: 8,
      data: metrics.map((metric) => metric.conversionRate),
    },
  ],
});

export const buildImplementationTrendOption = (
  metrics: ChartImplementationMetric[],
): EChartsOption => ({
  aria: { enabled: true },
  color: ['rgba(37, 99, 235, 0.18)', '#0f766e', '#be123c'],
  tooltip: { trigger: 'axis' },
  legend: {
    top: 0,
    textStyle: { color: axisTextColor },
  },
  grid: {
    left: 44,
    right: 52,
    top: 52,
    bottom: 58,
  },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: 0,
      start: 0,
      end: 50,
      zoomOnMouseWheel: false,
      moveOnMouseWheel: true,
      moveOnMouseMove: false,
      preventDefaultMouseMove: true,
    },
    {
      type: 'slider',
      xAxisIndex: 0,
      start: 0,
      end: 50,
      height: 18,
      bottom: 8,
      zoomLock: true,
      brushSelect: false,
    },
  ],
  xAxis: {
    type: 'category',
    data: metrics.map((metric) => metric.month),
    axisLabel: { color: axisTextColor },
    axisLine: { lineStyle: { color: splitLineColor } },
  },
  yAxis: [
    {
      type: 'value',
      name: 'Cases',
      axisLabel: { color: axisTextColor },
      splitLine: { lineStyle: { color: splitLineColor } },
    },
    {
      type: 'value',
      name: 'Review',
      min: 60,
      max: 100,
      axisLabel: { color: axisTextColor },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: 'Previous',
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        borderColor: '#2563eb',
        borderType: 'dashed',
        borderWidth: 1,
        borderRadius: [8, 8, 8, 8],
      },
      data: metrics.map((metric) => metric.previous),
    },
    {
      name: 'Current',
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 8, 8],
      },
      data: metrics.map((metric) => metric.current),
    },
    {
      name: 'Review score',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 8,
      data: metrics.map((metric) => metric.reviewScore),
    },
  ],
});

export const buildQualityScatterOption = (
  points: QualityScatterPoint[],
): EChartsOption => ({
  aria: { enabled: true },
  color: ['#be123c'],
  tooltip: { trigger: 'item' },
  grid: {
    left: 46,
    right: 26,
    top: 32,
    bottom: 42,
  },
  xAxis: {
    name: 'Cycle time',
    type: 'value',
    axisLabel: { color: axisTextColor },
    splitLine: { lineStyle: { color: splitLineColor } },
  },
  yAxis: {
    name: 'Defect rate',
    type: 'value',
    axisLabel: { color: axisTextColor },
    splitLine: { lineStyle: { color: splitLineColor } },
  },
  visualMap: {
    min: 3,
    max: 8,
    dimension: 2,
    orient: 'horizontal',
    left: 'center',
    bottom: 0,
    text: ['High complexity', 'Low'],
    inRange: {
      color: ['#0f766e', '#b45309', '#be123c'],
    },
  },
  series: [
    {
      name: 'Feature quality',
      type: 'scatter',
      symbolSize: 16,
      data: points.map((point) => [
        point.cycleTimeDays,
        point.defectRate,
        point.complexity,
        point.feature,
      ]),
    },
  ],
});

const sortCapabilityNodes = (
  nodes: ChartCapabilityNode[],
): ChartCapabilityNode[] =>
  [...nodes]
    .map((node) => ({
      ...node,
      children: node.children ? sortCapabilityNodes(node.children) : undefined,
    }))
    .sort((first, second) => second.value - first.value);

export const buildCapabilityTreemapOption = (
  nodes: ChartCapabilityNode[],
): EChartsOption => ({
  aria: { enabled: true },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'treemap',
      roam: false,
      nodeClick: 'zoomToNode',
      breadcrumb: {
        show: true,
        height: 22,
        bottom: 0,
        itemStyle: {
          color: '#e0f2fe',
          borderColor: '#93c5fd',
          textStyle: {
            color: '#075985',
            fontWeight: 800,
          },
        },
        emphasis: {
          itemStyle: {
            color: '#bfdbfe',
            borderColor: '#2563eb',
            textStyle: {
              color: '#0f172a',
              fontWeight: 900,
            },
          },
        },
      },
      leafDepth: 1,
      top: 8,
      left: 8,
      right: 8,
      bottom: 34,
      label: {
        show: true,
        color: '#ffffff',
        fontWeight: 800,
      },
      upperLabel: {
        show: true,
        height: 24,
        color: '#27323a',
        fontWeight: 800,
      },
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 4,
        borderRadius: 6,
        gapWidth: 6,
      },
      levels: [
        {
          color: ['#0f766e', '#2563eb', '#b45309'],
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 5,
            gapWidth: 7,
          },
        },
        {
          colorSaturation: [0.45, 0.75],
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 4,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 3,
            gapWidth: 4,
          },
        },
      ],
      data: sortCapabilityNodes(nodes),
    },
  ],
});

export const buildCategoryShareOption = (
  shares: ChartCategoryShare[],
): EChartsOption => ({
  aria: { enabled: true },
  color: ['#0f766e', '#2563eb', '#b45309', '#be123c'],
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'vertical',
    right: 0,
    top: 'middle',
    textStyle: { color: axisTextColor },
  },
  series: [
    {
      name: 'Chart archive',
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['38%', '52%'],
      avoidLabelOverlap: true,
      label: {
        formatter: '{b}\n{d}%',
        color: '#27323a',
        fontWeight: 700,
      },
      labelLine: {
        length: 10,
        length2: 8,
      },
      data: shares,
    },
  ],
});

export const buildWorkflowSankeyOption = (
  workflow: WorkflowSankeyData,
): EChartsOption => ({
  aria: { enabled: true },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'sankey',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      nodeAlign: 'left',
      layoutIterations: 0,
      draggable: false,
      nodeGap: 8,
      nodeWidth: 0,
      emphasis: {
        focus: 'none',
        lineStyle: {
          opacity: 0.95,
        },
      },
      label: { show: false },
      data: workflow.nodes.map((node) => ({
        ...node,
        label: { show: false },
        itemStyle: { opacity: 0 },
      })),
      links: [...workflow.links]
        .filter((link) => link.value > 0)
        .sort((first, second) => {
          const targetDiff =
            workflowTargetOrder.indexOf(first.target as typeof workflowTargetOrder[number]) -
            workflowTargetOrder.indexOf(second.target as typeof workflowTargetOrder[number]);

          if (targetDiff !== 0) {
            return targetDiff;
          }

          return (
            workflowSourceOrder.indexOf(first.source as typeof workflowSourceOrder[number]) -
            workflowSourceOrder.indexOf(second.source as typeof workflowSourceOrder[number])
          );
        })
        .map((link) => ({
          ...link,
          lineStyle: {
            color: getWorkflowLinkColor(link.source, link.target),
            opacity: 0.58,
            curveness: 0.48,
          },
        })),
    },
  ],
});
