import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const SalesPage: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Sales Dashboard</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Text>Welcome to the sales dashboard</Text>
      </Box>
    </Box>
  );
};

export default SalesPage;
