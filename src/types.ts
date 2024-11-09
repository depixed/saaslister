export interface Directory {
  id: string;
  name: string;
  url: string;
  da: number;
  pa: number;
  dr: number;
  niches: string[];
  traffic: number;
  isPaid: boolean;
  logo?: string;
  description?: string;
  linkType?: 'Dofollow' | 'Nofollow' | 'UGC' | 'Sponsored';
}

export type ViewMode = 'grid' | 'list';
export type SortField = 'da' | 'pa' | 'dr' | 'traffic';

export interface Filter {
  id: string;
  label: string;
  options: string[];
}

export interface FilterState {
  [key: string]: string[];
}