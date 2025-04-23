import { REPORTS_ENDPOINT } from '@/const/api';
import { TopBestSellingsReport, DashboardNowReport } from '@/types/statsTypes';
import { QueryParams } from '@/types/utilsAppTypes';
import { apiRequest } from '@/utils/apiRequest';
import { buildUrl } from '@/utils/buildUrl';

export const reportsService = {
    async getTopBestSellings(params: QueryParams): Promise<TopBestSellingsReport> {
      const url = buildUrl(REPORTS_ENDPOINT, params)
      const res = await apiRequest<TopBestSellingsReport>(url)
      return res
    },
  
    async getDashboardNow(): Promise<DashboardNowReport> {
      const res = await apiRequest<DashboardNowReport>(`${REPORTS_ENDPOINT}?view=now`)
      return res
    },
  }