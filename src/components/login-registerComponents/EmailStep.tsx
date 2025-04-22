import { Box, Button, Field, FieldLabel, Flex, Input, Link, Stack, Text } from "@chakra-ui/react";
import { CheckEmailForm, emailSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { authService } from "@/services/authService";
import { toaster } from "../ui/toaster";
import { useState } from "react";

type EmailStepProps = {
  onSubmit?: (data: CheckEmailForm) => void;
};

export const EmailStep = (props: EmailStepProps) => {
  const [verifyingEmail, setVeryfingEmail] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckEmailForm>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit: SubmitHandler<CheckEmailForm> = async (data: CheckEmailForm) => {
    try {
      setVeryfingEmail(true);
      const emailExists = await authService.checkEmailExists(data.email);
      
      if(!emailExists) {
        props.onSubmit?.(data);
      } else {
        toaster.create({
          type: 'error',
          description: "Esa cuenta de email ya ha sido utilizada"
        })
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setVeryfingEmail(false);
    }
  }

  return (
    <>
      <Stack
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={"full"}
      >
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
            Regístrate con tu email
          </Text>
          <Box flex="1" height="1px" bg="gray.300" />
        </Flex>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="8" w="full">
          <Field.Root invalid={!!errors.email}>
            <FieldLabel fontSize={"medium"}>Dirección de email</FieldLabel>
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

          <Button
            type={"submit"}
            mb={"0"}
            p={"14px"}
            h={"auto"}
            colorPalette={"navItem"}
            color={"colorPalette.fg"}
            fontWeight={"bold"}
            rounded={"16px"}
            loading={verifyingEmail}
            loadingText={"Verificando..."}>
            Continuar
          </Button>
        </Stack>
      </form>

      <Box mt={3} textStyle={"xs"}>
        ¿Ya tienes una cuenta?{" "}
        <Link asChild
          textDecoration="underline"
          fontWeight={"bold"}
        >
          <NavLink to="/login">
            Iniciar sesión
          </NavLink>
        </Link>
      </Box>
    </>
  );
};