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
  GridItem,
} from "@chakra-ui/react";
import { FaCashRegister } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Registrar venta",
    icon: FaCashRegister,    
  }
];

interface ActionsButtonProps {
  readonly title?: string;
}

export default function ActionsButton({ title = "Acceso rápido"} : ActionsButtonProps) {
  const color = useColorModeValue("blue.400", "white");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  
  return (
    <Box>
      <Heading size="md" mb={4}>
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 4 }} gap={4}>
        {actions.map(({ label, icon }, idx) => (
          isMobile ? (
            <GridItem key={idx} colSpan={2}>
                <Button
                  onClick={() => navigate("/cash")}
                  bg="yellow.400"
                  _hover={{ bg: "yellow.500" }}
                  borderRadius="xl"
                  p={2}
                  w="100%"
                  h="100px"
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
            </GridItem>
          ) : (
            <Button
              key={idx}
              onClick={() => navigate("/cash")}
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
