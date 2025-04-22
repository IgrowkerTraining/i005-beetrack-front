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
  Separator,
} from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "@/components/login-registerComponents/loginSchema";
import { PasswordInput } from "@/components/ui/password-input";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loginUser = useAuthStore((state) => state.loginUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      setIsLoggingIn(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await loginUser(data);
      console.log("Login successful!");
      setIsLoggingIn(false);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  const isLoading = isLoggingIn || isSubmitting;

  return (
    <Stack
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Card.Root
        minH={{ base: "80vh", md: "60vh" }}
        maxW={{ base: "100%", md: "380px" }}
        variant={"subtle"}
        bg={"gray.50"}
        as="form"
        w="full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card.Header>
          <Flex direction={"column"} align="center" mb={3}>
            <Image
              left={0}
              src={Logo}
              alt="Logo Beetrack"
              maxWidth="50px"
              mb={10}
            />
            <Text w="100%" textAlign="center" fontWeight="bold" fontSize="xl">
              Inicia sesión en Beetrack
            </Text>
          </Flex>
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
          <Box
            as="span"
            w="100%"
            h="1px"
            bg="gray.500"
            my="25px"
            position="relative"
          />
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
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer flexWrap={{ base: "wrap" }} gap={2}>
          <Button
            type="submit"
            variant="solid"
            w="full"
            bg={"amarillo"}
            color={"gray.900"}
            fontWeight={"bold"}
            isLoading={isLoading}
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
          >
            <Link
              textStyle={"xs"}
              textDecoration="underline"
              fontWeight={"bold"}
              href="/forgot-password"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Text textStyle={"xs"}>
              ¿No tienes una cuenta?{" "}
              <Link
                textDecoration="underline"
                fontWeight={"bold"}
                href="/register"
              >
                Regístrate aquí
              </Link>
            </Text>
          </Stack>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
};

export default Login;
