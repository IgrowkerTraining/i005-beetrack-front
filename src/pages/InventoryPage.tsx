import ProductItem from '@/components/InventoryComponents/ProductItem'
import { useColorModeValue } from '@/components/ui/color-mode'
import useProductStore from '@/store/useProductStore'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  InputGroup,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CiBarcode } from 'react-icons/ci'
import { FaArchive, FaSearch } from 'react-icons/fa'
import { IoGrid, IoList } from 'react-icons/io5'
import { VscSettings } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

const InventoryPage = () => {
  const [isGridView, setIsGridView] = useState(true)
  const [showOnlyOutOfStock, setShowOnlyOutOfStock] = useState(false)
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false)
  const [showOnlyOptStock, setShowOnlyOptStock] = useState(false)
  const [search, setSearch] = useState('')
  const color = useColorModeValue('black', 'white')
  const { products } = useProductStore()
  const navigate = useNavigate()

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => {
      if (showOnlyOutOfStock && product.stock === 0) return true
      if (showOnlyLowStock && product.stock <= product.stock_min && product.stock > 0) return true
      if (showOnlyOptStock && product.stock >= product.stock_optimus) return true
      if (!showOnlyOutOfStock && !showOnlyLowStock && !showOnlyOptStock) return true
      return false
    })

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <HStack gap={6} justify="center">
        <Box
          role="button"
          onClick={() => navigate('/products/')}
          aria-label="Agregar producto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          color="black"
          bg="yellow.amarillo"
          p={4}
          borderRadius="2xl"
          maxW="182px"
          h="120px"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: 'yellow.400' }}
        >
          <FaArchive size={30} />
          <Text mt={1} fontWeight="bold" fontSize="sm">
            Agregar producto
          </Text>
        </Box>

        <Box
          role="button"
          onClick={() => navigate('/productscanner')}
          aria-label="Escanear"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          color="black"
          bg="yellow.amarillo"
          p={4}
          borderRadius="2xl"
          maxW="182px"
          h="120px"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: 'yellow.400' }}
        >
          <CiBarcode size={32} strokeWidth={0.5} />
          <Text mt={1} fontWeight="bold" fontSize="sm">
            Escanea para editar producto
          </Text>
        </Box>
      </HStack>

      {/* Barra de búsqueda y botones */}
      <Flex align="center" gap={4}>
        <InputGroup flex="1" startElement={<FaSearch />}>
          <Input
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            borderRadius="full"
            variant="outline"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            color={color}
          />
        </InputGroup>

        {/* Filtros */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              aria-label="Filtros"
              variant="plain"
              color={showOnlyOutOfStock || showOnlyLowStock || showOnlyOptStock ? "red.500" : color}
            >
              <VscSettings />
            </IconButton>
          </Menu.Trigger>

          <Menu.Positioner>
            <Menu.Content zIndex="dropdown">
              <Menu.CheckboxItem
                value="outOfStock"
                checked={showOnlyOutOfStock}
                onCheckedChange={(checked) => setShowOnlyOutOfStock(checked)}
              >
                <Menu.ItemIndicator />
                Sin Stock
              </Menu.CheckboxItem>
              <Menu.CheckboxItem
                value="StockLow"
                checked={showOnlyLowStock}
                onCheckedChange={(checked) => setShowOnlyLowStock(checked)}
              >
                <Menu.ItemIndicator />
                Stock Bajo
              </Menu.CheckboxItem>
              <Menu.CheckboxItem
                value="stockOpt"
                checked={showOnlyOptStock}
                onCheckedChange={(checked) => setShowOnlyOptStock(checked)}
              >
                <Menu.ItemIndicator />
                Stock Óptimo
              </Menu.CheckboxItem>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        {/* Botón de cambio de vista */}
        <IconButton
          onClick={() => setIsGridView((prev) => !prev)}
          aria-label="Cambiar vista"
          variant="plain"
          color={color}
        >
          {isGridView ? <IoList /> : <IoGrid />}
        </IconButton>
      </Flex>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.500"
          textAlign="center"
          mt={10}
        >
          No hay productos para mostrar
        </Text>
      ) : isGridView ? (
        <Wrap gap={4} mx="auto" justify={{ base: 'center', md: 'flex-start' }} >
          {filteredProducts.map((product) => (
              <ProductItem view="grid" {...product} />
          ))}
        </Wrap>
      ) : (
        <Flex direction="column" gap={2} maxW="100%" mx="auto" w="100%">
          {filteredProducts.map((product) => (
            <Box key={product.id} w="100%">
              <ProductItem view="list" {...product} />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default InventoryPage