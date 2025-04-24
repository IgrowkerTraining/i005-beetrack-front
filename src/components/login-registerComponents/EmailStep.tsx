import { Field, Input, Stack, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type EmailStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const EmailStep = ({ register, errors }: EmailStepProps) => {
  return (
    <Stack gap="4" w="full">
      <Text fontWeight="medium">Dirección de email</Text>
      <Field.Root invalid={!!errors.email}>
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
    </Stack>
  );
};