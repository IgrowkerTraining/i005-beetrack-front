import { Field, Input, Stack } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type StoreInfoStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const StoreInfoStep = ({ register, errors }: StoreInfoStepProps) => {
  console.log("Store info errors:", errors.storeName, errors.storePhone, errors.storeAddress); // Add debugging
  
  return (
    <Stack gap="4" w="full">
      <Field.Root invalid={!!errors.storeName}>
        <Field.Label>Nombre del establecimiento</Field.Label>
        <Input
          type="text"
          placeholder="Nombre del establecimiento"
          {...register("storeName")}
        />
        {errors.storeName && (
          <Field.ErrorText>{errors.storeName.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root invalid={!!errors.storePhone}>
        <Field.Label>Teléfono del establecimiento</Field.Label>
        <Input
          type="tel"
          placeholder="000-000-00"
          {...register("storePhone")}
        />
        {errors.storePhone && (
          <Field.ErrorText>{errors.storePhone.message}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root invalid={!!errors.storeAddress}>
        <Field.Label>Dirección del establecimiento</Field.Label>
        <Input
          type="text"
          placeholder="Calle, número, colonia, municipio, estado"
          {...register("storeAddress")}
        />
        {errors.storeAddress && (
          <Field.ErrorText>{errors.storeAddress.message as string}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};