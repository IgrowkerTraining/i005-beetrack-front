import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Text,
    VStack,
    HStack,
    Button,
    useDisclosure,
    useBreakpointValue,
} from '@chakra-ui/react'
import { MdArrowBack, MdLightbulb } from 'react-icons/md'
import { CiBarcode } from 'react-icons/ci'
import ProductScanner from '@/components/InventoryComponents/ProductScanner'
import { ProductNotFoundModal } from '@/components/InventoryComponents/ProductNotFoundModal'
import useProductStore from '@/store/useProductStore'
import useSaleStore from '@/store/useSaleStore'
import { SaleItem } from '@/types/salesTypes'
import AddProductModal from '@/components/SalesComponents/AddProductModal'
import CarList from '@/components/SalesComponents/CarList'
import BaseButton from '@/components/SalesComponents/BaseButton'




  
function CashRegisterPage() {
    const [barCode, setBarCode] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { open, onOpen, onClose } = useDisclosure();
    const [scannerKey, setScannerKey] = useState(0);
    const navigate = useNavigate();    
    const getProductByBarcode = useProductStore((state) => state.getProductByBarcode);
    const { currentSale, addItem, removeItem, removeItemById } = useSaleStore((state) => state);
    const { items = [], subTotal } = currentSale;
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    useEffect(() => {
        
        if (!barCode) return
        const newProduct = getProductByBarcode(barCode);
        if (newProduct) {
            addItem({
                id: newProduct.id,
                name: newProduct.name,
                unitPrice: newProduct.price,
                quantity: 1,
                totalPrice: newProduct.price,
            } as SaleItem) 
            setBarCode(null);  
            return        
        }
        setShowModal(true)

    }, [barCode, navigate])

    return (
        <Box p={4} maxW="500px" height="100vh" mx="auto" bg="#f7f9fc">
            <HStack mb={4} align="center">
                <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
                <Text fontSize="lg" fontWeight="bold">
                    Código de barras
                </Text>
            </HStack>

            <Box
                mb={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center" 
                backgroundColor="white"               
                gap={4}
                mx="auto"
                borderRadius="3xl"
                height={isMobile ? "80%" : "100%"}
            >
                <ProductScanner key={scannerKey} onScanSuccess={setBarCode} />
                {
                    items.length === 0 ? (
                        <VStack gap={4} px={4} align="start">
                            <HStack>
                                <Box bg="yellow.300" p={2} borderRadius="md">
                                    <CiBarcode size={22} />
                                </Box>
                                <Text fontSize="xs">
                                    Acerca tu teléfono al código de barra para escanear el producto
                                </Text>
                            </HStack>

                            <HStack>
                                <Box bg="yellow.300" p={2} borderRadius="md">
                                    <MdLightbulb size={22} />
                                </Box>
                                <Text fontSize="xs">
                                    Asegúrate de tener una buena iluminación para poder escanear el producto
                                </Text>
                            </HStack>
                            <Box 
                                w="100%" 
                                mt={4}
                                p={4}
                                position="fixed"
                                bottom={0}
                                left={0}
                                right={0}
                            >
                                <Text fontSize="xs" mb={2}>
                                    ¿Tienes problemas para escanear el producto?
                                </Text>
                                <Button
                                    w="100%"
                                    bg="yellow.400"
                                    color="black"
                                    borderRadius="lg"
                                    fontWeight="bold"
                                    onClick={onOpen}
                                    _hover={{ bg: 'yellow.500' }}
                                >
                                Cargar producto manualmente
                                </Button>                            
                            </Box>
                        </VStack>

                    ): 
                    (
                        <CarList items={items} onAdd={addItem} onRemove={removeItemById} onDelete={removeItem}/>
                    )
                }
            </Box>
            <VStack>
                <HStack 
                    w="full" 
                    justify="space-between"                      
                    borderRadius="2xl"
                    bg={"white"} 
                    py={3} 
                    px={4}
                    mt={4} 
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">Subtotal</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" color="green.500">
                        ${subTotal?.toFixed(3) ?? '0.000'}
                    </Text>
                </HStack>   
                <HStack 
                    w="full" 
                    justify="space-between" 
                     
                >
                    <BaseButton title='Agregar manualmente' onClick={onOpen} isPrimary={false} />     
                    <BaseButton title='Continuar' onClick={() => navigate("/sale-summary")} isPrimary={true} />     
                </HStack>

            </VStack>
            <AddProductModal
                isOpen={open}
                onClose={onClose}
                onSubmit={(code) => {
                setBarCode(code);
                onClose();
                }}
            />

            <ProductNotFoundModal
                isOpen={showModal}
                barCode={barCode}
                onClose={() => {
                    setShowModal(false)
                    setBarCode(null)
                    setScannerKey((prev) => prev + 1)
                }}
                onAdd={(barCode) => {
                    setShowModal(false)
                    navigate(`/addproduct/${barCode}`)
                }}
            />
        </Box>
    )
}

export default CashRegisterPage