import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
} from '@chakra-ui/react'
import StockLabel from './StockLabel'
import { useNavigate } from 'react-router-dom'

export type ProductItemProps = {
  id: string
  imagePath: string
  name: string
  salesPrice: string
  stock: number
  view: 'grid' | 'list'
  stock_min: number
  stock_optimus: number
}

const ProductItem = ({
  id,
  imagePath,
  name,
  salesPrice,
  stock,
  view,
  stock_min,
  stock_optimus,
}: ProductItemProps) => {
const navigate = useNavigate()

  if (view === 'list') {
    return (
      <Flex
        onClick={() => navigate(`/products/id/${id}`) }
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
        <Flex align="center" gap={4}>
          <Image
            src={imagePath}
            alt={name}
            boxSize="50px"
            objectFit="cover"
            borderRadius="md"
            flexShrink={0}
          />
          <Stack gap={0}>
            <Text fontSize="sm" fontWeight="medium">{name}</Text>
            <Text fontSize="sm" color="gray.600">{salesPrice}</Text>
          </Stack>
        </Flex>

        <StockLabel stock={stock} stockMin={stock_min} stockOpt={stock_optimus} isList />
      </Flex>
    )
  }

  return (
    <Box
      onClick={() => navigate(`/products/id/${id}`) }
      w={170}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      position="relative"
      borderWidth="1px"
      borderColor="gray.300"
    >
      <StockLabel stock={stock} stockMin={stock_min} stockOpt={stock_optimus} />

      <Image
        src={imagePath}
        alt={name}
        w="80%"
        h="130px"
        objectFit="cover"
        mx="auto"
        mt="4"
      />

      <Stack p={3} gap={0}>
        <Text fontSize="sm" color="black" fontWeight="medium">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.700">
          {salesPrice}
        </Text>
      </Stack>
    </Box>
  )
}

export default ProductItem
