import { REPORTS_ENDPOINT, ORDERS_ENDPOINT } from '@/const/api';
import { RangeReport, TopBestSellingsReport, OrdersResponse } from '@/types/statsTypes';
import { QueryParams } from '@/types/utilsAppTypes';
import { apiRequest } from '@/utils/apiRequest';
import { buildUrl } from '@/utils/buildUrl';

export const reportsService = {
    async getTopBestSellings(params: QueryParams): Promise<TopBestSellingsReport> {
        const url = buildUrl(REPORTS_ENDPOINT, params);
        const res = await apiRequest<TopBestSellingsReport>(url);
        return res;
    },
    async getTodayResume(params: QueryParams): Promise<RangeReport> {
        const url = buildUrl(REPORTS_ENDPOINT, params);

        // console.log(url)
        const res = await apiRequest<RangeReport>(url);

        // console.log(res)
        return res;
    },
    async getDailyReport(params: QueryParams): Promise<RangeReport> {
        const url = buildUrl(REPORTS_ENDPOINT, params);

        // console.log(url)
        const res = await apiRequest<RangeReport>(url);

        // console.log(res)
        return res;
    },
    async getOrders(): Promise<OrdersResponse> {
      const res = await apiRequest<OrdersResponse>(ORDERS_ENDPOINT);
      return res;
    }
}