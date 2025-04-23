export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}
