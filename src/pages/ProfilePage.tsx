import { Box, Heading, Text } from '@chakra-ui/react';

const ProfilePage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Profile Page</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Text mb={4} color={"black"} textAlign={"center"}>Esto es el perfil</Text>
      </Box>
    </Box>
  );
};

export default ProfilePage;