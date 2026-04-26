import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { ChartShowcaseSection } from './components/sections/ChartShowcaseSection';
import { DataTableSection } from './components/sections/DataTableSection';
import { OverviewSection } from './components/sections/OverviewSection';
import { SkillSummarySection } from './components/sections/SkillSummarySection';
import { TimelineShowcaseSection } from './components/sections/TimelineShowcaseSection';
import { dictionary } from './i18n/dictionary';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardViewModel } from './hooks/useDashboardViewModel';
import type { Locale } from './types/dashboard';

const App = () => {
  const [locale, setLocale] = useState<Locale>('ko');
  const t = dictionary[locale];
  const { data, error, isLoading, refresh } = useDashboardData();
  const viewModel = useDashboardViewModel(data);

  return (
    <AppLayout
      appName={t.appName}
      appSubtitle={t.appSubtitle}
      navItems={t.nav}
      locale={locale}
      languageLabel={t.languageLabel}
      onLocaleChange={setLocale}
    >
      <section className="profile-hero" aria-labelledby="hero-title">
        <div className="profile-hero__intro">
          <p className="eyebrow">Frontend Engineer</p>
          <h1 id="hero-title">{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <div className="profile-hero__focus" aria-label="Portfolio focus">
            {['Data Visualization', 'Gantt Timeline', 'Custom Grid', 'i18n'].map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <aside className="profile-hero__panel" aria-label="Portfolio snapshot">
          <div className="profile-hero__identity">
            <span aria-hidden="true">RHJ</span>
            <div>
              <strong>류호진</strong>
              <small>React + TypeScript</small>
            </div>
          </div>
          <dl>
            <div>
              <dt>Chart cases</dt>
              <dd>{viewModel?.payload.chartImplementationMetrics.length ?? '-'}</dd>
            </div>
            <div>
              <dt>Timeline items</dt>
              <dd>{viewModel?.payload.roadmapItems.length ?? '-'}</dd>
            </div>
            <div>
              <dt>Grid rows</dt>
              <dd>{viewModel?.payload.portfolioGridRows.length ?? '-'}</dd>
            </div>
          </dl>
          <button
            className="button"
            type="button"
            aria-label={t.refreshLabel}
            onClick={refresh}
          >
            {t.refreshLabel}
          </button>
          {viewModel && <small>Updated {viewModel.generatedAtLabel}</small>}
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
            payload={viewModel.payload}
          />
          <TimelineShowcaseSection
            section={t.sections.timeline}
            groups={viewModel.payload.roadmapGroups}
            items={viewModel.payload.roadmapItems}
          />
          <DataTableSection
            section={t.sections.table}
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
