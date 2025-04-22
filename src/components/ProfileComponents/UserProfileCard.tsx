import useProfileStore from "@/store/useProfileStore";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, DataList, Spinner, Text, VStack } from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";

type UserProfileCardProps = {
    setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
    isPending: boolean;
}

const UserProfileCard = ({ setIsEditingUser, isPending }: UserProfileCardProps) => {
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
            <DataList.Root size="lg">
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Nombre</DataList.ItemLabel>
                    <DataList.ItemValue>{profile!.name}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Apellidos</DataList.ItemLabel>
                    <DataList.ItemValue>{profile!.last_name}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Fecha de nacimiento</DataList.ItemLabel>
                    <DataList.ItemValue>{dateFormatter(profile!.birthdate)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Email</DataList.ItemLabel>
                    <DataList.ItemValue>{profile!.email}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
                    <DataList.ItemValue>{dateFormatter(profile!.createdAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Última actualización del usuario</DataList.ItemLabel>
                    <DataList.ItemValue>{dateFormatter(profile!.updatedAt)}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
            <Button colorPalette="yellow" variant="solid" mt={"auto"} rounded={"16px"} onClick={() => setIsEditingUser(true)}>
                <MdOutlineEdit /> Editar
            </Button>
        </>
    )
}

export default UserProfileCard;