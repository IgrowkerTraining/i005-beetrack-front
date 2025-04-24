import { PaymentMethod } from "@/enums/paymentMethod.enum";
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
  removeItemById: (id: number) => void;
  clearSale: () => void;
  enterDiscount: (discount: number) => void;
  finalizeSale: (paymentMethod: PaymentMethod) => void;
}

const useSaleStore = create<SaleState>()(
  devtools((set) => ({
    currentSale: {
      status: SaleStatus.InProgress,
      items: [],
      paymentMethod: PaymentMethod.Transfer,
      createdAt:"",
      discount: 0,
      subTotal: 10.900,
      total: 10.900,
    },

    setSale: (sale: Sale) => set({ currentSale: sale }),

    addItem: (item: SaleItem) =>
      set((state: SaleState) => {
        const { currentSale } = state;
        const { items = [] } = currentSale;
    
        const existingItem = items.find((i) => i.id === item.id);
    
        const updatedItems = existingItem
          ? items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    totalPrice: (i.quantity + 1) * i.unitPrice,
                  }
                : i
            )
          : [...items, item];
    
        const subTotal = updatedItems.reduce((acc, i) => acc + i.totalPrice, 0);
    
        return {
          currentSale: {
            ...currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),

    updateItem: (id: number, quantity: number) =>
      set((state: SaleState) => {
        const updatedItems = (state.currentSale.items || []).map((item) =>
          item.id === id.toString()
            ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
            : item
        );

        const subTotal = updatedItems.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );

        return {
          currentSale: {
            ...state.currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),

    removeItem: (id: number) =>
      set((state: SaleState) => {
        const updatedItems = (state.currentSale.items || []).filter(
          (item) => Number(item.id) !== id
        );
        const subTotal = updatedItems.reduce(
          (acc, item) => acc + item.totalPrice,0
        );
        return {
          currentSale: {
            ...state.currentSale,
            items: updatedItems,
            subTotal,
            total: subTotal,
          },
        };
      }),
    removeItemById: (id: number) =>
      set((state: SaleState) => {
        const updatedItems = (state.currentSale.items || []).map(
          (item) =>
            item.id === id.toString() && item.quantity > 1
              ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.unitPrice * (item.quantity - 1),
              }
              : item
        );
        const subTotal = updatedItems.reduce(
          (acc, item) => acc + item.totalPrice,0
        );
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
    enterDiscount: (discount: number) =>{
      set((state) => {
        const { currentSale } = state;
        const discountValue = (currentSale.subTotal ?? 0) * (discount / 100);                
        const total = (currentSale.subTotal ?? 0)  - discountValue;                
        return {
          currentSale: {
            ...currentSale,
            discount: discountValue,
            total: total < 0 ? 0 : total,
          },
        };
      })
    }, 
    finalizeSale: (paymentMethod: PaymentMethod) =>
      
      set((state) => {
        const completedSale: Sale = {
          ...state.currentSale,
          paymentMethod: paymentMethod,
          status: SaleStatus.Paid,
          date: new Date().toISOString(),
        };
        console.log("Sale completed:", completedSale);
        
        return {
          currentSale: completedSale,
        };
      }),
  }))
);

export default useSaleStore;
