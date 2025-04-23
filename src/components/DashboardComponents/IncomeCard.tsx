import { Box, Flex, Icon, Text, Button } from '@chakra-ui/react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IncomeCard() {
  const navigate = useNavigate();
  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm" w="100%">
    <Flex
        align="center"
        gap={4}
        borderRadius="lg"
        p={4}
      >
      <Flex align="center" gap={3}>
        <Box
          bg="green.400"
          p={3}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={ArrowUpRight} boxSize={6} color="blue.400" />
        </Box>

        <Box>
          <Text fontWeight="bold" color="blackAlpha.800">
            Ingresos
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="green.500">
            $233.382,<Text as="span" fontSize="sm">01</Text>
          </Text>
        </Box>
      </Flex>

      <Button
        variant="plain"
        color="blackAlpha.700"
        fontWeight="medium"
        fontSize="sm"
        ml="auto"
        onClick={() => navigate('/stats')}
      >
        Ver más &gt;
      </Button>
    </Flex>
    </Box>
  );
};
