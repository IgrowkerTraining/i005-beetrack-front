import {

    HStack,
    Text,
    Icon,
    Button,
    
  } from "@chakra-ui/react";
  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from "@chakra-ui/menu"
import { FaCalendarAlt } from "react-icons/fa";
import { PaymentMethod } from "@/enums/paymentMethod.enum";
import { MdKeyboardArrowDown } from "react-icons/md";
  
  interface SalesFiltersProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    selectedType: PaymentMethod | "all";
    onTypeChange: (type: PaymentMethod | "all") => void;
    order: "asc" | "desc";
    onOrderChange: (order: "asc" | "desc") => void;
  }
  
  export default function SalesFilters({
    selectedDate,
    selectedType,
    onTypeChange,
    order,
    onOrderChange,
  }: SalesFiltersProps) {
    return (
      <HStack
        w="full"
        justify="space-between"
        flexWrap="wrap"
        gap={4}
        px={2}
        mb={2}
      >
        <HStack>
          <Text fontSize="sm" color="gray.600">
            Fecha:
          </Text>
          <Text fontWeight="bold" fontSize="sm">
            {selectedDate}
          </Text>
          <Button  variant="ghost" size="sm" fontWeight="bold" >
            <Icon as={FaCalendarAlt} boxSize={4} />
          </Button>
        </HStack>
  
        <HStack>
          <Text fontSize="sm" color="gray.600">
            Tipo:
          </Text>
          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm" fontWeight="bold" >
                <HStack>
                    <Text>
                        {selectedType === "all" ? "Todos" : selectedType}
                    </Text>
                    <Icon as={MdKeyboardArrowDown} boxSize={4} />
                </HStack>
            </MenuButton>
            <MenuList 
                backgroundColor="white" 
                p={6} 
                borderRadius={"10px"} 
                boxShadow="sm" 
                border="1px solid" 
                borderColor="lightgray"
            
            >
              <MenuItem onClick={() => onTypeChange("all")} p={3} _hover={{ fontWeight: "bold" }}>Todos</MenuItem>
              <MenuItem onClick={() => onTypeChange(PaymentMethod.Transfer)} p={3} _hover={{ fontWeight: "bold" }}>Transferencia</MenuItem>
              <MenuItem onClick={() => onTypeChange(PaymentMethod.Card)} p={3} _hover={{ fontWeight: "bold" }}>Tarjeta</MenuItem>
              <MenuItem onClick={() => onTypeChange(PaymentMethod.Cash)} p={3} _hover={{ fontWeight: "bold" }}>Efectivo</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
  
        <HStack>
          <Text fontSize="sm" color="gray.600">
            Ingreso:
          </Text>
          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm" fontWeight="bold" >
              {order === "asc" ? "Ascendente" : "Descendente"}
            </MenuButton>
            <MenuList
              backgroundColor="white" 
              p={6} 
              borderRadius={"10px"} 
              boxShadow="sm" 
              border="1px solid" 
              borderColor="lightgray">
              <MenuItem onClick={() => onOrderChange("asc")} p={3} _hover={{ fontWeight: "bold" }}>Ascendente</MenuItem>
              <MenuItem onClick={() => onOrderChange("desc")}p={3}  _hover={{ fontWeight: "bold" }}>Descendente</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    );
  }
  