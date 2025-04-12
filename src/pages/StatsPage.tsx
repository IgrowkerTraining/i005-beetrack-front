import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface StatsPageProps {
  title?: string;
}

const StatsPage: React.FC<StatsPageProps> = ({ title = 'Statistics' }) => {
  return (
    <Box p={4}>
      <Heading mb={4}>{title}</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Text>Welcome to the statistics page</Text>
      </Box>
    </Box>
  );
};

export default StatsPage;
