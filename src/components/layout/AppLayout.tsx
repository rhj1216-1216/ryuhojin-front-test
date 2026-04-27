import type { PropsWithChildren } from 'react';
import type { Locale, NavigationItem } from '../../types/dashboard';

interface AppLayoutProps {
  appName: string;
  appSubtitle: string;
  navItems: NavigationItem[];
  locale: Locale;
  languageLabel: string;
  onLocaleChange: (locale: Locale) => void;
}

export const AppLayout = ({
  appName,
  appSubtitle,
  navItems,
  locale,
  languageLabel,
  onLocaleChange,
  children,
}: PropsWithChildren<AppLayoutProps>) => (
  <div className="app-shell">
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label={`${appName} home`}>
          <span className="brand__mark" aria-hidden="true">
            RHJ
          </span>
          <span>
            <strong>{appName}</strong>
            <small>{appSubtitle}</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="language-toggle" aria-label={languageLabel}>
          {(['ko', 'en'] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={locale === item ? 'is-active' : undefined}
              aria-pressed={locale === item}
              onClick={() => onLocaleChange(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
    <main id="top">{children}</main>
  </div>
);
