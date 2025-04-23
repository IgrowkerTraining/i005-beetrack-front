import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  Button,
  Flex,
} from '@chakra-ui/react'
import { MdArrowBack, MdLightbulb } from 'react-icons/md'
import { CiBarcode } from 'react-icons/ci'
import ProductScanner from '@/components/InventoryComponents/ProductScanner'
import { ProductNotFoundModal } from '@/components/InventoryComponents/ProductNotFoundModal'
import { AddBarcodeModal } from '@/components/InventoryComponents/AddBarcodeModal'

const products = [] // 👈 recuerda meter esto o traerlo de donde toque

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
    <Flex direction="column" minH={{ base: '100svh', md: '100%' }} p={4} maxW="500px" mx="auto" justify="space-between">
      <Box>
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
      </Box>

      <VStack mx="auto" pt={4} w="full">
        <Text>¿Tienes problemas para escanear el producto?</Text>
        <Button
          onClick={() => setIsAddBarcodeOpen(true)}
          w="full"
          bg="yellow.amarillo"
          rounded="2xl"
          variant="plain"
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
    </Flex>
  )
}

export default ProductScannerPage
