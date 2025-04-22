import { Box, Flex, Icon, Text, Button } from '@chakra-ui/react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { apiRequest } from '@/utils/apiRequest'

interface ProfitResponse {
  totalProfit: number;
}

export default function IncomeCard() {
  const navigate = useNavigate();
  const [profit, setProfit] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const data = await apiRequest<ProfitResponse>('/api/dashboard?view=profit');
        console.log('API Response:', data);
        if (data.totalProfit === undefined) {
          console.warn('totalProfit is undefined in response');
          return;
        }
        setProfit(Number(data.totalProfit));
      } catch (error) {
        console.error('Error fetching profit:', error);
        setProfit(null);
      }
    };

    fetchProfit();
  }, []);

  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm" w="100%">
    <Flex
        align="center"
        gap={4}
        borderRadius="lg"
        p={4}
      >
      <Flex align="center" gap={3}>
        <Box
          bg="green.400"
          p={3}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={ArrowUpRight} boxSize={6} color="blue.400" />
        </Box>

        <Box>
          <Text fontWeight="bold" color="blackAlpha.800">
            Ingresos
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="green.500">
            {profit !== null ? `$${profit.toLocaleString()}` : "Cargando..."}
          </Text>
        </Box>
      </Flex>

      <Button
        variant="plain"
        color="blackAlpha.700"
        fontWeight="medium"
        fontSize="sm"
        ml="auto"
        onClick={() => navigate('/stats')}
      >
        Ver más &gt;
      </Button>
    </Flex>
    </Box>
  );
};
