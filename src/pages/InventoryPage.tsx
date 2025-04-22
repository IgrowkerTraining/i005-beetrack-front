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
} from '@chakra-ui/react'
import { useState } from 'react'
import { CiBarcode } from 'react-icons/ci'
import { FaArchive, FaSearch } from 'react-icons/fa'
import { IoGrid, IoList } from 'react-icons/io5'
import { VscSettings } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

/*
const products = [
  {
    id: 1,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/703b33e5-f44a-4881-b60f-920c246af8b7/1280x1280.webp',
    name: 'Té English Breakfast 25 uds.',
    price: '€0.79',
    stock: 35,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 2,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/5d16a77d-5ae5-443c-8b3c-4487c022e0f9/1280x1280.webp',
    name: 'Yerba mate PLAYADITO 500g',
    price: '€3.79',
    stock: 7,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 3,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/3ed18760-5880-4841-8d2b-4bb5a4ede820/1280x1280.webp',
    name: 'Agua mineral TELENO 1L',
    price: '€0.22',
    stock: 0,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 4,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/e64ee9b5-1c20-4d70-b276-dde09f16806d/1280x1280.webp',
    name: 'Galletas de avena NATURFUN 425g',
    price: '€2.25',
    stock: 5,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 5,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/be613915-6cf6-431c-8946-f53dd23903b9/1280x1280.webp',
    name: 'Café molido natural 250g',
    price: '€2.28',
    stock: 10,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 6,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/1fab3eb1-de8c-41b1-b9fd-daf003d5be45/1280x1280.webp',
    name: 'Leche entera AUCHAN 1L',
    price: '€0.91',
    stock: 1,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 7,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/dc30d530-6128-4b3e-b6ce-4bb5d6433a4c/1280x1280.webp',
    name: 'Aceite de girasol 1L',
    price: '€1.79',
    stock: 3,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 8,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/75155332-40f1-4388-8692-c13b32fc603a/1280x1280.webp',
    name: 'Arroz integral 1kg',
    price: '€1.48',
    stock: 15,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 9,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/d6bba5a0-b5c3-4059-9827-36085857abcd/1280x1280.webp',
    name: 'Azúcar blanca 1kg',
    price: '€1.05',
    stock: 2,
    stockMin: 5,
    stockOpt: 20,
  },
  {
    id: 10,
    image: 'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/d0eec726-2ecf-4e1a-9277-738503291bd5/1280x1280.webp',
    name: 'Pan de molde integral 600g',
    price: '€1.16',
    stock: 0,
    stockMin: 5,
    stockOpt: 20,
  },
];
*/

const InventoryPage = () => {
  const [isGridView, setIsGridView] = useState(true)
  const [showOnlyOutOfStock, setShowOnlyOutOfStock] = useState(false)
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false)
  const [showOnlyOptStock, setShowOnlyOptStock] = useState (false)
  const [search, setSearch] = useState('')
  const color = useColorModeValue('black', 'white')
  const { products } = useProductStore();

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
                Stock optimo
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
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            view={isGridView ? 'grid' : 'list'}
            {...product}
          />
        ))}
      </Flex>
    </Box>
  )
}


export default InventoryPage
