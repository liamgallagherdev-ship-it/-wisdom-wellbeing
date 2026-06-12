import type { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export const ResourceDetail = ({ resource, onClose }: ResourceDetailProps) => {
  const { title, thumbnail, tags, duration, description, date_uploaded, category } = resource;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{
          fontSize: '0.75rem', background: '#e6fffa', color: '#2c7a7b',
          padding: '2px 8px', borderRadius: '999px', fontWeight: 600
        }}>
          {category}
        </span>
        <button
          aria-label="close"
          onClick={onClose}
          style={{
            border: 'none', background: 'none', fontSize: '1.2rem',
            cursor: 'pointer', color: '#888', padding: '4px 8px'
          }}
        >
          ✕
        </button>
      </div>
      <img src={thumbnail} alt={title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ marginTop: '1rem' }}>
        <h2 style={{ margin: '0 0 0.5rem', color: '#1a1a1a' }}>{title}</h2>
        <p style={{ color: '#555', lineHeight: 1.6 }}>{description}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} data-testid="tag" style={{
              fontSize: '0.75rem', background: '#f0f0f0',
              padding: '2px 8px', borderRadius: '999px', color: '#555'
            }}>
              #{tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.85rem' }}>
          <span>⏱ {duration} min</span>
          <span>📅 {date_uploaded}</span>
        </div>
      </div>
    </div>
  );
};
