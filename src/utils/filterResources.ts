import type { Resource, FilterState } from '../types';

export const filterResources = (resources: Resource[], filter: FilterState): Resource[] => {
  return resources.filter(({ title, tags }) => {
    const q = filter.search.toLowerCase();
    const matchesSearch = !q ||
      title.toLowerCase().includes(q) ||
      tags.some(t => t?.toLowerCase().includes(q));
    const matchesTag = !filter.activeTag || tags.includes(filter.activeTag);
    return matchesSearch && matchesTag;
  });
};

export const sortByDate = (resources: Resource[]): Resource[] => {
  return [...resources].sort((a, b) =>
    b.date_uploaded.localeCompare(a.date_uploaded)
  );
};
