import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Product } from '../types/productType';

interface ProductState {
  products: Product[];
  queryParams: {
    page: number;
    limit: number;
    filter: string;
  };
  fetchProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  removeProduct: (id: string) => void;
}

const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        queryParams: {
          page: 1,
          limit: 10,
          filter: '',
        },
        fetchProducts: (products: Product[]) => set({ products }),
        addProduct: (product) =>
          set((state) => ({
            products: [...state.products, product],
          })),
        updateProduct: (id, updatedData) => {
          set((state) => {
            const updatedProducts = (state.products || []).map((product) =>
              product.id === id ? { ...product, ...updatedData } : product
            );
            return { products: updatedProducts };
          });
        },
        removeProduct: (id) => {
          set((state) => ({
            products: (state.products || []).filter((product) => product.id !== id),
          }));
        },
      }),
      {
        name: 'product-storage', // clave en localStorage
      }
    ),
    { name: 'ProductStore' }
  )
);

export default useProductStore;
