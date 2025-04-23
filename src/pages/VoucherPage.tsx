import BaseButton from "@/components/SalesComponents/BaseButton";
import ShareVoucherModal from "@/components/SalesComponents/ShareVoucherModal";
import { PaymentMethod } from "@/enums/paymentMethod.enum";
import useSaleStore from "@/store/useSaleStore";
import { Box, HStack, Icon, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { IconType } from "react-icons";
import { FaCreditCard, FaMoneyBill, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function VoucherPage() {
    const navigate = useNavigate();
    const { clearSale, currentSale } = useSaleStore((state) => state);
    const { total, discount, subTotal, paymentMethod = PaymentMethod.Other, items = [] } = currentSale;
    const { open, onOpen, onClose } = useDisclosure();
    

    const handleReset = () => {
        clearSale();
        navigate("/cash");
    }
    return (
        <Box p={4} maxW="500px" height="100vh" mx="auto" bg="#f7f9fc">
            <HStack mb={4} align="center">
                <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
                <Text fontSize="lg" fontWeight="bold">
                    Comprobante
                </Text>
            </HStack>
            <VStack
                borderRadius={"2xl"}
                w="full"
                height="80%"
            >
                <Box 
                    borderRadius={"2xl"}                      
                    boxShadow="base" 
                    
                    mb={4} 
                    border={"1px solid"} 
                    borderColor={"gray.200"}
                    overflowY="auto"
                    w="full"
                    height="100%"
                >
                    <HStack
                        w="full"
                        height={"8%"}
                        justify="space-between"
                        px={4}
                        bg={"white"}
                        borderRadius="2xl"
                        border={"1px solid"}
                        borderColor={"gray.200"}  
                    >
                        <HStack>
                            <Icon as={itemsPayment[paymentMethod].icon} boxSize={6} color="black"  backgroundColor="green.500" p={1} borderRadius="l2"/>
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">{itemsPayment[paymentMethod].label ?? "Método no especificado"}</Text>
                        </HStack>
                        <VStack alignItems={"flex-start"} justifyContent={"center"} gap={0}>
                            <Text fontSize={{ base: "xs", md: "sm" }}>Fecha:</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} >
                                {currentSale?.date ?? '05/04/2025'}05/04/2025
                            </Text>
                        </VStack>
                        <VStack alignItems={"flex-start"} gap={0}>
                            <Text fontSize={{ base: "xs", md: "sm" }}>Hora:</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} >
                                {currentSale?.date ?? '05/04/2025'}19:29
                            </Text>
                        </VStack>
                    </HStack>
                    <HStack
                        w="full"
                        height={"77%"}
                        alignItems={"flex-start"}
                        p={4}
                                                
                    >
                        
                        <Table variant="" w="100%" >
                            <Thead position="sticky" top={0} zIndex={1} justifyContent={"space-between"}>
                                <Tr fontWeight={"bold"} fontSize={{ base: "xs", md: "sm" }} color="gray.500"  textAlign={"left"} borderBottom={"1px solid "} borderColor="lightgray">
                                    <Th py={4} >Productos</Th>
                                    <Th py={4} isNumeric>Cant.</Th>
                                    <Th py={4} isNumeric>Precio</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {items.map((item, index) => (
                                <Tr key={index} borderBottom={"1px solid "} borderColor="lightgray" _last={{ borderBottom: "none" }} >
                                    <Td py={4} whiteSpace="nowrap" maxW="140px" overflow="hidden" textOverflow="ellipsis"  >
                                        {item.name}
                                    </Td>
                                    <Td py={4} isNumeric>{item.quantity}</Td>
                                    <Td py={4} isNumeric>
                                    $ {item.price.toFixed(3)}
                                    </Td>
                                </Tr>
                                ))}
                            </Tbody>
                        </Table>
                                
                        
                    </HStack>
                    <VStack
                        w="full"
                        height={"15%"}
                        justify="center"
                        px={2}
                        bg={"white"}
                        borderRadius="2xl"
                        border={"1px solid"}
                        borderColor={"gray.200"}  
                    >
                        <HStack 
                            w="full" 
                            justify="space-between"                                                                                    
                            px={4}                                         
                        >
                            <Text fontSize={{ base: "xs", md: "sm" }} >Subtotal</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="green.500">
                                ${subTotal?.toFixed(3) ?? '0.000'}
                            </Text> 
                        </HStack>
                        <HStack 
                            w="full" 
                            justify="space-between"                                                                                    
                            px={4}                                         
                        >
                            <Text fontSize={{ base: "xs", md: "sm" }} >Total de descuentos</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="red.500">
                                -${discount?.toFixed(3) ?? '0.000'}
                            </Text> 
                        </HStack>
                        <HStack 
                            w="full" 
                            justify="space-between"                                                                                    
                            px={4}                                         
                        >
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">Total</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="green.500">
                                -${total?.toFixed(3) ?? '0.000'}
                            </Text> 
                        </HStack> 
                    </VStack>
                </Box>

            </VStack>
            <VStack>
                <BaseButton title="Compartir comprobante" icon={FaShareAlt} isPrimary={true} onClick={onOpen} w="100%"/>
                <BaseButton title="Registrar otra venta" icon={FaShoppingCart} isPrimary={false} onClick={handleReset} w="100%"/>
            </VStack>
            <ShareVoucherModal isOpen={open} onShare={() => {console.log("share"); onClose()}} onClose={onClose}/>
        </Box>
    );
}

const itemsPayment: Record<PaymentMethod, { label: string; icon: IconType }> = {
    [PaymentMethod.Transfer]: { label: "Transferencia", icon: FiRepeat },
    [PaymentMethod.Card]: { label: "Tarjeta", icon: FaCreditCard },
    [PaymentMethod.Cash]: { label: "Efectivo", icon: FaMoneyBill },
    [PaymentMethod.Other]: { label: "Otro", icon: FaCreditCard },
  };
    
