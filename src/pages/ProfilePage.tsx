import { useFetchProfile } from '@/hooks/useProfile';
import useProfileStore from '@/store/useProfileStore';
import { dateFormatter } from '@/utils/dateFormatter';
import { Box, Button, Center, DataList, GridItem, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';

export interface UserData {
  id: string;
  name: string;
  last_name: string;
  birthdate: Date;
  email: string;

  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  store: {
    id: string;
    name: string;
    address: string;
    tel: string;
    status: 'ACTIVE' | 'BLOCKED';
    createdAt: Date;
    updatedAt: Date;
  }
}

const ProfilePage = () => {

  const { isLoading, isError, error } = useFetchProfile()
  const { profile } = useProfileStore();

  if (isLoading) return (
    <VStack colorPalette="gray" h={"full"} justifyContent={"center"} alignItems={"center"}>
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  );

  if (isError || !profile || !profile.store) {
    return (
      <Center h={"full"}>
        <Text fontWeight={"bold"} color={"gray.500"}>
          {isError
            ? error.message
            : "No se pudo recuperar la información como se esperaba. Por favor, inténtelo de nuevo más tarde."
          }
        </Text>
      </Center>
    )
  }

  return (
    <SimpleGrid columns={12} gap={6}>
      <GridItem as={VStack} alignItems={"stretch"} gap={"12px"} w={"full"} colSpan={{ base: 12, lg: 6 }}>
        <Text fontWeight="bold" fontSize="lg">
          Datos del comercio
        </Text>
        <Box
          as={VStack}
          alignItems={"start"}
          gap={4}
          bg="white"
          p={7}
          flexGrow={1}
          borderRadius="3xl"
          boxShadow="md">
          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Nombre</DataList.ItemLabel>
              <DataList.ItemValue>{profile.store.name}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Dirección</DataList.ItemLabel>
              <DataList.ItemValue>{profile.store.address}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Teléfono</DataList.ItemLabel>
              <DataList.ItemValue>{profile.store.tel}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
              <DataList.ItemValue>{dateFormatter(profile.store.createdAt)}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Última actualización de la tienda</DataList.ItemLabel>
              <DataList.ItemValue>{dateFormatter(profile.store.updatedAt)}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <Button colorPalette="yellow" variant="solid" mt={"auto"} rounded={"16px"}>
            <MdOutlineEdit /> Editar
          </Button>
        </Box>
      </GridItem>

      <GridItem as={VStack} alignItems={"stretch"} gap={"12px"} w={"full"} colSpan={{ base: 12, lg: 6 }}>
        <Text fontWeight="bold" fontSize="lg">
          Datos del comerciante
        </Text>
        <Box
          as={VStack}
          alignItems={"start"}
          gap={4}
          bg="white"
          p={7}
          flexGrow={1}
          borderRadius="3xl"
          boxShadow="md">

          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Nombre</DataList.ItemLabel>
              <DataList.ItemValue>{profile.name}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Apellidos</DataList.ItemLabel>
              <DataList.ItemValue>{profile.last_name}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Fecha de nacimiento</DataList.ItemLabel>
              <DataList.ItemValue>{profile.birthdate}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Email</DataList.ItemLabel>
              <DataList.ItemValue>{profile.email}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
              <DataList.ItemValue>{dateFormatter(profile.createdAt)}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel fontWeight={"bold"}>Última actualización del usuario</DataList.ItemLabel>
              <DataList.ItemValue>{dateFormatter(profile.updatedAt)}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <Button colorPalette="yellow" variant="solid" mt={"auto"} rounded={"16px"}>
            <MdOutlineEdit /> Editar
          </Button>

        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProfilePage;