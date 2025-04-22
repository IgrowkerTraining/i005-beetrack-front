import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react'
import { MdArrowBack, MdLightbulb } from 'react-icons/md'
import { CiBarcode } from 'react-icons/ci'
import ProductScanner from '@/components/InventoryComponents/ProductScanner'
import { ProductNotFoundModal } from '@/components/InventoryComponents/ProductNotFoundModal'
import { AddBarcodeModal } from '@/components/InventoryComponents/AddBarcodeModal'

const products = [
  {
    id: 842958301340,
    name: 'Berberechos al natural',
    stock: 10,
    image:
      'https://www.compraonline.alcampo.es/images-v3/37ea0506-72ec-4543-93c8-a77bb916ec12/90c942f5-ecf2-4ab7-a331-5a51d0e8c7fa/1280x1280.webp',
  },
]

function ProductScannerPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [barCode, setBarCode] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [scannerKey, setScannerKey] = useState(0)
  const [isAddBarcodeOpen, setIsAddBarcodeOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!barCode) return

    const product = products.find((p) => p.id.toString() === barCode)

    if (product) {
      navigate(`/productDetail/${product.id}`)
    } else {
      setShowModal(true)
    }
  }, [barCode, navigate])

  return (

    <Box p={4} maxW="500px" mx="auto">
      {isMobile && (
        <HStack mb={4} align="center">
          <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
          <Text fontSize="lg" fontWeight="bold">
            Código de barras
          </Text>
        </HStack>
      )}
      <Box
        mb={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxW={350}
        gap={4}
        mx="auto"
      >
        <ProductScanner key={scannerKey} onScanSuccess={setBarCode} />
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
        </VStack>
      </Box>

       <VStack mx="auto" display="flex">
        <Text>¿Tienes problemas para escanear el producto?</Text>
        <Button
          onClick={() => setIsAddBarcodeOpen(true)}
          w="full"
          bg="yellow.amarillo"
          rounded="2xl"
          variant="plain"
          mb={4}
        >
          Cargar código manualmente
        </Button>
      </VStack>

      {/* Modales */}
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
          navigate(`/products/barcode/${barCode}`)
        }}
      />

      <AddBarcodeModal
        isOpen={isAddBarcodeOpen}
        onClose={() => setIsAddBarcodeOpen(false)}
        onConfirm={(code) => {
          setBarCode(code)
        }}
      />
    </Box>
  )
}

export default ProductScannerPage
