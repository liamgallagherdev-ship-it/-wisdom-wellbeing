import styles from './ResourceDetail.module.css';
import type { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export const ResourceDetail = ({ resource, onClose }: ResourceDetailProps) => {
  const { title, thumbnail, tags, duration, description, date_uploaded, category } = resource;

  return (
    <div className={styles.detail}>
      <div className={styles.topBar}>
        <span className={styles.category}>{category}</span>
        <button aria-label="close" onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} data-testid="tag" className={styles.tag}>#{tag}</span>
          ))}
        </div>
        <div className={styles.meta}>
          <span>⏱ {duration} min</span>
          <span>📅 {date_uploaded}</span>
        </div>
      </div>
    </div>
  );
};
