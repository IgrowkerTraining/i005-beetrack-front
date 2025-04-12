import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Stack,
} from '@chakra-ui/react'

export type ProductItemProps = {
  image: string
  name: string
  price: string
  stock: number
  view: 'grid' | 'list'
  stockMin?: number
  stockOpt?: number
}

const ProductItem = ({
  image,
  name,
  price,
  stock,
  view,
  stockMin = 10, //El usuario configura este valor de Stock Mínimo
  stockOpt = 30, //El usuario configura este valor de Stock Óptimo
}: ProductItemProps) => {
  let stockColor = 'gray.400'

  switch (true) {
    case stock <= stockMin:
      stockColor = 'red.500'
      break
    case stock > stockOpt:
      stockColor = 'green.500'
      break
    default:
      stockColor = 'yellow.500'
  }

  let stockLabel = ''
  switch (true) {
    case stock === 0:
      stockLabel = 'Sin stock'
      break
    case stock === 1:
      stockLabel = '1 Unidad'
      break
    case stock > 1:
      stockLabel = `${stock} Unidades`
      break
  }

  if (view === 'list') {
    return (
      <Flex
        w="100%"
        mx="auto"
        bg="white"
        py={2}
        px={2}
        borderBottom="1px solid"
        borderColor="gray.200"
        align="center"
        gap={4}
      >
        <Image
          src={image}
          alt={name}
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
        />

        <Flex justify="space-between" align="center" flex="1">
          <Stack gap={0}>
            <Text fontWeight="medium" fontSize="sm">{name}</Text>
            <Text fontSize="sm" color="gray.600">{price}</Text>
          </Stack>

          <Badge
            display="flex"
            alignItems="center"
            gap={2}
            bg="gray.50"
            borderRadius="full"
            fontSize="xs"
            px={2}
            py={1}
          >
            <Box w="8px" h="8px" bg={stockColor} borderRadius="full" />
            {stockLabel}
          </Badge>
        </Flex>
      </Flex>
    )
  }

  return (
    <Box
      w={170}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      position="relative"
      borderWidth="1px"
      borderColor="gray.300"
    >
      <Badge
        position="absolute"
        top="2"
        right="2"
        bg="white"
        color="black"
        borderRadius="full"
        px={2}
        py={1}
        fontSize="xs"
        display="flex"
        alignItems="center"
        gap={1}
        borderWidth="1px"
        borderColor="gray.400"
      >
        <Box w="10px" h="10px" borderRadius="full" bg={stockColor} />
        {stockLabel}
      </Badge>

      <Image
        src={image}
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
          {price}
        </Text>
      </Stack>
    </Box>
  )
}

export default ProductItem
