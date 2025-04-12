import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CardProps {
  label: string;
  amount: string;
  icon: ReactNode;
  bgIcon?: string;
}

export const Card = ({ label, amount, icon, bgIcon = 'green.500' }: CardProps) => {
  return (
    <Flex
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      p={4}
      align="center"
      justify="space-between"
      minW="210px"
      maxW="100%"
    >
      <Box>
        <Text fontSize="sm" color="gray.500" textAlign="left" >
          {label}
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="black">
          {amount}
        </Text>
      </Box>
      <Flex
        w={10}
        h={10}
        borderRadius="md"
        align="center"
        justify="center"
        bg={bgIcon}
      >
        {icon}
      </Flex>
    </Flex>
  );
};
