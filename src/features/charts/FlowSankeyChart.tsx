import type { CSSProperties } from 'react';
import type { SankeyLink, WorkflowSankeyData } from '../../types/dashboard';
import {
  buildWorkflowSankeyOption,
  getWorkflowLinkColor,
  judgmentFlowColors,
  workflowSourceOrder,
  workflowTargetOrder,
} from './chartOptions';
import { EChart } from './EChart';

interface FlowSankeyChartProps {
  workflow: WorkflowSankeyData;
}

const nodeLabel: Record<string, string> = {
  A: 'A',
  C: 'C',
  D2: 'D2',
  'A-1': 'A',
  'C-1': 'C',
  'D2-1': 'D2',
};

const legendItems = [
  { label: '매우 완화', color: judgmentFlowColors.veryImproved },
  { label: '완화', color: judgmentFlowColors.improved },
  { label: '변화없음', color: judgmentFlowColors.noChange },
  { label: '악화', color: judgmentFlowColors.worsened },
  { label: '매우 악화', color: judgmentFlowColors.veryWorsened },
];

const numberFormatter = new Intl.NumberFormat('ko-KR');

const sumBy = (links: SankeyLink[], key: 'source' | 'target', value: string) =>
  links
    .filter((link) => link[key] === value)
    .reduce((total, link) => total + link.value, 0);

const sortLinks = (links: SankeyLink[]) =>
  [...links].sort((first, second) => {
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
  });

const buildFlexStyle = (value: number): CSSProperties => ({
  flexGrow: Math.max(value, 1),
  flexBasis: 0,
});

export const FlowSankeyChart = ({ workflow }: FlowSankeyChartProps) => {
  const sourceTotals = workflowSourceOrder.map((source) => ({
    key: source,
    value: sumBy(workflow.links, 'source', source),
  }));
  const targetTotals = workflowTargetOrder.map((target) => ({
    key: target,
    value: sumBy(workflow.links, 'target', target),
  }));
  const sortedLinks = sortLinks(workflow.links).filter((link) => link.value > 0);

  return (
    <div className="flow-sankey" aria-label="전년 대비 판정현황 sankey chart">
      <div className="flow-sankey__legend" aria-label="Sankey legend">
        {legendItems.map((item) => (
          <span key={item.label}>
            <i style={{ background: item.color }} aria-hidden="true" />
            {item.label}
          </span>
        ))}
      </div>
      <div className="flow-sankey__body">
        <div className="flow-sankey__side flow-sankey__side--left">
          <strong className="flow-sankey__year">2024년</strong>
          <div className="flow-sankey__node-stack">
            {sourceTotals.map((node) => (
              <div
                key={node.key}
                className="flow-sankey__node"
                style={buildFlexStyle(node.value)}
              >
                {nodeLabel[node.key]}
              </div>
            ))}
          </div>
        </div>
        <div className="flow-sankey__center">
          <EChart
            option={buildWorkflowSankeyOption(workflow)}
            ariaLabel="Year over year status transition sankey chart"
            fallbackDescription="2024년 A, C, D2 상태가 2025년 A, C, D2 상태로 이동한 비율을 흐름선으로 표시합니다."
            height={214}
          />
        </div>
        <div className="flow-sankey__side flow-sankey__side--right">
          <div className="flow-sankey__right-head">
            <strong className="flow-sankey__year">2025년</strong>
            <span>(명)</span>
          </div>
          <div className="flow-sankey__right-grid">
            <div className="flow-sankey__node-stack">
              {targetTotals.map((node) => (
                <div
                  key={node.key}
                  className="flow-sankey__node"
                  style={buildFlexStyle(node.value)}
                >
                  {nodeLabel[node.key]}
                </div>
              ))}
            </div>
            <div className="flow-sankey__values">
              {sortedLinks.map((link) => (
                <span
                  key={`${link.source}-${link.target}`}
                  style={{ color: getWorkflowLinkColor(link.source, link.target) }}
                >
                  {numberFormatter.format(link.value)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
