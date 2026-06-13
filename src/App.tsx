import styles from './App.module.css';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetail } from './components/ResourceDetail';
import { useResources } from './hooks/useResources';

function App() {
  const {
    filter, sortBy, setSortBy,
    selected, setSelected,
    grouped, byDate,
    setSearch, setActiveTag, clearTag,
    filtered,
  } = useResources();

  return (
    <div className={styles.app}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.logo}>
            Wisdom <span>Wellbeing</span>
          </h1>
          <p className={styles.tagline}>Resources to support your mind and body</p>
        </div>

        <div className={styles.toolbar}>
          <input
            type="search"
            placeholder="Search by title or tag..."
            value={filter.search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.sortGroup}>
            <button
              className={`${styles.sortBtn} ${sortBy === 'category' ? styles.sortBtnActive : ''}`}
              onClick={() => setSortBy('category')}
            >
              By Category
            </button>
            <button
              className={`${styles.sortBtn} ${sortBy === 'date' ? styles.sortBtnActive : ''}`}
              onClick={() => setSortBy('date')}
            >
              By Date
            </button>
          </div>
          {filter.activeTag && (
            <span className={styles.activeTag}>
              Filtering by: <strong>#{filter.activeTag}</strong>
              <button className={styles.clearTag} onClick={clearTag}>✕</button>
            </span>
          )}
          {filtered.length === 0 && (
            <span className={styles.noResults}>No results found — try a different search.</span>
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
                      onClick={setSelected}
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
                  onClick={setSelected}
                  onTagClick={setActiveTag}
                />
              ))}
            </div>
          )
        }

        {selected && (
          <div className={styles.overlay} onClick={() => setSelected(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <ResourceDetail resource={selected} onClose={() => setSelected(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
