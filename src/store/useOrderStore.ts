import { Sale } from "@/types/salesTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface SaleState {
  orders: Sale[]; 
  queryParams: {
    page: number;
    limit: number;
    filter: string;
  };
    fetchOrders: (orders: Sale[]) => void;
    getOrderById: (id: string) => Sale | false;
    setOrder: (id: string, updatedData: Partial<Sale>) => void;
}

const useOrderStore = create<SaleState>()(
  devtools((set, get) => ({
    orders: [],
    queryParams: {
      page: 1,
      limit: 10,
      filter: "",
    },
    fetchOrders: (orders: Sale[]) => set({ orders }),
    getOrderById: (id: string) => {
      const order = get().orders.find((order) => order.id === id);
      return order ?? false;
    },
    setOrder: (id: string, updatedData: Partial<Sale>) => {
      set((state: SaleState) => {
        const updatedOrders = state.orders.map((order) =>
          order.id === id ? { ...order, ...updatedData } : order
        );
        return { orders: updatedOrders };
      });
    }
  }))
);

export default useOrderStore;
