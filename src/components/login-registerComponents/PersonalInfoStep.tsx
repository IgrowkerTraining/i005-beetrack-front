import { Field, Input, Stack } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PersonalInfoStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const PersonalInfoStep = ({ register, errors }: PersonalInfoStepProps) => {
  console.log("Personal info errors:", errors.name, errors.lastName, errors.dateOfBirth); 
  return (
    <Stack gap="8" w="full">
      <Field.Root invalid={!!errors.name}>
        <Field.Label>Nombre</Field.Label>
        <Input
          type="text"
          placeholder="Introduce tu nombre"
          {...register("name")}
        />
        {errors.name && (
          <Field.ErrorText>{errors.name.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root invalid={!!errors.lastName}>
        <Field.Label>Apellido</Field.Label>
        <Input
          type="text"
          placeholder="Introduce tu apellido"
          {...register("lastName")}
        />
        {errors.lastName && (
          <Field.ErrorText>{errors.lastName.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root invalid={!!errors.dateOfBirth}>
        <Field.Label>Fecha de nacimiento</Field.Label>
        <Input
          type="date"
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <Field.ErrorText>{errors.dateOfBirth.message as string}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};