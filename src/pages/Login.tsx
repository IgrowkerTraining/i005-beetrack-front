import {
  Button,
  Field,
  Input,
  Card,
  Stack,
  Text,
  Image,
  Flex,
  Box,
  Link,
  HStack,
  Heading,
} from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import { MdInventory, MdPointOfSale, MdShoppingCart } from 'react-icons/md';
import HexagonPattern from "@/assets/HexagonPattern.svg";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "@/components/login-registerComponents/loginSchema";
import { PasswordInput } from "@/components/ui/password-input";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { isPending, mutate } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      mutate({
        email: data.email,
        password: data.password
      });

    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
      {/* Left Panel: solo aparece en desktop */}

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
                {/* Replace with your icon */}
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

      {/* Right Panel: Login Form */}
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
        <Card.Root
          minH={{ base: "90vh", md: "60vh" }}
          maxW={{ base: "100%", md: "380px" }}
          variant={"subtle"}
          bg={"transparent"}
          as="form"
          w="full"
          onSubmit={handleSubmit(onSubmit)}
          position="relative"
          zIndex="1"
        >
          <Card.Header>
            <Flex direction={"column"} align="flex-start" mb={8}>
              <HStack>
                <Image src={Logo} alt="Logo Beetrack" maxWidth="50px" />
                <Box mx={3}>
                  <Heading size="md" fontWeight="bold" lineHeight="1" mb={0}>
                    BEETRACK
                  </Heading>
                  <Text
                    as="span"
                    fontSize="xs"
                    color="gray.600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    SALES & INVENTORY MANAGER
                  </Text>
                </Box>
              </HStack>
            </Flex>
            <Box mt={5}>
              <Heading w="100%" fontWeight="bold" fontSize="xl">
                Iniciar sesión
              </Heading>
              <Text my={2} textStyle={"xs"}>
                ¿Eres nuevo?{" "}
                <Link
                  as={NavLink}
                  to='/register'
                  textDecoration="underline"
                  fontWeight={"bold"}
                >
                  Crear una cuenta
                </Link>
              </Text>
            </Box>
          </Card.Header>
          <Card.Body>
            <Button
              border={"1px solid"}
              variant="outline"
              mb={4}
              w="full"
              fontWeight={"bold"}
              borderRadius="xl"
              size={"lg"}
            >
              <AiFillGoogleCircle /> Registrate con Google
            </Button>
            <Button
              border={"1px solid"}
              variant="outline"
              w="full"
              fontWeight={"bold"}
              borderRadius="xl"
              size={"lg"}
            >
              <IoLogoFacebook /> Registrate con Facebook
            </Button>
            <Flex align="center" width="100%" my={4}>
              <Box flex="1" height="1px" bg="gray.300" />
              <Text mx={4} fontWeight="bold" color="gray.600" fontSize="md">
                0
              </Text>
              <Box flex="1" height="1px" bg="gray.300" />
            </Flex>
            <Stack gap="6" w="full">
              <Field.Root invalid={!!errors.email}>
                <Field.Label>Dirección de email</Field.Label>
                <Input
                  type="email"
                  placeholder="nombre@dominio.com"
                  {...register("email")}
                  borderRadius="md"
                  size="lg"
                />
                {errors.email && (
                  <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label>Contraseña</Field.Label>
                <PasswordInput
                  type="password"
                  placeholder="**********"
                  {...register("password")}
                />
                {errors.password && (
                  <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                )}
                <Link
                  textStyle={"xs"}
                  textDecoration="underline"
                  fontWeight={"bold"}
                  href="/forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer flexWrap={{ base: "wrap" }} gap={2}>
            <Button
              type="submit"
              variant="solid"
              w="full"
              colorPalette={"yellow"}
              color={"gray.900"}
              fontWeight={"bold"}
              loading={isPending}
              loadingText={"Iniciando sesión"}
              borderRadius="xl"
              py={6}
            >
              Iniciar sesión
            </Button>

            <Stack
              mt={10}
              gap={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={"full"}
            ></Stack>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Flex>
  );
};

export default Login;
