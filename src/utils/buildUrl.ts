import { QueryParams } from "@/types/utilsAppTypes";

export const buildUrl = (baseUrl: string, params: QueryParams): string => {
  const url = new URL(baseUrl);
  if (params.resource) {
    url.pathname = `${url.pathname}/${params.resource}`;
  }
  Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== '' && key !== 'resource')
    .forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, value.toString());
      }
    });
  return url.toString();
};