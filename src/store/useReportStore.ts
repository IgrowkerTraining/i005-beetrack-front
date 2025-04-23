import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DailyReport, RangeReport, TopBestSellingsReport } from '@/types/statsTypes';

interface ReportState {
  topBestSellingsReport: TopBestSellingsReport;
  dailyReport: DailyReport;
  rangeReport: RangeReport;
  queryParams: {
    view: 'now' | 'daily' | 'top' | 'range';
    date: string;
    fromDate: string;
    toDate: string;
  };
  fetchTopBestSellingsReport: (topBestSellingReport: TopBestSellingsReport) => Promise<void>;
  fetchDailyReport: (dailyReport: DailyReport) => Promise<void>;
  fetchRangeReport: (rangeReport: RangeReport) => Promise<void>;
}

const useReportStore = create<ReportState>()(
  devtools(
    (set) => ({
      topBestSellingsReport: null,
      dailyReport: null,
      rangeReport: null,
      queryParams: {
        view: 'top',
        date: '',
        fromDate: '2025-04-01',
        toDate: '2025-04-30'
      },
      fetchTopBestSellingsReport: (topBestSellingsReport: TopBestSellingsReport) => set({ topBestSellingsReport }),
      fetchDailyReport: (dailyReport: DailyReport) => set({ dailyReport }),
      fetchRangeReport: (rangeReport: RangeReport) => set({ rangeReport }),
    })
  )
);

export default useReportStore;