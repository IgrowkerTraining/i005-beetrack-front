import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RangeReport, TopBestSellingsReport } from '@/types/statsTypes';

interface ReportState {
  topBestSellingsReport: TopBestSellingsReport;
  todayResume: RangeReport;
  dailyReport: RangeReport;
  rangeReport: RangeReport;
  queryParams: {
    view: 'now' | 'daily' | 'top' | 'range';
    date: string;
    fromDate: string;
    toDate: string;
  };
  fetchTopBestSellingsReport: (topBestSellingReport: TopBestSellingsReport) => Promise<void>;
  fetchTodayResume: (dailyReport: RangeReport) => Promise<void>;
  fetchDailyReport: (dailyReport: RangeReport) => Promise<void>;
  fetchRangeReport: (rangeReport: RangeReport) => Promise<void>;
}

const useReportStore = create<ReportState>()(
  devtools(
    (set) => ({
      topBestSellingsReport: null,
      todayResume: null,
      dailyReport: null,
      rangeReport: null,
      queryParams: {
        view: 'top',
        date: '',
        fromDate: '2025-04-01', // poner primer día del mes actual default
        toDate: '2025-04-30', // poner último día del mes actual default
      },
      fetchTopBestSellingsReport: (topBestSellingsReport: TopBestSellingsReport) => set({ topBestSellingsReport }),
      fetchTodayResume: (todayResume: RangeReport) => set({ todayResume }),
      fetchDailyReport: (dailyReport: RangeReport) => set({ dailyReport }),
      fetchRangeReport: (rangeReport: RangeReport) => set({ rangeReport }),
    })
  )
);

export default useReportStore;