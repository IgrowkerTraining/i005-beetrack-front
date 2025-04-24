import { VStack, Box } from "@chakra-ui/react";
import { SalesItem } from "./SalesItem";
import { PaymentMethod } from "@/enums/paymentMethod.enum";
import { useMemo, useState } from "react";
import SalesFilters from "./SalesFilters";
import useOrderStore from "@/store/useOrderStore";


export default function SalesList() {
  const [selectedDate, setSelectedDate] = useState("Hoy 06/04");
  const [selectedType, setSelectedType] = useState<PaymentMethod | "all">("all");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { orders } = useOrderStore((state) => state);

  const filteredTransactions = useMemo(() => {
    let data = [...orders];
  
    if (selectedType !== "all") {
      data = data.filter((t) => t.paymentMethod === selectedType);
    }
  
    data.sort((a, b) => {
      const parseDate = (d: string) => {
        const [day, month] = d.split("/").map(Number);
        return new Date(2025, month - 1, day).getTime(); 
      };
  
      const dateA = parseDate(a.date ?? "");
      const dateB = parseDate(b.date ?? "");
  
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  
    return data;
  }, [selectedType, order]);

  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
      <SalesFilters
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        order={order}
        onOrderChange={setOrder}
      />
      <VStack gap={2} p={4}>
        {filteredTransactions.map((tx) => (
          <SalesItem
          key={tx.id}
          type={tx.paymentMethod ?? PaymentMethod.Cash}
          method={"Ventas"}
          amount={tx.total}
          date={tx.date}
        />
        ))}
      </VStack>
    </Box>
  );
}
