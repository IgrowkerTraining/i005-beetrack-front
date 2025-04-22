import {
  Box,
  Text,
  Stack,
  Heading,
  Image, Flex,
  HStack
} from "@chakra-ui/react";
import HexagonPattern from "@/assets/HexagonPattern.svg";
import { MdInventory, MdPointOfSale, MdShoppingCart } from 'react-icons/md';
import RegisterForm from "@/components/login-registerComponents/RegisterForm";

const Register = () => {
  return (
    <Flex
      minH="100vh"
      maxW="100vw"
      w="100%"
      direction={{ base: "column", md: "row" }}
      bg="gray.50"
      align="stretch"
      position="relative"
      overflow="hidden"
    >
      {/* Left Panel: only visible on desktop */}
      <Flex
        flex={1}
        display={{ base: "none", md: "flex" }}
        direction="column"
        align="center"
        justify="center"
        bg="gray.50"
        px={12}
        py={8}
        position="relative"
      >
        <Box
          position="absolute"
          top="-70px"
          left="-50px"
          zIndex="0"
          pointerEvents="none"
        >
          <Image
            src={HexagonPattern}
            alt="Decorative pattern"
            width="250px"
            height="183px"
          />
        </Box>
        <Box mb={8} w="full" zIndex={1}>
          <Heading fontSize="2xl" fontWeight="bold" mb={2}>
            TODO TU NEGOCIO, EN UNA SOLA APP
          </Heading>
          <Text fontSize={'sm'} color="gray.600" mb={6}>
            Pensado para emprendedores y comercios que quieren simplificar su día a día.
          </Text>
          <Stack gap={4}>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdInventory size="24px" />
              </Box>
              <Text fontWeight="bold">Controlá tu inventario</Text>
            </HStack>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdShoppingCart size="24px" />
              </Box>
              <Text fontWeight="bold">Registrá ventas</Text>
            </HStack>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdPointOfSale size="24px" />
              </Box>
              <Text fontWeight="bold">Gestioná tu caja de forma fácil y rápida.</Text>
            </HStack>
          </Stack>
        </Box>
        <Box display="flex" alignItems={'flex-end'}>
          <Image
            src="/src/assets/imgLogin.svg"
            maxW="100%"
            maxH="430px"
            objectFit="contain"
            w="100%"
            h="auto" />
        </Box>
      </Flex>

      {/* Right Panel: Register Form */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        position="relative"
        bg="white"
        shadow={'lg'}
        py={{ base: 8, md: 0 }}
      >
        <Box
          position="absolute"
          bottom="-70px"
          right="-50px"
          zIndex="0"
          pointerEvents="none"
        >
          <Image
            src={HexagonPattern}
            alt="Decorative pattern"
            width="250px"
            height="183px"
          />
        </Box>
        <RegisterForm />
      </Flex>
    </Flex>
  );
};

export default Register;
