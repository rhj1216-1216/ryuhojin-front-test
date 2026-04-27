import { useMemo, useState, type ChangeEvent } from 'react';
import type {
  PortfolioGridImpact,
  PortfolioGridRow,
  PortfolioGridStatus,
} from '../../types/dashboard';

interface CustomDataGridProps {
  rows: PortfolioGridRow[];
  copy: {
    ariaLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    allCategoriesLabel: string;
    selectedLabel: (count: number) => string;
    editModeLabel: string;
    editModeNote: string;
    clearLabel: string;
    expandLabel: string;
    collapseLabel: string;
    selectAllLabel: string;
    selectRowLabel: (capability: string) => string;
    toggleRowLabel: (action: string, capability: string) => string;
    headers: {
      capability: string;
      category: string;
      owner: string;
      status: string;
      coverage: string;
      updated: string;
    };
    impactSuffix: string;
  };
}

type SortKey = 'capability' | 'category' | 'coverage' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

const statusLabel: Record<PortfolioGridStatus, string> = {
  Stable: 'Stable',
  Improving: 'Improving',
  Review: 'Review',
};

const impactLabel: Record<PortfolioGridImpact, string> = {
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
};

const getSearchText = (row: PortfolioGridRow) =>
  [
    row.capability,
    row.category,
    row.owner,
    row.status,
    row.children.map((child) => `${child.name} ${child.notes}`).join(' '),
  ]
    .join(' ')
    .toLowerCase();

const getRowIds = (row: PortfolioGridRow) => [
  row.id,
  ...row.children.map((child) => child.id),
];

const compareRows = (
  first: PortfolioGridRow,
  second: PortfolioGridRow,
  key: SortKey,
  direction: SortDirection,
) => {
  const modifier = direction === 'asc' ? 1 : -1;

  if (key === 'coverage') {
    return (first.coverage - second.coverage) * modifier;
  }

  return String(first[key]).localeCompare(String(second[key])) * modifier;
};

