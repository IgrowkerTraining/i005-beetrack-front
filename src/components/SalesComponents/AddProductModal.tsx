import {
    Button,
    Input,
    VStack,
    Dialog,
    DialogBackdrop,
    DialogCloseTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@chakra-ui/react';

import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (barcode: string) => void;
};

export default function AddProductModal({ isOpen, onClose, onSubmit }: Props) {
    const [barcode, setBarcode] = useState("");

    const handleContinue = () => {
        if (barcode.trim() !== "") {
            onSubmit(barcode);
            setBarcode("");
        }
    };

    const handleClose = () => {
        onClose();
        setBarcode("");
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
                    <Dialog.Header display="flex" justifyContent="start">
                        <Dialog.Title fontSize="lg" fontWeight="bold">
                            Introducir código de barras
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body p={6}>
                     <DialogDescription>
                        <Input
                            placeholder="Ej: 2900000000000"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            textAlign="center"
                            letterSpacing="widest"
                            borderColor="green.400"
                            borderWidth={2}
                            borderRadius="md"
                            fontWeight="bold"
                            _focus={{ borderColor: "green.500", boxShadow: "none" }}
                        />
                    </DialogDescription>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <VStack w="100%" mt={4}>
                            <Button
                                w="100%"
                                bg="gray.400"
                                color="black"
                                borderRadius="lg"
                                fontWeight="bold"
                                onClick={handleContinue}
                                _hover={{ bg: 'gray.500' }}
                            >
                             Continuar
                            </Button>

                            <Button
                                variant="plain"
                                w="100%"
                                borderRadius="lg"
                                fontWeight="bold"
                                bg="gray.100"
                                onClick={handleClose}
                                _hover={{ bg: 'gray.200' }}
                            >
                                Atrás
                            </Button>
                        </VStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
