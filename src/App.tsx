import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { ChartShowcaseSection } from './components/sections/ChartShowcaseSection';
import { DataTableSection } from './components/sections/DataTableSection';
import { OverviewSection } from './components/sections/OverviewSection';
import { SkillSummarySection } from './components/sections/SkillSummarySection';
import { TimelineShowcaseSection } from './components/sections/TimelineShowcaseSection';
import { dictionary } from './i18n/dictionary';
import { useDashboardData } from './hooks/useDashboardData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useDashboardViewModel } from './hooks/useDashboardViewModel';
import type { Locale } from './types/dashboard';

const App = () => {
  const [locale, setLocale] = useState<Locale>('ko');
  const t = dictionary[locale];
  const { data, error, isLoading, refresh } = useDashboardData();
  const viewModel = useDashboardViewModel(data);
  useScrollReveal(viewModel?.generatedAtLabel);

  const portfolioFocus =
    locale === 'ko'
      ? ['차트 공통화', '간트 타임라인', '커스텀 그리드', '다국어 화면']
      : ['Chart system', 'Gantt timeline', 'Custom grid', 'i18n UI'];

  const heroStats = [
    {
      label: locale === 'ko' ? '차트 예제' : 'Chart cases',
      value: viewModel?.payload.chartImplementationMetrics.length ?? '-',
    },
    {
      label: locale === 'ko' ? '일정 항목' : 'Timeline items',
      value: viewModel?.payload.roadmapItems.length ?? '-',
    },
    {
      label: locale === 'ko' ? '그리드 행' : 'Grid rows',
      value: viewModel?.payload.portfolioGridRows.length ?? '-',
    },
  ];

  const heroCtaLabel = locale === 'ko' ? '구현 화면 보기' : 'View demos';
  const previewLabel =
    locale === 'ko' ? '포트폴리오 화면 미리보기' : 'Portfolio screen preview';
  const updatedLabel = locale === 'ko' ? '업데이트' : 'Updated';

  return (
    <AppLayout
      appName={t.appName}
      appSubtitle={t.appSubtitle}
      navItems={t.nav}
      locale={locale}
      languageLabel={t.languageLabel}
      onLocaleChange={setLocale}
    >
      <section className="profile-hero" aria-labelledby="hero-title" data-reveal>
        <div className="profile-hero__content">
          <p className="eyebrow">Frontend Portfolio</p>
          <h1
            id="hero-title"
            className={locale === 'ko' ? 'profile-hero__title--ko' : undefined}
          >
            {t.heroTitle}
          </h1>
          <p>{t.heroBody}</p>

          <div className="profile-hero__actions">
            <a className="button" href="#charts">
              {heroCtaLabel}
            </a>
            <button
              className="button button--ghost"
              type="button"
              aria-label={t.refreshLabel}
              onClick={refresh}
            >
              {t.refreshLabel}
            </button>
          </div>

          <ul className="profile-hero__focus" aria-label="Portfolio focus">
            {portfolioFocus.map((item) => (
              <li className="tag" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="profile-hero__preview" aria-label={previewLabel}>
          <div className="profile-hero__preview-card">
            <div className="profile-hero__preview-head">
              <span>React + TypeScript</span>
              {viewModel && <small>{`${updatedLabel} ${viewModel.generatedAtLabel}`}</small>}
            </div>
            <div className="profile-hero__preview-body">
              <div className="profile-hero__bars" aria-hidden="true">
                {[46, 72, 58, 88, 64].map((height) => (
                  <span key={height} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="profile-hero__timeline" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <dl className="profile-hero__stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      {isLoading && !viewModel && <div className="loading-state">{t.loading}</div>}
      {error && (
        <div className="error-state" role="alert">
          <strong>{t.errorTitle}</strong>
          <p>{error}</p>
        </div>
      )}

      {viewModel && (
        <>
          <OverviewSection section={t.sections.overview} kpis={viewModel.payload.kpis} />
          <SkillSummarySection
            section={t.sections.skills}
            skills={viewModel.payload.skills}
          />
          <ChartShowcaseSection
            section={t.sections.charts}
            chartCards={t.chartCards}
            sankeyCopy={t.sankey}
            payload={viewModel.payload}
          />
          <TimelineShowcaseSection
            section={t.sections.timeline}
            timelineCopy={t.timeline}
            groups={viewModel.payload.roadmapGroups}
            items={viewModel.payload.roadmapItems}
          />
          <DataTableSection
            section={t.sections.table}
            dataGridCard={t.dataGridCard}
            customGridCopy={t.customGrid}
            headers={t.tableHeaders}
            rows={viewModel.payload.deliveryRows}
            gridRows={viewModel.payload.portfolioGridRows}
          />
        </>
      )}
    </AppLayout>
  );
};

export default App;
