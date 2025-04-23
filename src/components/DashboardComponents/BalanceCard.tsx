import { Box, Flex, Icon, Text, VStack, Spinner } from "@chakra-ui/react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useDashboardNow } from "@/hooks/useDashboardNow";

export default function BalanceCard() {
  const { data, isLoading, error } = useDashboardNow();

  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm" w="100%">
      <Flex align="center" gap={4} borderRadius="lg" p={4}>
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
          {isLoading ? (
            <Spinner size="sm" color="green.500" />
          ) : error ? (
            <>
              <Text color="red.500" fontSize="sm">
                Error al obtener datos
              </Text>
              {console.error("Error loading dashboard data:", error)}
            </>
          ) : (
            <Text color="green.500" fontSize="xl" fontWeight="semibold">
              ${(data?.byPaymentMethod?.cash || 0).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
