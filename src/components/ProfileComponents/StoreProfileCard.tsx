import useProfileStore from "@/store/useProfileStore";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, DataList, Spinner, Text, VStack } from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";

type StoreProfileCardProps = {
    setIsEditingStore: React.Dispatch<React.SetStateAction<boolean>>;
    isPending: boolean;
}

const StoreProfileCard = ({ setIsEditingStore, isPending }: StoreProfileCardProps) => {
    const { profile } = useProfileStore();

    if (isPending) {
        return (
            <VStack colorPalette="gray" w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"}>
                <Spinner color="colorPalette.600" />
                <Text color="colorPalette.600">Editing...</Text>
            </VStack>
        )
    }

    return (
        <>
            <DataList.Root size="lg" w={"full"}>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Nombre</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.store.name}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Dirección</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.store.address}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Teléfono</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.store.tel}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.store.createdAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Última actualización de la tienda</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.store.updatedAt)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
            <Button
                mt={"auto"}
                colorPalette="navItem"
                color={"colorPalette.fg"}
                fontWeight={"bold"}
                variant="solid"
                rounded={"16px"}
                onClick={() => setIsEditingStore(true)}>
                <MdOutlineEdit /> Editar
            </Button>
        </>
    )
}

export default StoreProfileCard;