import { StoreDataForm, storeDataFormSchema } from "@/schemas/profileSchemas";
import useProfileStore from "@/store/useProfileStore";
import { Store } from "@/types/profileTypes";
import { Button, Field, HStack, Input, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type StoreEditFormProps = {
    setIsEditingStore: React.Dispatch<React.SetStateAction<boolean>>;
    mutateStore: (variables: { updatedStore: Partial<Store> }) => void;
}

const StoreEditForm = ({ setIsEditingStore, mutateStore } : StoreEditFormProps) => {
    const { profile } = useProfileStore();


    const { register, handleSubmit, formState: { errors } } = useForm<StoreDataForm>({
        resolver: zodResolver(storeDataFormSchema),
        defaultValues: {
            name: profile?.store.name ?? '',
            address: profile?.store.address ?? '',
            tel: profile?.store.tel ?? '',
        }
    });

    const onStoreSubmit = (data: StoreDataForm) => {
        mutateStore({ updatedStore: data });
        setIsEditingStore(false);
    }

    return (
        <form onSubmit={handleSubmit(onStoreSubmit)} style={{ width: "100%" }}>
            <VStack gap={4} align="stretch">
                <Field.Root invalid={!!errors.name} required>
                    <Field.Label>
                        Nombre
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("name")} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.address} required>
                    <Field.Label>
                        Dirección
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("address")} />
                    <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.tel} required>
                    <Field.Label>
                        Teléfono
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("tel")} />
                    <Field.ErrorText>{errors.tel?.message}</Field.ErrorText>
                </Field.Root>

                <HStack justify="end">
                    <Button variant="ghost" onClick={() => setIsEditingStore(false)}>Cancelar</Button>
                    <Button type="submit" colorPalette="navItem" variant="solid">Guardar</Button>
                </HStack>
            </VStack>
        </form>
    )
}

export default StoreEditForm;