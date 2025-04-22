import { Field, Box, Stack, Text, Button, HStack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordForm, passwordSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type PasswordStepProps = {
  onSubmit?: (data: PasswordForm) => void;
  onBack: () => void;
};

export const PasswordStep = ({ onSubmit, onBack }: PasswordStepProps) => {
  // console.log("Password errors:", errors.password, errors.confirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmitHandler: SubmitHandler<PasswordForm> = (data) => {
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack gap="8" w="full">
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Contraseña</Field.Label>
          <PasswordInput
            type="password"
            placeholder="**********"
            {...register("password")}
          />

          {errors.password && (
            <Field.ErrorText>{errors.password.message as string}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Confirmar contraseña</Field.Label>
          <PasswordInput
            type="password"
            placeholder="**********"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <Field.ErrorText>{errors.confirmPassword.message as string}</Field.ErrorText>
          )}
        </Field.Root>

        <Box
          w="80%"
          p={0}
          borderWidth="none"
        >
          <Text textStyle={'sm'} fontWeight="medium" mb={6}>
            La contraseña debe tener al menos
          </Text>
          <Stack fontSize="xs" gap={1}>
            <Text>1 letra</Text>
            <Text>1 número o carácter especial (ejemplo:#?,) o &)</Text>
            <Text>10 caracteres</Text>
          </Stack>
        </Box>
        <HStack justifyContent={"space-around"}>
          <Button
            type={"button"}
            mb={"0"}
            p={"14px"}
            h={"auto"}
            variant={"surface"}
            fontWeight={"bold"}
            rounded={"16px"}
            flexBasis={"1/2"}
            onClick={onBack}>
            Volver
          </Button>
          <Button
            type={"submit"}
            mb={"0"}
            p={"14px"}
            h={"auto"}
            colorPalette={"navItem"}
            color={"colorPalette.fg"}
            fontWeight={"bold"}
            rounded={"16px"}
            flexBasis={"1/2"}>
            Continuar
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};