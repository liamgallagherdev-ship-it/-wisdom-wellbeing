import { useState } from 'react';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetail } from './components/ResourceDetail';
import { resources } from './data/resources';
import type { Resource } from './types';

function App() {
  const [selected, setSelected] = useState<Resource | null>(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c7a7b', marginBottom: '2rem' }}>Wisdom Wellbeing</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={setSelected}
          />
        ))}
      </div>

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
