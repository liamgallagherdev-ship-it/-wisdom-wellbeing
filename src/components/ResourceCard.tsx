import styles from './ResourceCard.module.css';
import type { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
  onTagClick: (tag: string) => void;
}

export const ResourceCard = ({ resource, onClick, onTagClick }: ResourceCardProps) => {
  const { title, thumbnail, tags, duration, category } = resource;

  return (
    <div
      className={styles.card}
      onClick={() => onClick(resource)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(resource); } }}
      role="button"
      tabIndex={0}
    >
      <img src={thumbnail} alt="" className={styles.thumbnail} />
      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.tags}>
          {tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              data-testid="tag"
              className={styles.tag}
              onClick={e => { e.stopPropagation(); onTagClick(tag!); }}
              aria-label={`Filter by tag: ${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
        <div className={styles.footer}>
          ⏱ {duration} min
        </div>
      </div>
    </div>
  );
};
