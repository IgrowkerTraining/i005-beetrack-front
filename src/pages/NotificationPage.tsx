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
import { NavLink, useNavigate } from "react-router-dom";
import useProductStore from "@/store/useProductStore";
import { Product } from "@/types/productType";
import { useFetchProducts } from "@/hooks/useProduct";


const Notifications = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { products } = useProductStore();
  useFetchProducts()

  const getStockColor = (item: Product) => {
    switch (true) {
      case item.stock <= item.stock_min:
        return "red.500";
      case item.stock > item.stock_optimus:
        return "green.500";
      default:
        return "green.500";
    }
  };

  const getStockLabel = (item: Product) => {
    switch (true) {
      case item.stock === 0:
        return "Sin stock";
      case item.stock === 1:
        return "1 Unidad";
      case item.stock > 1:
        return `${item.stock} Unidades`;
      default:
        return "";
    }
  };

  const lowStockProducts = products.filter(product => product.stock <= product.stock_min)
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
      <Heading mb={2} size={'md'}>Faltante de stock</Heading>
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
                  src={item.imagePath}
                  alt={item.name}
                  objectFit="contain"
                />
                <VStack align="start" gap={0}>
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.salesPrice}
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
                  <Box w="8px" h="8px" bg={getStockColor(item)} borderRadius="full" />
                  {getStockLabel(item)}
                </Badge>
                <Icon as={IoIosArrowForward} boxSize={5} color="gray.600" />
              </HStack>
            </Flex>
          ))
        )}
      </Box>

      {isMobile && (
        <Link
          as={NavLink}
          to="/inventory"
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
