import { SaleStatus } from "@/enums/saleStatus.enum";
import { Sale, SaleItem } from "@/types/salesTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface SaleState {
  currentSale: Sale;
  setSale: (sale: Sale) => void;
  addItem: (item: SaleItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearSale: () => void;
  finalizeSale: () => void;
}

const useSaleStore = create<SaleState>()(
  devtools((set) => ({
    currentSale: {
      status: SaleStatus.InProgress,
      items: [],
      subTotal: 0,
      total: 0,
    },

    setSale: (sale: Sale) => set({ currentSale: sale }),

    addItem: (item: SaleItem) =>
      set((state: SaleState) => {
        const existingItem = state.currentSale.items.find(
          (i) => i.id === item.id
        );

        let updatedItems;
        if (existingItem) {
          updatedItems = state.currentSale.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  totalPrice: (i.quantity + item.quantity) * i.unitPrice,
                }
              : i
          );
        } else {
          updatedItems = [...state.currentSale.items, item];
        }

        const subTotal = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);

        return {
          currentSale: {
            ...state.currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),

    updateItem: (id, quantity) =>
      set((state) => {
        const updatedItems = state.currentSale.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
                totalPrice: item.unitPrice * quantity,
              }
            : item
        );

        const subTotal = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);

        return {
          currentSale: {
            ...state.currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),

    removeItem: (id) =>
      set((state) => {
        const updatedItems = state.currentSale.items.filter(
          (item) => item.id !== id
        );
        const subTotal = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        return {
          currentSale: {
            ...state.currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),

    clearSale: () =>
      set({
        currentSale: {
          status: SaleStatus.InProgress,
          items: [],
          subTotal: 0,
          total: 0,
        },
      }),

    finalizeSale: () =>
      set((state) => ({
        currentSale: {
          ...state.currentSale,
          status: SaleStatus.Completed,
          createdAt: new Date().toISOString(),
        },
      })),
  }))
);

export default useSaleStore;
