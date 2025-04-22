import { Product } from "./productType";
import { Store } from "./profileTypes";

export interface TopBestSellingsProduct extends Product {
    totalRevenue: string;
    totalSold: number;
}

export interface TopBestSellingsReport {
    topProducts: TopBestSellingsProduct[]
}

export interface DailyReport {
    id: string;
    totalOrders: number;
    totalProductsSold: number;
    totalSales: number;
    totalCost: number;
    totalCashSales: number;
    totalCardSales: number;
    totalDigitalSales: number;
    totalProfit: number;
    bestSellingProduct: string;
    leastSelleginProduct: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
}

export interface RangeReport {
    totalSales: number;
    totalCost: number;
    totalProfit: number;
    totalOrders: number;
    totalProductsSold: number;
    byPaymentMethod: {
        cash: number;
        card: number;
        digital: number;
    }
}