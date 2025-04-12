import { Box, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/table";

interface SalesData {
  name: string;
  quantity: string;
  price: string;
}

interface SalesTableProps {
  data?: SalesData[];
}

const SalesTable = ({ data }: SalesTableProps) => {
  const defaultData: SalesData[] = [
    {
      name: "Luis Gonzales",
      quantity: "15 productos cargados",
      price: "$31.400"
    },
    {
      name: "Monica Gomes",
      quantity: "15 productos cargados",
      price: "$31.400"
    },
    {
      name: "Nombre del cliente",
      quantity: "15 productos cargados",
      price: "$31.400"
    },
    {
      name: "Nombre del cliente",
      quantity: "15 productos cargados",
      price: "$31.400"
    }
  ];

  const tableData = data || defaultData;

  return (
    <Box 
      bg="white" 
      overflow="hidden"
      w="100%"
    >
      <Table variant="simple" size="md" width="100%">
        <Thead bg="white">
          <Tr>
            <Th 
              textTransform="uppercase" 
              fontSize="xs" 
              fontWeight="bold" 
              color="gray.700"
              borderBottom="2px solid"
              borderColor="rgba(160, 174, 192, 0.2)"
              width="40%"
              textAlign="left"
              pl={6}
            >
              NOMBRE DE USUARIO
            </Th>
            <Th 
              textTransform="uppercase" 
              fontSize="xs" 
              fontWeight="bold" 
              color="gray.700"
              py={4}
              borderBottom="2px solid"
              borderColor="rgba(160, 174, 192, 0.2)"
              width="30%"
              textAlign="left"
            >
              CANTIDAD
            </Th>
            <Th 
              textTransform="uppercase" 
              fontSize="xs" 
              fontWeight="bold" 
              color="gray.700"
              py={4}
              borderBottom="2px solid"
              borderColor="rgba(160, 174, 192, 0.2)"
              textAlign="left"
              width="30%"
            >
              PRECIO
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item, index) => (
            <Tr key={index} _hover={{  }}>
              <Td 
                py={4} 
                pl={6}
                borderBottom="2px solid" 
                borderColor="rgba(160, 174, 192, 0.1)"
                width="40%"
              >
                <Text fontWeight="medium" color="gray.800">
                  {item.name}
                </Text>
              </Td>
              <Td 
                py={4} 
                borderBottom="2px solid" 
                borderColor="rgba(160, 174, 192, 0.1)"
                width="30%"
              >
                <Text color="gray.600">
                  {item.quantity}
                </Text>
              </Td>
              <Td 
                py={4} 
                borderBottom="2px solid" 
                borderColor="rgba(160, 174, 192, 0.1)"
                textAlign="left"
                width="30%"
              >
                <Text fontWeight="bold" color="gray.800">
                  {item.price}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SalesTable;