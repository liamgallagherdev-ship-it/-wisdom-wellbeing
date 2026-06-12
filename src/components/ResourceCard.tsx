import type { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

export const ResourceCard = ({ resource, onClick }: ResourceCardProps) => {
  const { title, thumbnail, tags, duration } = resource;

  return (
    <div
      onClick={() => onClick(resource)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <h3>{title}</h3>
        <div>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} data-testid="tag">
              {tag}
            </span>
          ))}
        </div>
        <span>{duration} min</span>
      </div>
    </div>
  );
};
