import type { Locale, NavigationItem } from '../types/dashboard';

interface DashboardDictionary {
  appName: string;
  appSubtitle: string;
  nav: NavigationItem[];
  heroTitle: string;
  heroBody: string;
  languageLabel: string;
  refreshLabel: string;
  loading: string;
  errorTitle: string;
  sections: {
    overview: { eyebrow: string; title: string; description: string };
    skills: { eyebrow: string; title: string; description: string };
    charts: { eyebrow: string; title: string; description: string };
    timeline: { eyebrow: string; title: string; description: string };
    table: { eyebrow: string; title: string; description: string };
  };
  tableHeaders: {
    project: string;
    domain: string;
    status: string;
    leadTime: string;
    chartCoverage: string;
    apiContract: string;
    updatedAt: string;
  };
}

export const dictionary: Record<Locale, DashboardDictionary> = {
  ko: {
    appName: 'Frontend Portfolio Dashboard',
    appSubtitle: 'React + TypeScript 데이터 시각화 데모',
    heroTitle: '데이터가 많은 화면을 구조화하는 프론트엔드 작업 기록',
    heroBody:
      'ECharts, Gantt timeline, Custom Data Grid를 더미 데이터로 재구성해 운영형 UI의 데이터 흐름과 컴포넌트 책임을 보여줍니다.',
    languageLabel: '언어 변경',
    refreshLabel: '데이터 새로고침',
    loading: '데이터를 불러오는 중입니다.',
    errorTitle: '데이터를 불러오지 못했습니다.',
    nav: [
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'skills', label: 'Skills', href: '#skills' },
      { id: 'charts', label: 'Charts', href: '#charts' },
      { id: 'timeline', label: 'Timeline', href: '#timeline' },
      { id: 'delivery', label: 'Delivery', href: '#delivery' },
    ],
    sections: {
      overview: {
        eyebrow: 'About',
        title: '프로젝트 개요',
        description:
          '실제 회사 데이터 없이도 실무에서 다뤘던 설계 포인트를 설명할 수 있도록 재구성했습니다.',
      },
      skills: {
        eyebrow: 'Skill Summary',
        title: '핵심 역량 요약',
        description:
          'UI 컴포넌트, 데이터 가공, 차트 공통화, API 계약을 분리해 유지보수 관점의 코드를 보여줍니다.',
      },
      charts: {
        eyebrow: 'ECharts Showcase',
        title: 'ECharts 차트 아카이브 데모',
        description:
          '포트폴리오의 차트 공통화 경험을 바탕으로 bar+line, dataZoom, pie, treemap, sankey 예제를 구성했습니다.',
      },
      timeline: {
        eyebrow: 'Roadmap',
        title: 'react-calendar-timeline 편집 예제',
        description:
          '왼쪽 리스트에서 timeline 항목을 수정하고, 확대/축소와 item move/resize 흐름을 확인할 수 있습니다.',
      },
      table: {
        eyebrow: 'Data Grid',
        title: 'Custom Data Grid',
        description:
          '계층형 데이터, 검색, 필터, 정렬, 선택을 포함한 포트폴리오형 더미 그리드와 전달 품질 테이블을 함께 보여줍니다.',
      },
    },
    tableHeaders: {
      project: '프로젝트',
      domain: '도메인',
      status: '상태',
      leadTime: '리드타임',
      chartCoverage: '차트 커버리지',
      apiContract: 'API 계약',
      updatedAt: '업데이트',
    },
  },
  en: {
    appName: 'Frontend Portfolio Dashboard',
    appSubtitle: 'React + TypeScript data visualization demo',
    heroTitle: 'Frontend work notes for dense data-driven screens',
    heroBody:
      'A dummy-data reconstruction of ECharts, Gantt timelines, and custom grids with clear data flow and component boundaries.',
    languageLabel: 'Change language',
    refreshLabel: 'Refresh data',
    loading: 'Loading dashboard data.',
    errorTitle: 'Failed to load dashboard data.',
    nav: [
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'skills', label: 'Skills', href: '#skills' },
      { id: 'charts', label: 'Charts', href: '#charts' },
      { id: 'timeline', label: 'Timeline', href: '#timeline' },
      { id: 'delivery', label: 'Delivery', href: '#delivery' },
    ],
    sections: {
      overview: {
        eyebrow: 'About',
        title: 'Project Overview',
        description:
          'The app reconstructs practical frontend patterns with dummy data only.',
      },
      skills: {
        eyebrow: 'Skill Summary',
        title: 'Core Capability Snapshot',
        description:
          'The structure highlights reusable UI, data shaping, chart abstraction, and API contract thinking.',
      },
      charts: {
        eyebrow: 'ECharts Showcase',
        title: 'ECharts Archive Demo',
        description:
          'Bar+line, dataZoom, pie, treemap, and sankey examples share a wrapper and option-builder pattern.',
      },
      timeline: {
        eyebrow: 'Roadmap',
        title: 'react-calendar-timeline Editor',
        description:
          'Timeline items can be edited from the left list, zoomed, moved, and resized in the timeline shell.',
      },
      table: {
        eyebrow: 'Data Grid',
        title: 'Custom Data Grid',
        description:
          'A dummy portfolio grid shows nested rows, search, filters, sorting, selection, and delivery quality data.',
      },
    },
    tableHeaders: {
      project: 'Project',
      domain: 'Domain',
      status: 'Status',
      leadTime: 'Lead time',
      chartCoverage: 'Chart coverage',
      apiContract: 'API contract',
      updatedAt: 'Updated',
    },
  },
};
