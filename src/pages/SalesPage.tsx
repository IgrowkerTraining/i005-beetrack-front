import React from 'react';
import { Box, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { color } from '@chakra-ui/system';
import ActionsButton from '@/components/SalesComponents/ActionsButton';
import SalesList from '@/components/SalesComponents/SalesList';

const SalesPage: React.FC = () => {
  return (
    <Box >
      <Flex direction="column" overflow="hidden" margin="0" padding="0">
            <Box >
              <SimpleGrid columns={12} gap={6}>
                <GridItem colSpan={12}>
                  <ActionsButton title="Caja"/>
                </GridItem>

                <GridItem colSpan={{ base: 12, lg: 12 }}>
                  <Flex justify="space-between" align="center" mt={2} mb={2}>
                    <Text fontWeight="bold" fontSize="lg" color={color}>
                      Historial de ventas
                    </Text>
                  </Flex>
                  <SalesList />
                </GridItem>
              </SimpleGrid>
            </Box>
          </Flex>
    </Box>
  );
};

export default SalesPage;
