import ProductItem from '@/components/InventoryComponents/ProductItem'
import { useColorModeValue } from '@/components/ui/color-mode'
import { useFetchProducts } from '@/hooks/useProduct'
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
  VStack,
  Spinner,
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
  const [showOnlyOptimusStock, setShowOnlyOptimusStock] = useState(false)
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false)
  const [search, setSearch] = useState('')
  const color = useColorModeValue('black', 'white')

  const { products } = useProductStore();
  const { isPending } = useFetchProducts();

  const navigate = useNavigate()
  console.log(products);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => {
      if (showOnlyOutOfStock && product.stock === 0) return true
      if (showOnlyLowStock && product.stock > 0 && product.stock < product.stock_min) return true
      if (showOnlyOptimusStock && product.stock > product.stock_min && product.stock < product.stock_optimus) return true
      if (!showOnlyOutOfStock && !showOnlyLowStock && !showOnlyOptimusStock) return true
      return false
    })

  return (
    <Box display="flex" flexDirection="column" gap={5}>
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

        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              aria-label="Filtros"
              variant="plain"
              color={showOnlyOutOfStock || showOnlyLowStock ? "red.500" : color}
            ><VscSettings /></IconButton>
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
                value="lowStock"
                checked={showOnlyLowStock}
                onCheckedChange={(checked) => setShowOnlyLowStock(checked)}
              >
                <Menu.ItemIndicator />
                Stock Mínimo
              </Menu.CheckboxItem>
              <Menu.CheckboxItem
                value="optimusStock"
                checked={showOnlyOptimusStock}
                onCheckedChange={(checked) => setShowOnlyOptimusStock(checked)}
              >
                <Menu.ItemIndicator />
                Stock Óptimo
              </Menu.CheckboxItem>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        <IconButton
          onClick={() => setIsGridView((prev) => !prev)}
          aria-label="Cambiar vista"
          variant="plain"
          color={color}
        >{isGridView ? <IoList /> : <IoGrid />}</IconButton>
      </Flex>

      <Flex
        wrap={isGridView ? 'wrap' : 'nowrap'}
        direction={isGridView ? 'row' : 'column'}
        gap={3}
        maxW="1200px"
        justify={isGridView ? 'flex-start' : 'center'}
      >
        {isPending ? (
          <VStack colorPalette="gray" h={"full"} justifyContent={"center"} alignItems={"center"} mx={"auto"}>
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        ) : (
          filteredProducts.length === 0 ? (
            <Text mx={"auto"} color={"InactiveCaptionText"} fontWeight={"bold"}>
              No se encontraron productos
            </Text>
          ) : (
            filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                view={isGridView ? 'grid' : 'list'}
                product={product}
              />
            ))
          )
        )}
      </Flex>
    </Box>
  )
}


export default InventoryPage
