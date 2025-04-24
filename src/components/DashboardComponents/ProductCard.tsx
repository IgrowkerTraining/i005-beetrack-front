import { TopBestSellingsProduct } from '@/types/statsTypes'
import { Box, Image, Text, HStack, Icon, VStack, AspectRatio } from '@chakra-ui/react'
import { FaShoppingCart, FaChartLine } from 'react-icons/fa'
import StockLabel from '@/components/InventoryComponents/StockLabel'

export function ProductCard(product : TopBestSellingsProduct) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={3}
      bg="white"
      w="full"
      minH="200px"
      position="relative"
      display="flex"
      flexDirection="column"
      shadow="sm"
      mb="1"
    >
      <StockLabel 
        stock={product.stock} 
        stockMin={product.stock_min} 
        stockOpt={product.stock_optimus}
        zIndex={2}
      />
      
      <AspectRatio ratio={1} maxW="100px" w="full" mx="auto" mb={2}>
        <Image 
          src={product.imagePath} 
          alt={product.name} 
          objectFit="contain"
        />
      </AspectRatio>

      <Box flex="1" minH="0">
        <Text 
          fontWeight="medium" 
          fontSize="xs" 
          color="gray.700"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="100%"
        >
          {product.name}
        </Text>
        <Text fontSize="2xs" color="gray.500" mt={0.5}>
          {product.salesPrice} c/u
        </Text>
      </Box>

      <VStack gap={1} align="stretch" w="full" mt="auto" pt={2}>
        <HStack fontSize="2xs" w="full" justify="space-between" color="gray.600">
          <HStack gap={1}>
            <Icon as={FaShoppingCart} boxSize={3} />
            <Text>Vendidos</Text>
          </HStack>
          <Text>{product.totalSold} ud/s</Text>
        </HStack>
        
        <HStack fontSize="2xs" w="full" justify="space-between" color="gray.600">
          <HStack gap={1}>
            <Icon as={FaChartLine} boxSize={3} />
            <Text>Ganancias</Text>
          </HStack>
          <Text color="green.400">
            ${product.totalRevenue}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
