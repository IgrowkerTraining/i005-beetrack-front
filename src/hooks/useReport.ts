import { REPORTS_ENDPOINT } from '@/const/api';
import { reportsService } from '@/services/reportService';
import useReportStore from '@/store/useReportStore';
import { RangeReport, TopBestSellingsReport } from '@/types/statsTypes';
import { buildUrl } from '@/utils/buildUrl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTopBestSellings = () => {
    const { queryParams, fetchTopBestSellingsReport } = useReportStore();

    const url = buildUrl(REPORTS_ENDPOINT, queryParams);
    const query = useQuery<TopBestSellingsReport, Error>({
        queryKey: [url],
        queryFn: () => reportsService.getTopBestSellings(queryParams),
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (query.data) {
            fetchTopBestSellingsReport(query.data)
            // console.log(query.data)
        }
    }, [query.data, fetchTopBestSellingsReport])

    return query;
}

export const useTodayResume = () => {
    const { fetchTodayResume } = useReportStore();

    const url = buildUrl(REPORTS_ENDPOINT, { view: 'now' });
    const query = useQuery<RangeReport, Error>({
        queryKey: [url],
        queryFn: () => reportsService.getTodayResume({ view: 'now' }),
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (query.data) {
            fetchTodayResume(query.data)
            // console.log(query.data)
        }
    }, [query.data, fetchTodayResume])

    return query;
}

export const useDailyReport = (day: Date) => {
    const { fetchDailyReport } = useReportStore();
    const date = day.toISOString().split('T')[0];

    console.log('Desde useReport la fecha que llega:', date);

    const url = buildUrl(REPORTS_ENDPOINT, { view: 'daily', date });
    const query = useQuery<RangeReport, Error>({
        queryKey: [url],
        queryFn: () => reportsService.getDailyReport({ view: 'daily', date }),
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        console.log('Desde useReport la data que sale: ', query.data) // No viene nada de momento
        if (query.data) {
            fetchDailyReport(query.data)
        } else {
            fetchDailyReport(null);
        }
    }, [query.data, fetchDailyReport])

    return query;
}

export const useTopBestSellingsStatus = () => {
    const queryClient = useQueryClient();
    const state = queryClient.getQueryState([REPORTS_ENDPOINT])

    return {
        isPending: state?.status === 'pending'
    }
}