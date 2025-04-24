import { Box, Flex, FlexProps } from "@chakra-ui/react"

type StockLabelProps = {
  stock: number
  stockMin: number
  stockOpt: number
  isList?: boolean
  zIndex?: number
} & Omit<FlexProps, 'children'>

const StockLabel = ({ 
  stock, 
  stockMin, 
  stockOpt, 
  isList = false,
  zIndex,
  ...props 
}: StockLabelProps) => {
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
      right={2}
      top={2}
      alignItems="center"
      gap={1}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="full"
      fontSize="2xs"
      px={1.5}
      py={0.5}
      transform={isList ? "scale(0.85)" : ""}
      zIndex={zIndex || 2}
      width="fit-content"
      {...props}
    >
      <Box w="6px" h="6px" bg={stockColor} borderRadius="full" />
      {stockLabel}
    </Flex>
  )
}

export default StockLabel