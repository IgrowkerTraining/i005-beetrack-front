import AddProductModal from "@/components/SalesComponents/AddProductModal";
import BaseButton from "@/components/SalesComponents/BaseButton";
import CarList from "@/components/SalesComponents/CarList";
import ConfirmSaleModal from "@/components/SalesComponents/ConfirmSaleModal";
import PaymentMethodSelector from "@/components/SalesComponents/PaymentMethodSelector";
import { PaymentMethod } from "@/enums/paymentMethod.enum";
import useSaleStore from "@/store/useSaleStore";
import { Box, HStack, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function SalesSummaryPage() {
    const navigate = useNavigate();
    const { currentSale, addItem, removeItem, removeItemById, enterDiscount, finalizeSale } = useSaleStore((state) => state);
    const { items = [], subTotal, total, discount } = currentSale;
    const [paymentMethod, setPaymentMethod] = useState(currentSale.paymentMethod ?? PaymentMethod.Transfer);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { open, onOpen, onClose } = useDisclosure();

    const handleFinalizeSale = () => {
        finalizeSale(paymentMethod)
        navigate("/voucher");
    }
    return (
        <Box p={4} maxW="500px" height="100vh" mx="auto" bg="#f7f9fc">
            <HStack mb={4} align="center">
                <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
                <Text fontSize="lg" fontWeight="bold">
                    Resumen de venta
                </Text>
            </HStack>
            <Box 
                borderRadius={"2xl"} 
                bg={"white"} 
                boxShadow="base" 
                py={4}
                mb={4} 
                border={"1px solid"} 
                borderColor={"gray.200"}
                overflowY="auto"
                height={isMobile ? "36%" : "auto"}
            >
                <CarList items={items} onAdd={addItem} onRemove={removeItemById} onDelete={removeItem}/>
            </Box>
            <PaymentMethodSelector onMethodChange={setPaymentMethod} onDiscountChange={enterDiscount} defaultMethod={paymentMethod}/>
            <VStack 
                border="1px solid"
                borderColor="gray.200"
                borderRadius="2xl"
                py={3}
                mt={4}
                bg={"white"}
                >
                <HStack 
                    w="full" 
                    justify="space-between"                                                                                    
                    px={4}                                         
                >
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">Subtotal</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="green.500">
                        ${subTotal?.toFixed(3) ?? '0.000'}
                    </Text> 
                </HStack>
                <HStack 
                    w="full" 
                    justify="space-between"                                                                                    
                    px={4}                                         
                >
                    <Text fontSize={{ base: "xs", md: "sm" }} >-{discount}%</Text>
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
            <HStack 
                w="full" 
                justify="space-between" 
                mt={4}    
            >
                <BaseButton title='Átras' onClick={() => navigate(-1)} isPrimary={false} />     
                <BaseButton title='Finalizar' onClick={onOpen} isPrimary={true} />     
            </HStack>
            <ConfirmSaleModal
                isOpen={open}
                onClose={onClose}
                onSubmit={() => {
                    handleFinalizeSale();
                    onClose();
                }}
            />
        </Box>
    )
}