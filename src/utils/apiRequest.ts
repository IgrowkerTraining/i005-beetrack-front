import { AppError } from "@/types/appErrorTypes";


interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    body: options.body,
    credentials: "include" // Incluir la cookie en las peticiones
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'Error desconocido en el servidor',
    }));
    const error: AppError = {
      message: errorData.message || `Error ${response.status}: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  return response.json() as Promise<T>;
}