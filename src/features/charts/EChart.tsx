import { useEffect, useId, useRef } from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  SankeyChart,
  ScatterChart,
  TreemapChart,
} from 'echarts/charts';
import {
  AriaComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  SankeyChart,
  ScatterChart,
  TreemapChart,
  AriaComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
  SVGRenderer,
]);

interface EChartProps {
  option: EChartsOption;
  ariaLabel: string;
  fallbackDescription?: string;
  height?: number;
}

export const EChart = ({
  option,
  ariaLabel,
  fallbackDescription,
  height = 320,
}: EChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof echarts.init> | null>(null);
  const fallbackId = useId();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const chart = echarts.init(containerRef.current, undefined, { renderer: 'svg' });
    chartRef.current = chart;

    const resize = () => {
      chart.resize();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <div className="chart-frame">
      <div
        ref={containerRef}
        className="chart-canvas"
        role="img"
        aria-label={ariaLabel}
        aria-describedby={fallbackId}
        style={{ height }}
      />
      <p id={fallbackId} className="sr-only">
        {fallbackDescription ?? ariaLabel}
      </p>
    </div>
  );
};
