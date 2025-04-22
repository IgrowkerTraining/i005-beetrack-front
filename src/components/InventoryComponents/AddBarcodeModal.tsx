import {
  Dialog,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (barcode: string) => void
}

export function AddBarcodeModal({ isOpen, onClose, onConfirm }: Props) {
  const [barcode, setBarcode] = useState('')

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const onlyNumbers = e.target.value.replace(/\D/g, '')
  setBarcode(onlyNumbers)
}

const formattedBarcode = barcode.split('').join('-')

  const handleConfirm = () => {
    onConfirm(barcode)
    setBarcode('')
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(2px)" />

      <Dialog.Positioner
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        zIndex="modal"
      >
        <Dialog.Content
          borderRadius="2xl"
          maxW="sm"
          w="90%"
          bg="white"
          p={4}
        >
          <Dialog.Header>
            <Dialog.Title fontSize="md" fontWeight="bold">
              Introducir código de barras
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Input
              value={formattedBarcode}
              onChange={handleChange}
              placeholder="0-0-0-0-0-0-0-0-0-0-0-0-0"
              inputMode="numeric"
              textAlign="center"
              fontSize="md"
            />
          </Dialog.Body>

          <Dialog.Footer>
            <VStack w="100%">
              <Button
                w="100%"
                bg="gray.400"
                color="white"
                borderRadius="2xl"
                onClick={handleConfirm}
              >
                Continuar
              </Button>

              <Button variant="plain" w="100%" onClick={onClose}>
                Cancelar
              </Button>
            </VStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}