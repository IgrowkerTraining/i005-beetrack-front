import { SALES_ENDPOINT } from "@/const/api";
import { orderService } from "@/services/orderService";
import useOrderStore from "@/store/useOrderStore";
import { Sale } from "@/types/salesTypes";
import { buildUrl } from "@/utils/buildUrl";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrderss = () => {
    const { fetchOrders, queryParams } = useOrderStore();
    const url = buildUrl(SALES_ENDPOINT, queryParams);
  
    const query = useQuery<Sale[], Error>({
      queryKey: [url], 
      queryFn: () => orderService.getOrders(queryParams),
      staleTime: 5 * 60 * 1000,
    });
  
    query.data && fetchOrders(query.data);
  
    return query;
  };