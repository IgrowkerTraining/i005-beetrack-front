import { IoIosArrowForward } from "react-icons/io";
import { ProductItemProps } from "@/components/InventoryComponents/ProductItem";
import { MdArrowBack } from 'react-icons/md'
import {
  Box,
  Button,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Icon,
  Flex,
  Heading,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/703b33e5-f44a-4881-b60f-920c246af8b7/1280x1280.webp",
    name: "Té English Breakfast 25 uds.",
    price: "€0.79",
    stock: 35,
  },
  {
    id: 2,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/5d16a77d-5ae5-443c-8b3c-4487c022e0f9/1280x1280.webp",
    name: "Yerba mate PLAYADITO 500g",
    price: "€3.79",
    stock: 7,
  },
  {
    id: 3,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/3ed18760-5880-4841-8d2b-4bb5a4ede820/1280x1280.webp",
    name: "Agua mineral TELENO 1L",
    price: "€0.22",
    stock: 0,
  },
  {
    id: 4,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/e64ee9b5-1c20-4d70-b276-dde09f16806d/1280x1280.webp",
    name: "Galletas de avena NATURFUN 425g",
    price: "€2.25",
    stock: 5,
  },
  {
    id: 5,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/be613915-6cf6-431c-8946-f53dd23903b9/1280x1280.webp",
    name: "Café molido natural 250g",
    price: "€2.28",
    stock: 10,
  },
  {
    id: 6,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/1fab3eb1-de8c-41b1-b9fd-daf003d5be45/1280x1280.webp",
    name: "Leche entera AUCHAN 1L",
    price: "€0.91",
    stock: 1,
  },
  {
    id: 7,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/dc30d530-6128-4b3e-b6ce-4bb5d6433a4c/1280x1280.webp",
    name: "Aceite de girasol 1L",
    price: "€1.79",
    stock: 3,
  },
  {
    id: 8,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/75155332-40f1-4388-8692-c13b32fc603a/1280x1280.webp",
    name: "Arroz integral 1kg",
    price: "€1.48",
    stock: 15,
  },
  {
    id: 9,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/d6bba5a0-b5c3-4059-9827-36085857abcd/1280x1280.webp",
    name: "Azúcar blanca 1kg",
    price: "€1.05",
    stock: 2,
  },
  {
    id: 10,
    image:
      "https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/d0eec726-2ecf-4e1a-9277-738503291bd5/1280x1280.webp",
    name: "Pan de molde integral 600g",
    price: "€1.16",
    stock: 0,
  },
];

const Notifications = ({
  image,
  name,
  price,
  stock,
  stockMin = 10, //El usuario configura este valor de Stock Mínimo
  stockOpt = 30, //El usuario configura este valor de Stock Óptimo
}: ProductItemProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getStockColor = (itemStock: number) => {
    switch (true) {
      case itemStock <= stockMin:
        return "red.500";
      case itemStock > stockOpt:
        return "green.500";
      default:
        return "yellow.500";
    }
  };

  const getStockLabel = (itemStock: number) => {
    switch (true) {
      case itemStock === 0:
        return "Sin stock";
      case itemStock === 1:
        return "1 Unidad";
      case itemStock > 1:
        return `${itemStock} Unidades`;
      default:
        return "";
    }
  };

  const lowStockProducts = products.filter(product => product.stock <= stockMin)
  const navigate = useNavigate();

  return (
    <Flex
      p={6}
      direction="column"
      h="100%"
      position="relative"
      pb={{ base: "80px", md: 0 }}
    >
      {isMobile && (
        <HStack mb={6} align="center">
          <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
          <Heading fontSize="xl" fontWeight="bold">
            Notificaciones
          </Heading>
        </HStack>
      )}
      <Heading size={'md'}>Faltante de stock</Heading>
      <Box
        bg="white"
        rounded="xl"
        p={4}
        shadow="md"
        maxW={{ base: "100%", md: "750px" }}
        mb={4}
      >
        {lowStockProducts.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No hay notificaciones
          </Text>
        ) : (
          lowStockProducts.map((item) => (
            <Flex
              key={item.id}
              align="center"
              justify="space-between"
              py={2}
              borderBottom="1px solid"
              borderColor="gray.100"
              _last={{ borderBottom: "none" }}
            >
              <HStack gap={3}>
                <Image
                  boxSize="40px"
                  src={item.image}
                  alt={item.name}
                  objectFit="contain"
                />
                <VStack align="start" gap={0}>
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.price}
                  </Text>
                </VStack>
              </HStack>

              <HStack gap={2}>
                <Badge
                  minW={"108px"}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  bg="gray.50"
                  borderRadius="full"
                  fontSize="xs"
                  px={2}
                  py={1}
                >
                  <Box w="8px" h="8px" bg={getStockColor(item.stock)} borderRadius="full" />
                  {getStockLabel(item.stock)}
                </Badge>
                <Icon as={IoIosArrowForward} boxSize={5} color="gray.600" />
              </HStack>
            </Flex>
          ))
        )}
      </Box>

      {isMobile && (
        <Link
          href="/inventory"
          w="full"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          p={4}
          zIndex={10}
        >
          <Button
            variant="solid"
            w="full"
            colorPalette="yellow"
            color="gray.900"
            fontWeight="bold"
            borderRadius="xl"
            py={6}
          >
            Ir a todo el inventario
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Notifications;
