import {
  Box,
  HStack,
  Text,
  VStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ResumeCard() {
  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
      <VStack align="start" w="100%">
        <HStack justify="space-between" w="100%">
          <Text fontWeight="semibold" fontSize="sm">
            Balance total
          </Text>
          <Text fontWeight="bold" color="green.700">
            + $54.000,00
          </Text>
        </HStack>
        
        <Flex 
          direction="row" 
          gap={{ base: 2, sm: 4 }}
          justify="space-between" 
          w="100%" 
        >
          <Box
            w="48%"
            bg="gray.50"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            py={1}
            textAlign="center"
          >
            <VStack gap={1}>
              <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.500" fontWeight="semibold">
                Ingresos
              </Text>
              <HStack justify="center">
                <Icon as={FaPlus} color="green.500" boxSize={{ base: 2.5, sm: 3.5 }} />
                <Text color="green.600" fontWeight="semibold" fontSize={{ base: "xs", sm: "sm" }}>
                  $60.000,45
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box
            w="48%"
            bg="gray.50"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            py={1}
            textAlign="center"
          >
            <VStack gap={1}>
              <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.500" fontWeight="semibold">
                Gastos
              </Text>
              <HStack justify="center">
                <Icon as={FaMinus} color="red.500" boxSize={{ base: 2.5, sm: 3.5 }} />
                <Text color="red.500" fontWeight="semibold" fontSize={{ base: "xs", sm: "sm" }}>
                  $6.000,45
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
