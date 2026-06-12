import { describe, it, expect } from 'vitest';
import { groupByCategory } from './groupByCategory';
import { resources } from '../data/resources';

describe('groupByCategory', () => {
  it('should group resources by their category', () => {
    const grouped = groupByCategory(resources);
    expect(grouped['Podcasts']).toHaveLength(1);
    expect(grouped['Articles']).toHaveLength(1);
    expect(grouped['Fitness']).toHaveLength(1);
  });

  it('should contain the correct resource in each category', () => {
    const grouped = groupByCategory(resources);
    expect(grouped['Podcasts'][0].title).toBe('Mindful Moments');
    expect(grouped['Articles'][0].title).toBe('The Science of Sleep');
  });

  it('should return an empty object when given no resources', () => {
    const grouped = groupByCategory([]);
    expect(grouped).toEqual({});
  });
});
