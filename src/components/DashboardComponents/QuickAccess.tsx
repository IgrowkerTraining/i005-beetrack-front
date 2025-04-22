import {
  Box,
  Button,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  AspectRatio,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaShoppingCart, FaBarcode } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useNavigate } from 'react-router-dom';

export default function QuickAccess() {
  const color = useColorModeValue("blue.400", "white");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const actions = [
    {
      label: "Registrar venta",
      icon: FaShoppingCart,
      onClick: () => {
        navigate('/sales/new');
      },
    },
    {
      label: "Agregar producto",
      icon: MdInventory2,
      onClick: () => {
        navigate('/products');
      },
    },
    {
      label: "Escanea para editar producto",
      icon: FaBarcode,
      onClick: () => {
        navigate('productscanner');
      },
    },
  ];
  
  return (
    <Box>
      <Heading size="md" mb={4}>
        Acceso rápido
      </Heading>

      <SimpleGrid columns={{ base: 3 }} gap={4}>
        {actions.map(({ label, icon, onClick }, idx) => (
          isMobile ? (
            <AspectRatio key={idx} ratio={1} w="100%">
              <Button
                onClick={onClick}
                bg="yellow.400"
                _hover={{ bg: "yellow.500" }}
                borderRadius="xl"
                p={2}
                w="100%"
                h="100%"
                textAlign="center"
                variant="solid"
              >
                <VStack gap={2} justify="center">
                  <Icon as={icon} boxSize={6} color={color} />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                    color={color}
                    textAlign="center"
                    whiteSpace="normal"
                  >
                    {label}
                  </Text>
                </VStack>
              </Button>
            </AspectRatio>
          ) : (
            <Button
              key={idx}
              onClick={onClick}
              bg="yellow.400"
              _hover={{ bg: "yellow.500" }}
              borderRadius="xl"
              py={6}
              px={2}
              w="100%"
              minH="100px"
              height="auto"
              textAlign="center"
              variant="solid"
            >
              <VStack gap={2}>
                <Icon as={icon} boxSize={6} color={color} />
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "xs", md: "sm" }}
                  color={color}
                  textAlign="center"
                  whiteSpace="normal"
                >
                  {label}
                </Text>
              </VStack>
            </Button>
          )
        ))}
      </SimpleGrid>
    </Box>
  );
}
