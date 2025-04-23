import {
    Grid,
    GridItem,
    Icon,
    Text,
    useBreakpointValue,
    HStack,
    VStack,
  } from "@chakra-ui/react";
  import { FiChevronRight, FiRepeat } from "react-icons/fi";
  import { FaMoneyBill } from "react-icons/fa";
  import { MdOutlineCreditCard } from "react-icons/md";
  import { IconType } from "react-icons";
import { PaymentMethod } from "@/enums/paymentMethod.enum";
  
  
  
  export type TransactionItemProps = {
    type: PaymentMethod;
    method?: string;
    amount?: number;
    date?: string;
  };
  
  const iconMap: Record<string, IconType> = {
    [PaymentMethod.Transfer]: FiRepeat,
    [PaymentMethod.Card]: MdOutlineCreditCard,
    [PaymentMethod.Cash]: FaMoneyBill,
  };
  
  export const SalesItem = ({ type, method, amount, date }: TransactionItemProps) => {
    const IconComponent = iconMap[type];
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <Grid
        templateColumns={{ base: "1fr auto", md: "1fr 1fr 1fr 1fr" }}
        alignItems="center"
        gap={4}
        p={4}
        w="full"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        _hover={{ boxShadow: "md", cursor: "pointer" }}
      >
        {/* Fecha al inicio solo en desktop */}
        <GridItem display={{ base: "none", md: "block" }}>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </GridItem>
  
        {/* Tipo e ícono */}
        <GridItem>
          <HStack gap={2}>
            <Icon as={IconComponent} boxSize={5} />
            <Text fontWeight="semibold">{type}</Text>
          </HStack>
        </GridItem>
  
        {/* Monto y fecha en mobile */}
        <GridItem>
          <VStack align="end" gap={0}>
            <Text fontWeight="semibold" color="green.500">
              +${amount}
            </Text>
            {isMobile && (
              <Text fontSize="sm" color="gray.500">
                {date}
              </Text>
            )}
          </VStack>
        </GridItem>
  
        {/* Flecha (solo en desktop) */}
        <GridItem display={{ base: "none", md: "block",  }} justifySelf="end">
          <Icon as={FiChevronRight} boxSize={5} color="gray.400" />
        </GridItem>
      </Grid>
    );
  };
  