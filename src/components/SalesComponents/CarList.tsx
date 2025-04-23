import { SaleItem } from "@/types/salesTypes";
import {
    Box,
    HStack,
    VStack,
    Text,
    Image,
    Button,
  } from "@chakra-ui/react";
  import { FaPlus, FaMinus, FaRegTrashAlt  } from "react-icons/fa";
  
  
  
  type Props = {
    items: SaleItem[];
    onAdd: (item: SaleItem) => void;
    onRemove: (id: number) => void;
    onDelete: (id: number) => void;
  };
  
  export default function CarList({ items, onAdd, onRemove, onDelete }: Props) {
    
  
    return (
      <VStack  w="full" px={4} overflowY="auto" pb={4} bg={"white"} height="auto">
        <HStack w="full" justify="space-between" fontWeight="bold" px={2} mb={4} >
          <Text>Producto y Cantidad</Text>
          <Text>Precio</Text>
        </HStack>
  
        {items.map((item) => (
          <Box
            key={item.id}
            w="full"            
            borderRadius="2xl"
            bg="white"
            boxShadow="base"
          >
            <HStack align="center">
              <Image
                src={item.imagePath}
                boxSize="50px"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.300"
                objectFit="cover"
              />
              <VStack align="start"  flex={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {item.name}
                </Text>
                <HStack >
                <Button
                    onClick={() => onRemove(item.id)}
                    size="sm"
                    variant="ghost"
                    p={0}
                >
                    <FaMinus />
                </Button>
                  <Box
                    px={5}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    fontWeight="bold"
                  >
                    {item.quantity}
                  </Box>
                  <Button
                    onClick={() => onAdd(item)}
                    size="sm"
                    variant="ghost"
                    p={0}
                >
                    <FaPlus />
                </Button>
                </HStack>
              </VStack>
  
              <HStack  align="center">
                <Text color="green.500" fontWeight="bold" fontSize={"sm"}>
                  ${item.price.toFixed(3)}
                </Text>
                <Button
                    onClick={() => onDelete(item.id)}
                    size="sm"
                    variant="ghost"
                    p={0}
                >
                    <FaRegTrashAlt />
                </Button>
                
              </HStack>
            </HStack>
          </Box>
        ))}                 
      </VStack>
    );
  }
  