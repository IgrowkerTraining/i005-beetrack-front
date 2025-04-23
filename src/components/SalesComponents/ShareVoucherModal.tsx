import { Button, Dialog, DialogDescription, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onShare: (number:string) => void;
};

export default function ShareVoucherModal({ isOpen, onClose, onShare }: Props) {

    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, ""); 

        const formatted = raw
        .slice(0, 9) // máximo 10 dígitos
        .replace(/(\d{3})(\d{2})?(\d{2})?(\d{2})?/, (match, p1, p2, p3, p4) => {
            return [p1, p2, p3, p4].filter(Boolean).join("-");
        });

        setValue(formatted);
    };

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
                            Compartir comprobante
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body px={6} py={2}>
                        <DialogDescription>
                            <VStack align="start">
                                <Dialog.Description fontSize="sm" color={"black"} >
                                    Enviar a:
                                </Dialog.Description>
                                <Input 
                                    p={6}
                                    borderRadius="lg"
                                    placeholder="000-00-00-00"
                                    type="text"
                                    inputMode="numeric"
                                    value={value}
                                    onChange={handleChange}
                                />
                                
                                
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
                                onClick={() => onShare(value)}
                                _hover={{ bg: 'gray.300' }}
                            >
                                <FaPaperPlane />
                                Enviar
                            </Button>
                            <Button
                                w="100%"
                                bg="yellow.400"
                                color="black"
                                p={6}
                                borderRadius="lg"
                                fontWeight="bold"
                                onClick={onClose}
                                _hover={{ bg: 'yellow.500' }}
                            >
                                
                                Cancelar
                            </Button>


                        </VStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}