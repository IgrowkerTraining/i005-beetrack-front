import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const HistoryPage: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>History Page</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Text>This is a basic history page component</Text>
      </Box>
    </Box>
  );
};

export default HistoryPage;
