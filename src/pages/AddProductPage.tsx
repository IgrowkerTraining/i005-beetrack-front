import { useParams } from 'react-router-dom'
import { Box, Text, Input } from '@chakra-ui/react'

function AddProductPage() {
  const { barcode } = useParams()

  return (
    <Box p={4}>
      <Text fontSize="lg" mb={2}>Agregar nuevo producto</Text>
      <Input placeholder="Código de barras" defaultValue={barcode ?? ''} />
    </Box>
  )
}

export default AddProductPage