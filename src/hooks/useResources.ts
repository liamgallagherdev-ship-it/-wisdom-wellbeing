import { useState, useMemo } from 'react';
import { resources } from '../data/resources';
import { groupByCategory } from '../utils/groupByCategory';
import type { FilterState, SortOption, Resource } from '../types';

export const useResources = () => {
  const [filter, setFilter] = useState<FilterState>({ search: '', activeTag: null });
  const [sortBy, setSortBy] = useState<SortOption>('category');
  const [selected, setSelected] = useState<Resource | null>(null);

  const filtered = useMemo(() => {
    return resources.filter(({ title, tags }) => {
      const q = filter.search.toLowerCase();
      const matchesSearch = !q || title.toLowerCase().includes(q) || tags.some(t => t?.toLowerCase().includes(q));
      const matchesTag = !filter.activeTag || tags.includes(filter.activeTag);
      return matchesSearch && matchesTag;
    });
  }, [filter]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const byDate = useMemo(() =>
    [...filtered].sort((a, b) => b.date_uploaded.localeCompare(a.date_uploaded)),
    [filtered]
  );

  const setSearch = (search: string) =>
    setFilter({ search, activeTag: null });

  const setActiveTag = (tag: string) =>
    setFilter({ search: '', activeTag: tag });

  const clearTag = () =>
    setFilter(f => ({ ...f, activeTag: null }));

  return {
    filter,
    sortBy,
    setSortBy,
    selected,
    setSelected,
    filtered,
    grouped,
    byDate,
    setSearch,
    setActiveTag,
    clearTag,
  };
};
