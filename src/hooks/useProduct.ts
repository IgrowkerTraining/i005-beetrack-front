import { PRODUCTS_ENDPOINT } from '@/const/api';
import { productService } from '@/services/productService';
import useProductStore from "@/store/useProductStore";
import { NewProduct, Product } from '@/types/productType';
import { buildUrl } from '@/utils/buildUrl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const useFetchProducts = () => {
  const { queryParams, fetchProducts } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  const query = useQuery<Product[], Error>({
    queryKey: [url], 
    queryFn: () => productService.getProducts(queryParams),
    staleTime: 5 * 60 * 1000,
  });

  query.data && fetchProducts(query.data);

  return query;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { addProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<Product, Error, NewProduct>({
    mutationFn: productService.addProduct,
    onSuccess: (data) => {
      addProduct(data); 
      queryClient.setQueryData<Product[]>([url], (old) =>
        old ? [...old, data] : [data]
      );
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { updateProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<Product, Error, { id: number; updatedData: Partial<Product> }>({
    mutationFn: ({ id, updatedData }) => productService.updateProduct(id, updatedData),
    onSuccess: (data, { id }) => {
      updateProduct(id, data); 
      queryClient.setQueryData<Product[]>([url], (old) =>
        old ? old.map((product) => (product.id === id ? data : product)) : [data]
      );
    },
  });
}

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  const { removeProduct, queryParams } = useProductStore();
  const url = buildUrl(PRODUCTS_ENDPOINT, queryParams);

  return useMutation<void, Error, number>({
    mutationFn: productService.removeProduct,
    onSuccess: (data, id) => {
      removeProduct(id); 
      queryClient.setQueryData<Product[]>([url], (old) =>
        old ? old.filter((product) => product.id !== id) : []
      );
    },
  });
};
