import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reportService';
import { Order } from '@/types/statsTypes';

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await reportsService.getOrders();
      if (response.status === 'OK') {
        return response.data;
      }
      throw new Error('Failed to fetch orders');
    },
    staleTime: 30000,
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
    retryDelay: 1000,
  });
}