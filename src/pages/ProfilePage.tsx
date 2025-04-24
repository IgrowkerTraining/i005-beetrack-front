import StoreEditForm from '@/components/ProfileComponents/StoreEditForm';
import StoreProfileCard from '@/components/ProfileComponents/StoreProfileCard';
import UserEditForm from '@/components/ProfileComponents/UserEditForm';
import UserProfileCard from '@/components/ProfileComponents/UserProfileCard';
import { useFetchProfile, useUpdateStore, useUpdateUser } from '@/hooks/useProfile';
import useProfileStore from '@/store/useProfileStore';
import { Box, Center, GridItem, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const ProfilePage = () => {
  const [isEditingStore, setIsEditingStore] = useState<boolean>(false);
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const { isLoading, isError/* , error */ } = useFetchProfile();
  const { profile } = useProfileStore();
  const { mutate: mutateStore, isPending: isPendingStore } = useUpdateStore();
  const { mutate: mutateUser, isPending: isPendingUser } = useUpdateUser();

  if (isError) {
    return (
      <Center h={"full"}>
        <Text fontWeight={"bold"} color={"gray.500"}>
          {isError
            ? "Error de red."
            : "No se pudo recuperar la información como se esperaba. Por favor, inténtelo de nuevo más tarde."
          }
        </Text>
      </Center>
    )
  }

  if (isLoading || !profile) {
    return (
      <VStack colorPalette="gray" h={"full"} justifyContent={"center"} alignItems={"center"} flexGrow={1} w={"full"}>
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
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
          {!isEditingStore
            ? (
              <StoreProfileCard setIsEditingStore={setIsEditingStore} isPending={isPendingStore} />
            ) : (
              <StoreEditForm setIsEditingStore={setIsEditingStore} mutateStore={mutateStore} />
            )
          }
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
          {!isEditingUser
            ? (
              <UserProfileCard setIsEditingUser={setIsEditingUser} isPending={isPendingUser} />
            ) : (
              <UserEditForm setIsEditingUser={setIsEditingUser} mutateUser={mutateUser} />
            )
          }
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default ProfilePage;