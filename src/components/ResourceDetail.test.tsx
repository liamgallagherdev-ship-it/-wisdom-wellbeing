import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceDetail } from './ResourceDetail';
import type { Resource } from '../types';

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

describe('ResourceDetail', () => {
  it('should render the resource title', () => {
    render(<ResourceDetail resource={mockResource} onClose={() => {}} />);
    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<ResourceDetail resource={mockResource} onClose={() => {}} />);
    expect(screen.getByText('A calming podcast focused on mindfulness techniques for daily life.')).toBeInTheDocument();
  });

  it('should render the date uploaded', () => {
    render(<ResourceDetail resource={mockResource} onClose={() => {}} />);
    expect(screen.getByText(/2025-07-10/)).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<ResourceDetail resource={mockResource} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
