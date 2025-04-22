import { toaster } from '@/components/ui/toaster';
import { PRODUCTS_ENDPOINT } from '@/const/api';
import { productService } from '@/services/productService';
import useProductStore from '@/store/useProductStore';
import { FetchProduct, FetchProductById, NewProduct, Product, UpdateProductResponse } from '@/types/productType';
import { buildUrl } from '@/utils/buildUrl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Obtener todos los productos y guardarlos en la store
export const useFetchProducts = () => {
  const { queryParams, fetchProducts, products } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  const { data, isPending } = useQuery<{ status: string, data: Product[] }, Error>({
    queryKey: [url],
    queryFn: () => productService.getProducts(queryParams),
    staleTime: 5 * 60 * 1000,
  });

  // console.log(data)

  useEffect(() => {
  if (data && data.data.length !== products.length) {
    fetchProducts(data.data);
  }
}, [fetchProducts, products, data]);

  return { data, isPending };
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<FetchProductById, Error, NewProduct & { file: File }>({
    mutationFn: productService.addProduct,
    onSuccess: (data) => {
      addProduct(data.data);
      
      toaster.create({
        type: 'success',
        description: 'Producto añadido correctamente'
      })

      queryClient.setQueryData<FetchProduct>([url], (old) => ({
        ...old,
        data: {
          ...old?.data,
          items: [...(old?.data?.items ?? []), data.data],
          total: (old?.data?.total ?? 0) + 1
        }
      }));

      navigate('/');
    },
    onError: (error) => {
      console.log(error)
      toaster.create({
        type: 'error',
        description: error.message
      })
    }
  });
};

// ✅ Actualizar producto
export const useUpdateProduct = () => {
  const navigate = useNavigate();
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

      // queryClient.invalidateQueries({
      //   queryKey: [url]
      // })

      queryClient.setQueryData<FetchProduct>([url], (old) => ({
        ...old,
        data: {
          ...old?.data,
          items: old?.data?.items.map(p => p.id === id ? data.data : p)
        }
      }));

      navigate('/inventory');
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
