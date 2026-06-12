import type { Resource } from '../types';

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

export const ResourceDetail = ({ resource, onClose }: ResourceDetailProps) => {
  const { title, thumbnail, tags, duration, description, date_uploaded, category } = resource;

  return (
    <div role="dialog" aria-modal="true">
      <div>
        <button aria-label="close" onClick={onClose}>
          ✕
        </button>
        <img src={thumbnail} alt={title} />
        <div>
          <span>{category}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <div>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} data-testid="tag">
                {tag}
              </span>
            ))}
          </div>
          <span>{duration} min</span>
          <span>{date_uploaded}</span>
        </div>
      </div>
    </div>
  );
};
