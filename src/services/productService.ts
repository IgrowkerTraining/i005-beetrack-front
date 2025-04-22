import { PRODUCTS_ENDPOINT } from "@/const/api";
import { FetchProduct, FetchProductById, NewProduct, Product, UpdateProductResponse } from "@/types/productType";
import { QueryParams } from "@/types/utilsAppTypes";
import { apiRequest } from "@/utils/apiRequest";
import { buildUrl } from "@/utils/buildUrl";

export const productService = {
  async getProducts(params: QueryParams): Promise<FetchProduct> {
    const url = buildUrl(PRODUCTS_ENDPOINT, params);
    return apiRequest<FetchProduct>(url);
  },

  async getProduct(id: string): Promise<FetchProductById> {
    const url = `${PRODUCTS_ENDPOINT}/${id}`;
    return apiRequest<FetchProductById>(url);
  },

  async addProduct(product: NewProduct & { file?: File }): Promise<Product> {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const res = await fetch(PRODUCTS_ENDPOINT, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al agregar producto");
  return res.json();
},

  async updateProduct(
  id: string,
  updatedData: Partial<Product> & { file?: File }
): Promise<UpdateProductResponse> {
  const url = `${PRODUCTS_ENDPOINT}/${id}`;
  const formData = new FormData();

  if (updatedData.file) {
    formData.append("file", updatedData.file);
  }

  Object.entries(updatedData).forEach(([key, value]) => {
    if (key === "file") return;
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const res = await fetch(url, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al actualizar el producto");
  return res.json();
},

  async removeProduct(id: string): Promise<void> {
    const url = `${PRODUCTS_ENDPOINT}/${id}`;
    return apiRequest<void>(url, {
      method: "DELETE",
    });
  },
};
