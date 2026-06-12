export type Category =
  | 'Podcasts'
  | 'Articles'
  | 'Newsletters'
  | 'Recipes'
  | 'Fitness'
  | 'Meditation';

export interface Resource {
  id: string;
  category: Category;
  title: string;
  thumbnail: string;
  tags: [string, string?, string?];
  duration: number;
  description: string;
  date_uploaded: string;
}

export type SortOption = 'category' | 'date';

export interface FilterState {
  search: string;
  activeTag: string | null;
}
