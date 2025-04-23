import { Button, Dialog, DialogDescription, VStack } from "@chakra-ui/react";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};
export default function ConfirmSaleModal({ isOpen, onClose, onSubmit }: Props) {
    const navigate = useNavigate();
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Backdrop bg="black.600" backdropFilter="blur(2px)" />

            <Dialog.Positioner
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                zIndex="modal"
            >
                <Dialog.Content borderRadius="2xl" maxW="sm" w="90%" bg="white">
                    <Dialog.Header display="flex" justifyContent="center" py={1} mt={4}>
                        <Dialog.Title fontSize="lg" fontWeight="bold">
                            ¡Todo listo!
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body px={6} py={2}>
                        <DialogDescription>
                            <VStack  align="center">
                                <Dialog.Description fontSize="sm" color="gray.600">
                                    Cargaste todos los productos con éxito.
                                </Dialog.Description>
                                <Dialog.Description fontSize="sm" color="gray.600" fontWeight="bold" textAlign="center">
                                    ¿Quieres agregar algo más o prefieres finalizar la venta?
                                </Dialog.Description>
                            </VStack>
                        </DialogDescription>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <VStack w="100%" mt={4}>
                            <Button
                                variant="plain"
                                w="100%"
                                mb={2}  
                                p={6}                              
                                borderRadius="lg"
                                fontWeight="bold"
                                border="2px solid"
                                borderColor="gray.200"
                                onClick={() => navigate("/cash")}
                                _hover={{ bg: 'gray.300' }}
                            >   
                                <FaPlus/>
                                Agregar producto
                            </Button>
                            <Button
                                w="100%"
                                bg="yellow.400"
                                color="black"
                                p={6} 
                                borderRadius="lg"
                                fontWeight="bold"
                                onClick={onSubmit}
                                _hover={{ bg: 'yellow.500' }}
                            >
                                <FaShoppingCart/>
                                Finalizar venta
                            </Button>

                            
                        </VStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}