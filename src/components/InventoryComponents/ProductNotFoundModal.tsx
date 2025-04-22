import {
  Dialog,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (codigo: string) => void
  barCode: string | null
}

export function ProductNotFoundModal({ isOpen, onClose, onAdd, barCode }: Props) {
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
        <Dialog.Content py={0} borderRadius="2xl" maxW="sm" w="90%" bg="white">
          <Dialog.Header display="flex" justifyContent="center">
            <Dialog.Title fontSize="lg" fontWeight="bold" textAlign="center">
              Producto no encontrado
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body p={4}>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              El producto no se encuentra registrado en el inventario.{' '}
              <Text as="span" fontWeight="medium" color="black">
                ¿Te gustaría agregarlo?
              </Text>
            </Text>
          </Dialog.Body>

          <Dialog.Footer>
            <VStack w="100%" mt={4}>
              <Button
                w="100%"
                bg="yellow.amarillo"
                color="black"
                borderRadius="lg"
                onClick={() => barCode && onAdd(barCode)}
                _hover={{ bg: 'yellow.400' }}
              >
                Agregar nuevo producto
              </Button>

              <Button variant="plain" w="80px" onClick={onClose}>
                Cancelar
              </Button>
            </VStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

