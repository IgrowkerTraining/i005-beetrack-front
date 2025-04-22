import { Box } from '@chakra-ui/react'
import { InventoryItem } from './InventoryItem'

export const InventoryList = () => {
  const items = [
    { name: 'Pepsi 2 lts.', price: '$5.200', quantity: 5 },
    { name: 'Pasta dentífrica 70g', price: '$2.100', quantity: 8 },
    { name: 'Agua mineral 1L', price: '$2.200', quantity: 15 },
    { name: 'Lata de tomate', price: '$760', quantity: 23 },
    { name: 'Lata de tomate', price: '$760', quantity: 23 },
  ]

  return (
    <Box borderRadius="2xl">
      {items.map((item, i) => (
        <InventoryItem key={i} {...item} />
      ))}
    </Box>
  )
}
