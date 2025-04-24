import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Fieldset,
  Field,
  Input,
  Flex,
  HStack,
  IconButton,
  Stack,
  Switch,
  Text,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { CiBarcode } from 'react-icons/ci'
import { MdAdd, MdArrowBack, MdRemove } from 'react-icons/md'
import { useFetchProduct, useAddProduct, useUpdateProduct } from '@/hooks/useProduct'
import BarcodeScannerOverlay from '@/components/InventoryComponents/BarcodeScannerModal'

const ProductPage = () => {
  const [stock, setStock] = useState(0)
  const [stock_min, setStock_min] = useState(0)
  const [stock_optimus, setStock_optimus] = useState(0)
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const [barcodeInput, setBarcodeInput] = useState("")
  const [name, setName] = useState("")
  const [salesPrice, setSalesPrice] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { barcode, id } = useParams()
  const navigate = useNavigate()
  const { data: productData } = useFetchProduct(id ?? '')
  const { mutateAsync: addProduct } = useAddProduct()
  const { mutateAsync: updateProduct } = useUpdateProduct()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { open, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (barcode) {
      setBarcodeInput(barcode)
    }
  }, [barcode]);

  useEffect(() => {
  if (!productData) return;

  const {
    barcode,
    name,
    description,
    costPrice,
    salesPrice,
    stock,
    stock_min,
    stock_optimus,
    alerts,
    imagePath,
  } = productData.data;

  if (!barcodeInput) {
    setBarcodeInput(barcode);
  }

  setName(name);
  setDescription(description);
  setCostPrice(costPrice);
  setSalesPrice(salesPrice);
  setStock(stock);
  setStock_min(stock_min);
  setStock_optimus(stock_optimus);
  setAlertsEnabled(alerts);
  setPreview(imagePath);
}, [productData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setImage(file)
  }

  const handleSubmit = async () => {

  try {
    if (id) {
      await updateProduct({
        id: id.toString(),
        updatedData: {
          name,
          salesPrice,
          costPrice,
          stock,
          stock_min,
          stock_optimus,
          alerts: alertsEnabled,
          description,
          ...(image && { file: image }),
        },
      });
    } else {
      await addProduct({
        barcode: barcodeInput,
        name,
        salesPrice,
        costPrice,
        stock,
        stock_min,
        stock_optimus,
        alerts: alertsEnabled,
        description,
        file: image,
      });
    }
    navigate('/inventory')
  } catch (error) {
    console.error('Error al guardar el producto:', error);
  }
}

  return (
    <>
    <Fieldset.Root p={4} maxW="1200px" mx="auto" display="flex" flexDirection="column" minH="100vh">
      {isMobile && (
        <HStack mb={4} align="center">
          <MdArrowBack size={22} onClick={() => navigate(-1)} cursor="pointer" />
          <Text fontSize="lg" fontWeight="bold">
            {!id ? "Agregar producto" : name}
          </Text>
        </HStack>
      )}

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align="flex-start"
        flex="1"
      >
        {/* Panel izquierdo */}
        <Box
          flex={1}
          bg="white"
          borderRadius="xl"
          p={4}
          border="1px solid"
          borderColor="gray.200"
          w="full"
          minW="300px"
        >
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            hidden
          />

          <Box
            role='button'
            cursor="pointer"
            w="180px"
            h="180px"
            bg="gray.700"
            color="white"
            borderRadius="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mb={4}
            overflow="hidden"
            onClick={() => imageInputRef.current?.click()}
          >
            {preview ? (
              <Image src={preview} alt="Previsualización" objectFit="cover" h="full" />
            ) : (
              <>
                <Text fontSize="3xl">+</Text>
                <Text w="100px">Imagen del producto</Text>
              </>
            )}
          </Box>

          <Stack gap={4}>
            <Field.Root>
              <Field.Label>Código de barras</Field.Label>
              <HStack w="full" position="relative">
                <Input disabled={id ? true : false} placeholder="0000000000000" value={barcodeInput || ''} onChange={(e) => setBarcodeInput(e.target.value)} />
                <IconButton
                  disabled={id ? true : false}
                  position="absolute"
                  variant="plain"
                  right={2}
                  onClick={onOpen}
                  aria-label="Escanear"
                  cursor={!!id ? "default" : "pointer"}
                >
                  <CiBarcode />
                </IconButton>
                <BarcodeScannerOverlay
                  isOpen={open}
                  onClose={onClose}
                  onResult={(code) => setBarcodeInput(code)}
                />
              </HStack>
            </Field.Root>

            <Field.Root>
              <Field.Label>Nombre del producto</Field.Label>
              <Input value={name || ""} placeholder="Nombre del producto" onChange={(e) => setName(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Precio</Field.Label>
              <Input pl={5} value={salesPrice || ""} placeholder="0.00" onChange={(e) => setSalesPrice(e.target.value)} />
              <Box position="absolute" left="2" top="70%" transform="translateY(-50%)" color="gray.500">
                $
              </Box>
            </Field.Root>

            <Field.Root>
              <Field.Label>Costo</Field.Label>
              <Input pl={5} value={costPrice || ""} placeholder="0.00" onChange={(e) => setCostPrice(e.target.value)} />
              <Box position="absolute" left="2" top="70%" transform="translateY(-50%)" color="gray.500">
                $
              </Box>
            </Field.Root>
          </Stack>

          <Box mt={6}>
            <Text fontWeight="bold" mb={2}>Detalles</Text>
            <Stack gap={4}>
              <Input value={description || ""} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del producto" />
              <Input placeholder="Elige el tipo de unidad" />
            </Stack>
          </Box>
        </Box>

        {/* Panel derecho */}
        <Box
          flex={1}
          bg="white"
          borderRadius="xl"
          p={4}
          border="1px solid"
          borderColor="gray.200"
          w="full"
          minW="300px"
        >
          <Text fontWeight="bold" mb={4}>Stock</Text>

          <Stack gap={4}>
            <Field.Root display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
              <Field.Label>Stock disponible</Field.Label>
              <HStack>
                <IconButton
                  aria-label="Restar"
                  onClick={() => setStock((prev) => Math.max(prev - 1, 0))}
                  variant="plain"
                ><MdRemove /></IconButton>
                <Input
                  value={stock || 0}
                  onChange={(e) => setStock(Number(e.target.value))}
                  border="1px solid"
                  borderColor="gray.400"
                  rounded="full"
                  px={2}
                  maxW="80px"
                  textAlign="center"
                />
                <IconButton
                  aria-label="Sumar"
                  onClick={() => setStock((prev) => prev + 1)}
                  variant="plain"
                ><MdAdd /></IconButton>
              </HStack>
            </Field.Root>

            <Field.Root>
              <Field.Label>Stock mínimo</Field.Label>
              <Input value={stock_min || 0} placeholder="0" onChange={(e) => setStock_min(Number(e.target.value))} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Stock óptimo</Field.Label>
              <Input value={stock_optimus || 0} placeholder="0" onChange={(e) => setStock_optimus(Number(e.target.value))} />
            </Field.Root>

            <Field.Root display="flex" flexDirection="row" justifyContent="space-between">
              <Field.Label htmlFor="alerts" mb="0" fontWeight="bold">
                Alertas de stock
              </Field.Label>
              <Switch.Root
                id='alerts'
                checked={alertsEnabled}
                onCheckedChange={(e) => setAlertsEnabled(e.checked)}
                mr={2}
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </Field.Root>

            <Text fontSize="sm" color="gray.600">
              Recibirás una notificación cuando el stock disponible disminuya por debajo del mínimo establecido.
            </Text>

            <Box>
              <Text fontSize="sm" mb={2} fontWeight="bold">
                En base al color podrás identificar el estado del producto:
              </Text>
              <Stack gap={2}>
                <HStack>
                  <Box w="45px" h="45px" bg="green.500" borderRadius="sm" flexShrink={0} />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">Verde</Text>
                    <Text fontSize="sm" color="gray.500">Indica stock por encima del óptimo.</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box w="45px" h="45px" bg="orange.500" borderRadius="sm" flexShrink={0} />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">Naranja</Text>
                    <Text fontSize="sm" color="gray.500">Stock acercándose al mínimo establecido.</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box w="45px" h="45px" bg="red.500" borderRadius="sm" flexShrink={0} />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">Rojo</Text>
                    <Text fontSize="sm" color="gray.500">Stock por debajo del mínimo establecido.</Text>
                  </Box>
                </HStack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>

      {/* Botones */}
     <HStack mt={6} px={1} justifyContent="center" maxW="550px">
      <Button onClick={() => navigate(-1)} variant="outline" rounded="xl" w="50%">
        Cancelar
      </Button>
      <Button
        onClick={handleSubmit}
        colorScheme="gray"
        bg="gray.500"
        w="50%"
        color="white"
        rounded="xl"
      >
        Guardar
      </Button>
    </HStack>
    </Fieldset.Root>
    </>
  )
}

export default ProductPage