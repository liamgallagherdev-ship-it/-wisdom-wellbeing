import type { Resource } from '../types';

export const groupByCategory = (resources: Resource[]): Record<string, Resource[]> => {
  return resources.reduce((acc, resource) => {
    const { category } = resource;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);
};
