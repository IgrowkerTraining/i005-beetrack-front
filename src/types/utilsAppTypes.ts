export interface QueryParams {
  page?: number;
  limit?: number;
  filter?: string;
  resource?: string;
  date?: string;
  fromDate?: string;
  toDate?: string;
  view?: 'now' | 'daily' | 'top' | 'range';
  [key: string]: string | number | undefined;
}