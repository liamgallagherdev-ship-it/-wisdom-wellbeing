import { useEffect, useRef } from 'react';
import styles from './App.module.css';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetail } from './components/ResourceDetail';
import { useResources } from './hooks/useResources';
import { useFocusTrap } from './hooks/useFocusTrap';
import type { Resource } from './types';

function App() {
  const {
    filter, sortBy, setSortBy,
    selected, setSelected,
    grouped, byDate,
    setSearch, setActiveTag, clearTag,
    filtered,
  } = useResources();

  const lastFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useFocusTrap(!!selected);

  const openDetail = (resource: Resource) => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setSelected(resource);
  };

  const closeDetail = () => {
    setSelected(null);
    setTimeout(() => lastFocusRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.logo}>
            Wisdom <span>Wellbeing</span>
          </h1>
          <p className={styles.tagline}>Resources to support your mind and body</p>
        </header>

        <main>
        <div className={styles.toolbar}>
          <input
            type="search"
            placeholder="Search by title or tag..."
            value={filter.search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
            aria-label="Search resources by title or tag"
          />
          <div className={styles.sortGroup} role="group" aria-label="Sort resources">
            <button
              className={`${styles.sortBtn} ${sortBy === 'category' ? styles.sortBtnActive : ''}`}
              onClick={() => setSortBy('category')}
              aria-pressed={sortBy === 'category'}
            >
              By Category
            </button>
            <button
              className={`${styles.sortBtn} ${sortBy === 'date' ? styles.sortBtnActive : ''}`}
              onClick={() => setSortBy('date')}
              aria-pressed={sortBy === 'date'}
            >
              By Date
            </button>
          </div>
          {filter.activeTag && (
            <span className={styles.activeTag}>
              Filtering by: <strong>#{filter.activeTag}</strong>
              <button className={styles.clearTag} onClick={clearTag} aria-label={`Remove filter: ${filter.activeTag}`}>✕</button>
            </span>
          )}
          {filtered.length === 0 && (
            <span className={styles.noResults} role="status">No results found — try a different search.</span>
          )}
        </div>

        {sortBy === 'category'
          ? Object.entries(grouped).map(([category, items]) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryHeading}>{category}</h2>
                <div className={styles.grid}>
                  {items.map(r => (
                    <ResourceCard
                      key={r.id}
                      resource={r}
                      onClick={openDetail}
                      onTagClick={setActiveTag}
                    />
                  ))}
                </div>
              </div>
            ))
          : (
            <div className={styles.grid}>
              {byDate.map(r => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  onClick={openDetail}
                  onTagClick={setActiveTag}
                />
              ))}
            </div>
          )
        }

        {selected && (
          <div
            className={styles.overlay}
            onClick={closeDetail}
            role="presentation"
            aria-hidden="false"
          >
            <div
              className={styles.modal}
              ref={modalRef}
              onClick={e => e.stopPropagation()}
            >
              <ResourceDetail resource={selected} onClose={closeDetail} />
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}

export default App;
