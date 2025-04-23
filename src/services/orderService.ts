import { SALES_ENDPOINT } from "@/const/api";
import { Sale } from "@/types/salesTypes";
import { QueryParams } from "@/types/utilsAppTypes";
import { apiRequest } from "@/utils/apiRequest";
import { buildUrl } from "@/utils/buildUrl";

export const orderService = {
    async getOrders(params: QueryParams): Promise<Sale[]> {
        const url = buildUrl(SALES_ENDPOINT, params);
        return apiRequest<Sale[]>(url);
    },
    async addOrder(order: Sale): Promise<Sale> {
        return apiRequest<Sale>(SALES_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(order),
        });
    }
};