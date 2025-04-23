import { REPORTS_ENDPOINT } from '@/const/api';
import { TopBestSellingsReport } from '@/types/statsTypes';
import { QueryParams } from '@/types/utilsAppTypes';
import { apiRequest } from '@/utils/apiRequest';
import { buildUrl } from '@/utils/buildUrl';

export const reportsService = {
    async getTopBestSellings(params: QueryParams): Promise<TopBestSellingsReport> {
        const url = buildUrl(REPORTS_ENDPOINT, params);

        // console.log(url)
        const res = await apiRequest<TopBestSellingsReport>(url);

        // console.log(res)
        return res;
    },
}