import { Box, Text, IconButton } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import ProductScanner from './ProductScanner'

type Props = {
  isOpen: boolean
  onClose: () => void
  onResult: (code: string) => void
}

const BarcodeScannerOverlay = ({ isOpen, onClose, onResult }: Props) => {
  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="blackAlpha.700"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        maxW="400px"
        w="full"
        position="relative"
        boxShadow="xl"
      >
        <IconButton
          aria-label="Cerrar"
          onClick={onClose}
          position="absolute"
          top={2}
          right={2}
          variant="ghost"
        >
        <MdClose />
        </IconButton>

        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
          Escanea el código de barras
        </Text>

        <ProductScanner
          onScanSuccess={(code) => {
            onResult(code)
            onClose()
          }}
        />
      </Box>
    </Box>
  )
}

export default BarcodeScannerOverlay
