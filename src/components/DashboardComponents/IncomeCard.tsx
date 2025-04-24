import { Box, Flex, Icon, Text, Button, Spinner } from '@chakra-ui/react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTodayResume } from "@/hooks/useReport";

export default function IncomeCard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useTodayResume();

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
            {isLoading ? (
              <Spinner size="sm" color="green.500" />
            ) : error ? (
              <Text color="red.500" fontSize="sm">Error al cargar datos</Text>
            ) : (
              <Text fontSize="xl" fontWeight="bold" color="green.500">
                ${data?.totalProfit?.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </Text>
            )}
          </Box>
        </Flex>

        <Button
          variant="plain"
          color="blackAlpha.700"
          fontWeight="bold"
          fontSize="sm"
          ml="auto"
          onClick={() => navigate('/stats')}
        >
          Ver más &gt;
        </Button>
      </Flex>
    </Box>
  );
}
