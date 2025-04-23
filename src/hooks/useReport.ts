import { REPORTS_ENDPOINT } from '@/const/api';
import { reportsService } from '@/services/reportService';
import useReportStore from '@/store/useReportStore';
import { TopBestSellingsReport } from '@/types/statsTypes';
import { buildUrl } from '@/utils/buildUrl';
import { useQuery } from '@tanstack/react-query';
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
            console.log(query.data)
        }
    }, [query.data, fetchTopBestSellingsReport])
}