
import { FaMoneyBill, FaCreditCard } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { useState } from "react";
import { Box, HStack, Input, Text, VStack, RadioGroup, Icon, RadioGroupRoot, RadioGroupItem, RadioGroupItemIndicator  } from "@chakra-ui/react";

import { PaymentMethod } from "@/enums/paymentMethod.enum";


interface PaymentMethodSelectorProps {
    onMethodChange: (method: PaymentMethod) => void;
    onDiscountChange: (discount: number) => void;
    defaultMethod?: PaymentMethod;
    defaultDiscount?: string;
}

export default function PaymentMethodSelector({
    onMethodChange,
    onDiscountChange,
    defaultMethod = PaymentMethod.Transfer,
    defaultDiscount = "0",
}: PaymentMethodSelectorProps) {
    const [method, setMethod] = useState<PaymentMethod>(defaultMethod);
    const [discount, setDiscount] = useState(defaultDiscount);

    const handleMethodChange = (value: PaymentMethod) => {
        setMethod(value);                
        onMethodChange(value);
    };

    const handleDiscountChange = (value: string) => {
        let parsed = parseInt(value, 10);
        if (isNaN(parsed)) parsed = 0;
        if (parsed < 0) parsed = 0;
        if (parsed > 100) parsed = 100;
        setDiscount(parsed.toString());    
        onDiscountChange(parsed);
        
    };

    return (
        <Box
            p={4}
            borderRadius="2xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
        >
            <Text fontWeight="bold" mb={3}>
                Elegí el método de pago
            </Text>
            <RadioGroupRoot value={method} onValueChange={(val) => handleMethodChange(val as unknown as PaymentMethod)}>
                <VStack divideY="2px">
                    {items.map((item) => (
                        <Box
                            key={item.value}
                            w="full"
                            p={3}                        
                            _checked={{ borderColor: "black" }}
                            cursor="pointer"
                            
                        >
                            <HStack  id="payment-method">

                                <RadioGroupItem                             
                                    value={item.value}
                                    w={"full"}  
                                    justifyContent={"space-between"}                         
                                >   
                                    <RadioGroup.ItemHiddenInput />                                    
                                    <HStack>
                                        <Icon as={item.icon} boxSize={6} color="black" />
                                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                    </HStack>
                                    <RadioGroupItemIndicator />
                                </RadioGroupItem>
                            </HStack>
                        </Box>
                    ))}
                    
                </VStack>
            </RadioGroupRoot>

            <Box mt={5}>
                <Text mb={1}>Aplicar descuento</Text>
                <Input
                    type="number"
                    min={0}
                    max={100}
                    borderRadius="xl"
                    step={1}
                    inputMode="numeric"
                    placeholder="15%"
                    value={discount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                />
                <Text fontSize="xs" mt={1} color="gray.500">
                    Elegí el porcentaje
                </Text>
            </Box>
        </Box>
    );
}

const items = [
    { label: "Transferencia", value: PaymentMethod.Transfer, icon: FiRepeat },
    { label: "Tarjeta", value: PaymentMethod.Card, icon: FaCreditCard },
    { label: "Efectivo", value: PaymentMethod.Cash, icon: FaMoneyBill },
]
