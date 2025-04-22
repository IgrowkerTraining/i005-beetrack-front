import { Box, Flex } from "@chakra-ui/react"

type StockLabelProps = {
  stock: number
  stockMin: number
  stockOpt: number
  isList?: boolean
}

const StockLabel = ({ stock, stockMin, stockOpt, isList = false }: StockLabelProps) => {
  let stockColor = 'gray.400'

  switch (true) {
    case stock <= stockMin:
      stockColor = 'red.500'
      break
    case stock > stockOpt:
      stockColor = 'green.500'
      break
    default:
      stockColor = 'orange.500'
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

  return (
      <Flex
        position="absolute"
        right={isList ? 0 : 2}
        top={isList ? "" : 2}
        bottom={isList ? 1 : ""}
        alignItems="center"
        gap={2}
        bg="gray.50"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="full"
        fontSize="xs"
        px={2}
        py={1}
        transform={isList ? "scale(0.85)" : ""}
      >
        <Box w="8px" h="8px" bg={stockColor} borderRadius="full" />
        {stockLabel}
      </Flex>

  )
}

export default StockLabel
