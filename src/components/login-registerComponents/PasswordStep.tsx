import { Field, Box, List, Text, VStack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input"
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PasswordStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const PasswordStep = ({ register, errors }: PasswordStepProps) => {

  return (
    <VStack gap="10" w="full">
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
        <List.Root fontSize="xs" gap={1} pl={4}>
          <List.Item>1 letra</List.Item>
          <List.Item>1 número o carácter especial (ejemplo: #,?,! o &)</List.Item>
          <List.Item>10 caracteres</List.Item>
        </List.Root>
      </Box>
    </VStack>
  );
};