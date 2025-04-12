import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import {MdOutlinePointOfSale} from 'react-icons/md'

export default function BalanceCard() {
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
          <Text color="green.600" fontSize="xl" fontWeight="semibold">
            $233.382,01
          </Text>
        </VStack>
      </Flex>
    </Box>
  )
}
