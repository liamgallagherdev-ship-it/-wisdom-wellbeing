import type { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
  onTagClick?: (tag: string) => void;
}

export const ResourceCard = ({ resource, onClick, onTagClick }: ResourceCardProps) => {
  const { title, thumbnail, tags, duration, category } = resource;

  return (
    <div
      onClick={() => onClick(resource)}
      style={{
        cursor: 'pointer', borderRadius: '10px', overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', background: 'white',
        transition: 'transform 0.2s', border: '1px solid #eee'
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <img src={thumbnail} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      <div style={{ padding: '1rem' }}>
        <span style={{
          fontSize: '0.75rem', background: '#e6fffa', color: '#2c7a7b',
          padding: '2px 8px', borderRadius: '999px', fontWeight: 600
        }}>
          {category}
        </span>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#1a1a1a' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              data-testid="tag"
              onClick={e => { e.stopPropagation(); onTagClick?.(tag!); }}
              style={{
                fontSize: '0.75rem', background: '#f0f0f0',
                padding: '2px 8px', borderRadius: '999px', color: '#555',
                cursor: onTagClick ? 'pointer' : 'default'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <span style={{ fontSize: '0.85rem', color: '#888' }}>⏱ {duration} min</span>
      </div>
    </div>
  );
};
