import { toaster } from '@/components/ui/toaster';
import { PRODUCTS_ENDPOINT } from '@/const/api';
import { productService } from '@/services/productService';
import useProductStore from '@/store/useProductStore';
import { FetchProduct, FetchProductById, NewProduct, Product, UpdateProductResponse } from '@/types/productType';
import { buildUrl } from '@/utils/buildUrl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// ✅ Obtener todos los productos y guardarlos en la store
export const useFetchProducts = () => {
  const { queryParams, fetchProducts } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  const query = useQuery<FetchProduct, Error>({
    queryKey: [url],
    queryFn: () => productService.getProducts(queryParams),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
  if (query.data?.data?.length) {
    fetchProducts(query.data.data);
  }
}, [query.data, fetchProducts]);

  return query;
};

// ✅ Obtener producto por ID
export const useFetchProduct = (id: string) => {
  return useQuery<FetchProductById, Error>({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// ✅ Añadir nuevo producto
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { addProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<Product, Error, NewProduct & { file: File }>({
    mutationFn: productService.addProduct,
    onSuccess: (data) => {
      addProduct(data);
      queryClient.setQueryData<Product[]>([url], (old) =>
        Array.isArray(old) ? [...old, data] : [data]
      );
    },
  });
};

// ✅ Actualizar producto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { updateProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<UpdateProductResponse, Error, { id: string; updatedData: Partial<Product> }>({
    mutationFn: ({ id, updatedData }) =>
      productService.updateProduct(id, updatedData),
    onSuccess: (data, { id }) => {
      updateProduct(id, data.data);
      toaster.create({
        type: 'success',
        description: 'Producto actualizado',
      });
      queryClient.setQueryData<Product[]>([url], (old) =>
        Array.isArray(old)
          ? old.map((product) => (product.id === id ? data.data : product))
          : [data.data]
      );
    },
  });
};

// ✅ Eliminar producto
export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  const { removeProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<void, Error, string>({
    mutationFn: productService.removeProduct,
    onSuccess: (_, id) => {
      removeProduct(id);
      queryClient.setQueryData<Product[]>([url], (old) =>
        Array.isArray(old)
          ? old.filter((product) => product.id !== id)
          : []
      );
    },
  });
};
