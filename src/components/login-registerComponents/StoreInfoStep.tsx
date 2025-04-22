import { Button, Field, HStack, Input, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StoreInfoForm, storeInfoSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type StoreInfoStepProps = {
  onSubmit?: (data: StoreInfoForm) => void;
  onBack: () => void;
  isPending: boolean;
};

export const StoreInfoStep = ({ onSubmit, onBack, isPending }: StoreInfoStepProps) => {
  // console.log("Store info errors:", errors.storeName, errors.storeTel, errors.storeAddress); // Add debugging
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreInfoForm>({
    resolver: zodResolver(storeInfoSchema),
  })

  const onSubmitHandler: SubmitHandler<StoreInfoForm> = (data) => {
    onSubmit?.(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack gap="8" w="full">
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
        <Field.Root invalid={!!errors.storeTel}>
          <Field.Label>Teléfono del establecimiento</Field.Label>
          <Input
            type="tel"
            placeholder="000-000-00"
            {...register("storeTel")}
          />
          {errors.storeTel && (
            <Field.ErrorText>{errors.storeTel.message}</Field.ErrorText>
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
            loading={isPending}
            loadingText={"Registrando..."}
            flexBasis={"1/2"}>
            Registrar
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};