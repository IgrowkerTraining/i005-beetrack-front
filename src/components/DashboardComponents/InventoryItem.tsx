import { Box, Flex, Text, Badge, Icon } from '@chakra-ui/react'
// import { ChevronRight } from 'lucide-react'

interface InventoryItemProps {
  name: string
  price: string
  quantity: number
}

export const InventoryItem = ({ name, price, quantity }: InventoryItemProps) => {
  return (
    <Flex
      bg="white"
      borderRadius="xl"
      boxShadow="soft"
      p={4}
      align="center"
      justify="space-between"
      mb={1}
    >
      <Flex align="center" gap={4}>
        <Box
          bg="blue.700"
          w={10}
          h={10}
          borderRadius="md"
        />
        <Box>
          <Text fontWeight="bold" color="black">{name}</Text>
          <Text fontSize="sm" color="gray.500" textAlign="left" >
            {price} c/u
          </Text>
        </Box>
      </Flex>

      <Flex align="center" gap={3}>
        <Badge
          bg="green.200"
          color="blue.700"
          borderRadius="md"
          px={3}
          py={1}
          fontWeight="bold"
        >
          {quantity} Unidades
        </Badge>
        {/* <Icon as={ChevronRight} color="gray.400" /> */}
      </Flex>
    </Flex>
  )
}
