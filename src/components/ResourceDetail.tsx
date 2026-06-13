import styles from './ResourceDetail.module.css';
import type { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export const ResourceDetail = ({ resource, onClose }: ResourceDetailProps) => {
  const { title, thumbnail, tags, duration, description, date_uploaded, category } = resource;

  return (
    <div
      className={styles.detail}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.topBar}>
        <span className={styles.category} aria-hidden="true">{category}</span>
        <button aria-label="Close modal" onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.body}>
        <h2 id="modal-title" className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags} aria-label="Tags">
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
