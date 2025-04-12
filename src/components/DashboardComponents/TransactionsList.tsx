import { VStack, Box } from "@chakra-ui/react";
import { TransactionItem } from "@/components/DashboardComponents/TransactionItem";
import type { TransactionItemProps } from "@/components/DashboardComponents/TransactionItem";

const transactions: TransactionItemProps[] = [
    { type: "Transferencia", method: "Ventas", amount: "5.432", date: "06/04" },
    { type: "Transferencia", method: "Ventas", amount: "5.432", date: "06/04" },
    { type: "Tarjeta de crédito", method: "Ventas", amount: "16.432", date: "06/04" },
    { type: "Tarjeta de crédito", method: "Ventas", amount: "16.432", date: "06/04" },
    { type: "Efectivo", method: "Ventas", amount: "12.432", date: "06/04" },
    { type: "Efectivo", method: "Ventas", amount: "12.432", date: "06/04" },
  ];

export default function TransactionsList() {
  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
    <VStack gap={2} p={4}>
      {transactions.map((tx, i) => (
        <TransactionItem
        key={i}
        type={tx.type}
        method={tx.method}
        amount={tx.amount}
        date={tx.date}
      />
      ))}
    </VStack>
    </Box>
  );
}
