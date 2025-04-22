import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import {MdOutlinePointOfSale} from 'react-icons/md'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/utils/apiRequest'

interface TotalSales {
  totalSales: number;
}

export default function BalanceCard() {
  const [sales, setSales] = useState<number | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await apiRequest<TotalSales>('/api/dashboard?view=sales');
        console.log('API Response:', data);
        if (data.totalSales === undefined) {
          console.warn('totalProfit is undefined in response');
          return;
        }
        setSales(Number(data.totalSales));
      } catch (error) {
        console.error('Error fetching profit:', error);
        setSales(null);
      }
    };

    fetchSales();
  }, []);

  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm" w="100%">
      <Flex
        align="center"
        gap={4}
        borderRadius="lg"
        p={4}
      >
        <Flex
          bg="green.500"
          borderRadius="lg"
          p={3}
          align="center"
          justify="center"
        >
          <Icon as={MdOutlinePointOfSale} boxSize={6} color="blue.400" />
        </Flex>
        <VStack align="start" gap={0}>
          <Text fontWeight="bold">Total</Text>
          <Text color="green.500" fontSize="xl" fontWeight="semibold">
            {sales !== null ? `$${sales.toLocaleString()}` : "Cargando..."}
          </Text>
        </VStack>
      </Flex>
    </Box>
  )
}
