import { SaleStatus } from "@/enums/saleStatus.enum";

export interface SaleItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    imagePath?: string;
}


export interface Sale {
    id?: number;
    status?: SaleStatus;
    createdAt?: string;
    sellerId?: number;
    paymentMethodId?: number;
    discountId?: number;
    items: SaleItem[];
    subTotal: number;
    total: number;    
}