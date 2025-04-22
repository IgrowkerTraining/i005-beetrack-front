export interface QueryParams {
  page?: number;
  limit?: number;
  filter?: string;
  resource?: string;
  fromDate?: string;
  toDate?: string;
  [key: string]: string | number | undefined;
}