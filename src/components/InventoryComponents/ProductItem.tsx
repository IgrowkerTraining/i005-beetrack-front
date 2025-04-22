import { Product } from '@/types/productType'
import {
  Box,
  Flex,
  Image,
  Text, Stack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import StockLabel from './StockLabel'

export type ProductItemProps = {
  image: string
  name: string
  price: string
  stock: number
  view: 'grid' | 'list'
  stockMin?: number
  stockOpt?: number
}

const ProductItem = ({ product, view }: { product: Product, view: string }) => {
const navigate = useNavigate()

  if (view === 'list') {
    return (
      <Flex
        onClick={() => navigate(`/products/id/${product.id}`)}
        w="100%"
        mx="auto"
        bg="white"
        py={3}
        px={4}
        borderBottom="1px solid"
        borderColor="gray.200"
        align="center"
        justify="space-between"
        position="relative"
        cursor="pointer"
      >
        <Image
          src={product.imagePath}
          alt={product.name}
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
        />

        <Flex justify="space-between" align="center" flex="1">
          <Stack gap={0}>
            <Text fontWeight="medium" fontSize="sm">{product.name}</Text>
            <Text fontSize="sm" color="gray.600">{product.salesPrice}</Text>
          </Stack>
        </Flex>

        <StockLabel stock={product.stock} stockMin={product.stock_min} stockOpt={product.stock_optimus} isList />
      </Flex>
    )
  }

  return (
    <Box
      onClick={() => navigate(`/products/id/${product.id}`)}
      w={170}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      position="relative"
      borderWidth="1px"
      borderColor="gray.300"
    >
      <StockLabel stock={product.stock} stockMin={product.stock_min} stockOpt={product.stock_optimus} />

      <Image
        src={product.imagePath}
        alt={product.name}
        w="80%"
        h="130px"
        objectFit="cover"
        mx="auto"
        mt="4"
      />

      <Stack p={3} gap={0}>
        <Text fontSize="sm" color="black" fontWeight="medium">
          {product.name}
        </Text>
        <Text fontSize="sm" color="gray.700">
          {product.salesPrice}
        </Text>
      </Stack>
    </Box>
  )
}

export default ProductItem
