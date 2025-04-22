import { TopBestSellingsProduct } from '@/types/statsTypes'
import { Box, Image, Text, Badge, HStack, Icon, VStack } from '@chakra-ui/react'
import { FaShoppingCart, FaChartLine } from 'react-icons/fa'

// interface ProductCardProps {
//   name: string
//   price: string
//   stock: number
//   sold: number
//   earnings: string
//   imageUrl: string
// }

export function ProductCard(product : TopBestSellingsProduct) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={3}
      bg="white"
      w="full"
      maxW="auto"
      position="relative"
    >
      <Badge
        colorScheme="red"
        borderRadius="full"
        px={2}
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
      >
        🔴 {product.stock} Unidades
      </Badge>
      <Image src={product.imagePath} alt={product.name} objectFit="contain" mx="auto" boxSize="100px" />
      <Box mt={2}>
        <Text fontWeight="bold" fontSize="sm">
          {product.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {product.salesPrice} c/u
        </Text>
      </Box>
      <VStack gap={1} mt={3} align="start">
        <HStack fontSize="xs">
          <Icon as={FaShoppingCart} />
          <Text>Vendidos</Text>
          <Text fontWeight="bold">{product.totalSold} ud/s</Text>
        </HStack>
        <HStack fontSize="xs">
          <Icon as={FaChartLine} />
          <Text>Ganancias</Text>
            <Text fontWeight="bold" color="green.500">
              ${product.totalRevenue}
            </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
