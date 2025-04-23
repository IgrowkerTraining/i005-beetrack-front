import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reportService';
import { DashboardNowReport } from '@/types/statsTypes';

export const useDashboardNow = () => {
    return useQuery<DashboardNowReport>({
        queryKey: ['dashboardNow'],
        queryFn: () => reportsService.getDashboardNow(),
        staleTime: 30000,
        refetchInterval: 30000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 2,
        retryDelay: 1000,
    });
};