import { Button, Field, HStack, Input, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PersonalInfoForm, personalInfoSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type PersonalInfoStepProps = {
  onSubmit?: (data: PersonalInfoForm) => void;
  onBack: () => void;
};

export const PersonalInfoStep = ({ onSubmit, onBack }: PersonalInfoStepProps) => {
  // console.log("Personal info errors:", errors.name, errors.lastName, errors.dateOfBirth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
  })

  const onSubmitHandler: SubmitHandler<PersonalInfoForm> = (data) => {
    onSubmit?.(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
        <Field.Root invalid={!!errors.last_name}>
          <Field.Label>Apellido</Field.Label>
          <Input
            type="text"
            placeholder="Introduce tu apellido"
            {...register("last_name")}
          />
          {errors.last_name && (
            <Field.ErrorText>{errors.last_name.message as string}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.birthdate}>
          <Field.Label>Fecha de nacimiento</Field.Label>
          <Input
            type="date"
            {...register("birthdate")}
          />
          {errors.birthdate && (
            <Field.ErrorText>{errors.birthdate.message as string}</Field.ErrorText>
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
            flexBasis={"1/2"}>
            Continuar
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};