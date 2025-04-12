import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product, NewProduct } from '../types/productType';

interface ProductState {
  products: Product[];
  queryParams: {
    page: number;
    limit: number;
    filter: string;
  };
  fetchProducts: (products: Product[]) => Promise<void>;
  addProduct: (product: NewProduct) => Promise<void>;
  updateProduct: (id: number, updatedData: Partial<Product>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductState>()(
  devtools(
    (set, get) => ({ 
      products: [],
      queryParams: {
        page: 1,
        limit: 10, 
        filter: '',
      },
      fetchProducts: (products: Product[]) => set({ products }),        
      addProduct: (product: Product) => {        
        set((state: ProductState) => ({
          products: [...state.products, product]
        }));
      },
      updateProduct: (id, updatedData) =>  {
        set((state: ProductState) => {
          const updatedProducts = state.products.map((product) =>
            product.id === id ? { ...product, ...updatedData } : product
          );
          return { products: updatedProducts };
        })        
      },
      removeProduct:  (id) => {
        set((state: ProductState) => {
          const updatedProducts = state.products.filter((product) => product.id !== id);
          return { products: updatedProducts };
        });
        
      },
      getProductByBarcode: (barcode: String) => {
        const product = get().products.find((product) => product.barcode === barcode);
      },
    })
  )
);

export default useProductStore;