export const CustomDataGrid = ({ rows, copy }: CustomDataGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('capability');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    () => new Set(rows.map((row) => row.id)),
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => Array.from(new Set(rows.map((row) => row.category))),
    [rows],
  );

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return rows
      .filter((row) => categoryFilter === 'all' || row.category === categoryFilter)
      .filter((row) => !normalizedSearch || getSearchText(row).includes(normalizedSearch))
      .sort((first, second) => compareRows(first, second, sortKey, sortDirection));
  }, [categoryFilter, rows, searchTerm, sortDirection, sortKey]);

  const selectedCount = selectedRows.size;
  const filteredRowIds = filteredRows.flatMap((row) => getRowIds(row));
  const isAllFilteredSelected =
    filteredRowIds.length > 0 && filteredRowIds.every((id) => selectedRows.has(id));

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
      return;
    }

    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const toggleExpanded = (rowId: string) => {
    setExpandedRows((current) => {
      const next = new Set(current);
      next.has(rowId) ? next.delete(rowId) : next.add(rowId);
      return next;
    });
  };

  const toggleAllSelection = () => {
    setSelectedRows((current) => {
      const next = new Set(current);

      if (isAllFilteredSelected) {
        filteredRowIds.forEach((id) => next.delete(id));
      } else {
        filteredRowIds.forEach((id) => next.add(id));
      }

      return next;
    });
  };

  const toggleRowSelection = (row: PortfolioGridRow) => {
    const ids = getRowIds(row);

    setSelectedRows((current) => {
      const next = new Set(current);
      const isSelected = ids.every((id) => next.has(id));

      if (isSelected) {
        ids.forEach((id) => next.delete(id));
      } else {
        ids.forEach((id) => next.add(id));
      }

      return next;
    });
  };

  const renderSortLabel = (key: SortKey, label: string) =>
    sortKey === key ? `${label} ${sortDirection === 'asc' ? '↑' : '↓'}` : label;

  return (
    <div className="custom-grid" aria-label={copy.ariaLabel}>
      <div className="custom-grid__toolbar">
        <label>
          {copy.searchLabel}
          <input
            value={searchTerm}
            placeholder={copy.searchPlaceholder}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
          />
        </label>
        <label>
          {copy.categoryLabel}
          <select
            value={categoryFilter}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="all">{copy.allCategoriesLabel}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="custom-grid__actions">
          {isEditMode && <span aria-live="polite">{copy.selectedLabel(selectedCount)}</span>}
          <button
            type="button"
            className={isEditMode ? 'is-active' : undefined}
            aria-pressed={isEditMode}
            onClick={() => {
              setIsEditMode((current) => !current);
              setSelectedRows(new Set());
            }}
          >
            {copy.editModeLabel}
          </button>
          {isEditMode && (
            <button type="button" onClick={() => setSelectedRows(new Set())}>
              {copy.clearLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpandedRows(new Set(filteredRows.map((row) => row.id)))}
          >
            {copy.expandLabel}
          </button>
          <button type="button" onClick={() => setExpandedRows(new Set())}>
            {copy.collapseLabel}
          </button>
        </div>
      </div>
      {isEditMode && (
        <p className="custom-grid__mode-note">
          {copy.editModeNote}
        </p>
      )}
      <div className="custom-grid__board">
        <div
          className={[
            'custom-grid__head',
            isEditMode ? 'custom-grid__head--edit' : undefined,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {isEditMode && (
            <label className="custom-grid__select-all">
              <input
                type="checkbox"
                aria-label={copy.selectAllLabel}
                checked={isAllFilteredSelected}
                onChange={toggleAllSelection}
              />
            </label>
          )}
          <span>
            <button type="button" onClick={() => toggleSort('capability')}>
              {renderSortLabel('capability', copy.headers.capability)}
            </button>
          </span>
          <span>
            <button type="button" onClick={() => toggleSort('category')}>
              {renderSortLabel('category', copy.headers.category)}
            </button>
          </span>
          <span>{copy.headers.owner}</span>
          <span>{copy.headers.status}</span>
          <span>
            <button type="button" onClick={() => toggleSort('coverage')}>
              {renderSortLabel('coverage', copy.headers.coverage)}
            </button>
          </span>
          <span>
            <button type="button" onClick={() => toggleSort('updatedAt')}>
              {renderSortLabel('updatedAt', copy.headers.updated)}
            </button>
          </span>
        </div>
        <div className="custom-grid__rows">
          {filteredRows.map((row) => {
            const isExpanded = expandedRows.has(row.id);
            const rowIds = getRowIds(row);
            const isSelected = rowIds.every((id) => selectedRows.has(id));

            return (
              <article
                key={row.id}
                className={[
                  'custom-grid__row-card',
                  isEditMode ? 'custom-grid__row-card--edit' : undefined,
                  isSelected ? 'is-selected' : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="custom-grid__row-main">
                  {isEditMode && (
                    <label className="custom-grid__row-check">
                      <input
                        type="checkbox"
                        aria-label={copy.selectRowLabel(row.capability)}
                        checked={isSelected}
                        onChange={() => toggleRowSelection(row)}
                      />
                    </label>
                  )}
                  <div className="custom-grid__cell custom-grid__cell--title">
                    <button
                      type="button"
                      className="custom-grid__caret"
                      aria-expanded={isExpanded}
                      aria-label={copy.toggleRowLabel(
                        isExpanded ? copy.collapseLabel : copy.expandLabel,
                        row.capability,
                      )}
                      onClick={() => toggleExpanded(row.id)}
                    >
                      <span className={isExpanded ? 'is-open' : undefined} />
                    </button>
                    <div>
                      <strong>{row.capability}</strong>
                      <small>{row.id}</small>
                    </div>
                  </div>
                  <div className="custom-grid__cell">{row.category}</div>
                  <div className="custom-grid__cell">{row.owner}</div>
                  <div className="custom-grid__cell">
                    <span className={`status status--${row.status.toLowerCase()}`}>
                      {statusLabel[row.status]}
                    </span>
                  </div>
                  <div className="custom-grid__cell">{row.coverage}%</div>
                  <div className="custom-grid__cell">{row.updatedAt}</div>
                </div>
                {isExpanded && (
                  <div className="custom-grid__children">
                    {row.children.map((child) => (
                      <div key={child.id} className="custom-grid__child-card">
                        <span>{child.name}</span>
                        <span>{`${impactLabel[child.impact]} ${copy.impactSuffix}`}</span>
                        <span>{child.owner}</span>
                        <span className={`status status--${child.status.toLowerCase()}`}>
                          {statusLabel[child.status]}
                        </span>
                        <span>{child.updatedAt}</span>
                        <small>{child.notes}</small>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
