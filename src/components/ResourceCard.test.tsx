import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResourceCard } from './ResourceCard';
import { Resource } from '../types';

const mockResource: Resource = {
  id: '001',
  category: 'Podcasts',
  title: 'Mindful Moments',
  thumbnail: 'https://www.datocms-assets.com/93767/1753971746-photo.jpg',
  tags: ['wellbeing', 'mindfulness', 'relaxation'],
  duration: 25,
  description: 'A calming podcast focused on mindfulness techniques for daily life.',
  date_uploaded: '2025-07-10'
};

describe('ResourceCard', () => {
  it('should render the resource title', () => {
    render(<ResourceCard resource={mockResource} onClick={() => {}} />);
    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
  });

  it('should render the thumbnail image', () => {
    render(<ResourceCard resource={mockResource} onClick={() => {}} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Mindful Moments');
  });

  it('should render no more than 3 tags', () => {
    render(<ResourceCard resource={mockResource} onClick={() => {}} />);
    const tags = screen.getAllByTestId('tag');
    expect(tags.length).toBeLessThanOrEqual(3);
  });

  it('should render the duration in minutes', () => {
    render(<ResourceCard resource={mockResource} onClick={() => {}} />);
    expect(screen.getByText('25 min')).toBeInTheDocument();
  });
});
