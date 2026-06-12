import { useState } from 'react';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetail } from './components/ResourceDetail';
import { resources } from './data/resources';
import { groupByCategory } from './utils/groupByCategory';
import type { Resource, FilterState, SortOption } from './types';

function App() {
  const [selected, setSelected] = useState<Resource | null>(null);
  const [filter, setFilter] = useState<FilterState>({ search: '', activeTag: null });
  const [sortBy, setSortBy] = useState<SortOption>('category');

  const filtered = resources.filter(({ title, tags }) => {
    const q = filter.search.toLowerCase();
    const matchesSearch = !q || title.toLowerCase().includes(q) || tags.some(t => t?.toLowerCase().includes(q));
    const matchesTag = !filter.activeTag || tags.includes(filter.activeTag);
    return matchesSearch && matchesTag;
  });

  const byDate = [...filtered].sort((a, b) => b.date_uploaded.localeCompare(a.date_uploaded));
  const grouped = groupByCategory(filtered);

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.4rem 1rem', borderRadius: '999px', border: '1px solid #2c7a7b',
    fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500,
    background: active ? '#2c7a7b' : 'white',
    color: active ? 'white' : '#2c7a7b',
  });

  const grid: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'
  };

  const cardProps = (resource: Resource) => ({
    key: resource.id,
    resource,
    onClick: setSelected,
    onTagClick: (tag: string) => setFilter(f => ({ ...f, activeTag: tag, search: '' })),
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c7a7b', marginBottom: '1rem' }}>Wisdom Wellbeing</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search by title or tag..."
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value, activeTag: null }))}
          style={{
            padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid #ddd',
            fontSize: '0.95rem', width: '280px', outline: 'none'
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={btnStyle(sortBy === 'category')} onClick={() => setSortBy('category')}>
            By Category
          </button>
          <button style={btnStyle(sortBy === 'date')} onClick={() => setSortBy('date')}>
            By Date
          </button>
        </div>
        {filter.activeTag && (
          <span style={{ fontSize: '0.85rem', color: '#2c7a7b' }}>
            Filtering by: <strong>#{filter.activeTag}</strong>
            <button
              onClick={() => setFilter(f => ({ ...f, activeTag: null }))}
              style={{ marginLeft: '6px', border: 'none', background: 'none', cursor: 'pointer', color: '#888' }}
            >
              ✕
            </button>
          </span>
        )}
        {filtered.length === 0 && (
          <span style={{ color: '#888', fontSize: '0.9rem' }}>No results found.</span>
        )}
      </div>

      {sortBy === 'category'
        ? Object.entries(grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: '3rem' }}>
              <h2 style={{ color: '#2c7a7b', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
                {category}
              </h2>
              <div style={grid}>
                {items.map(r => <ResourceCard {...cardProps(r)} />)}
              </div>
            </div>
          ))
        : (
            <div style={grid}>
              {byDate.map(r => <ResourceCard {...cardProps(r)} />)}
            </div>
          )
      }

      {selected && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: '12px',
            maxWidth: '600px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <ResourceDetail resource={selected} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;