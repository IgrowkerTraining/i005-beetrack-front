import { PaymentMethod } from "@/enums/paymentMethod.enum";
import { SaleStatus } from "@/enums/saleStatus.enum";

export interface SaleItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    imagePath?: string;
}


export interface Sale {
    id?: string;
    status?: SaleStatus;
    date?: string;
    paymentMethod?: PaymentMethod;
    discount?: number;
    items?: SaleItem[];
    subTotal?: number;
    total?: number;    
}