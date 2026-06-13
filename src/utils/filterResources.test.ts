import { describe, it, expect } from 'vitest';
import { filterResources, sortByDate } from './filterResources';
import type { Resource } from '../types';

const mockResources: Resource[] = [
  {
    id: '001',
    category: 'Podcasts',
    title: 'Mindful Moments',
    thumbnail: '',
    tags: ['wellbeing', 'mindfulness', 'relaxation'],
    duration: 25,
    description: 'A calming podcast.',
    date_uploaded: '2025-07-10'
  },
  {
    id: '002',
    category: 'Articles',
    title: 'The Science of Sleep',
    thumbnail: '',
    tags: ['wellbeing', 'sleep', 'science'],
    duration: 8,
    description: 'An article about sleep.',
    date_uploaded: '2025-06-22'
  },
  {
    id: '003',
    category: 'Fitness',
    title: '10-Minute Morning Stretch',
    thumbnail: '',
    tags: ['mobility', 'energy', 'routine'],
    duration: 10,
    description: 'A stretching routine.',
    date_uploaded: '2025-08-05'
  }
];

describe('filterResources', () => {
  it('should return all resources when search and activeTag are empty', () => {
    const result = filterResources(mockResources, { search: '', activeTag: null });
    expect(result).toHaveLength(3);
  });

  it('should filter by title search term', () => {
    const result = filterResources(mockResources, { search: 'sleep', activeTag: null });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('The Science of Sleep');
  });

  it('should filter by tag search term', () => {
    const result = filterResources(mockResources, { search: 'mindfulness', activeTag: null });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Mindful Moments');
  });

  it('should be case insensitive when searching', () => {
    const result = filterResources(mockResources, { search: 'SLEEP', activeTag: null });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('The Science of Sleep');
  });

  it('should filter by active tag', () => {
    const result = filterResources(mockResources, { search: '', activeTag: 'wellbeing' });
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no resources match', () => {
    const result = filterResources(mockResources, { search: 'xyz123', activeTag: null });
    expect(result).toHaveLength(0);
  });

  it('should return empty array when given no resources', () => {
    const result = filterResources([], { search: 'sleep', activeTag: null });
    expect(Object.keys(result)).toHaveLength(0);
  });
});

describe('sortByDate', () => {
  it('should sort resources by date descending', () => {
    const result = sortByDate(mockResources);
    expect(result[0].date_uploaded).toBe('2025-08-05');
    expect(result[1].date_uploaded).toBe('2025-07-10');
    expect(result[2].date_uploaded).toBe('2025-06-22');
  });

  it('should not mutate the original array', () => {
    const original = [...mockResources];
    sortByDate(mockResources);
    expect(mockResources[0].id).toBe(original[0].id);
  });

  it('should return empty array when given no resources', () => {
    const result = sortByDate([]);
    expect(result).toHaveLength(0);
  });
});
