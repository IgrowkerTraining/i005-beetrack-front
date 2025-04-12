import { Box, Tabs, Icon, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { FaShoppingCart, FaWallet, } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
// Mocks de Data
const monthlyData = [
  { name: "Ene", value: 300 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 100 },
  { name: "Abr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 450 },
  { name: "Jul", value: 300 },
  { name: "Ago", value: 150 },
];

const weeklyData = [
  { name: "Lun", value: 120 },
  { name: "Mar", value: 180 },
  { name: "Mié", value: 150 },
  { name: "Jue", value: 220 },
  { name: "Vie", value: 300 },
  { name: "Sáb", value: 250 },
  { name: "Dom", value: 180 },
];

const yearlyData = [
  { name: "2018", value: 2500 },
  { name: "2019", value: 3200 },
  { name: "2020", value: 2800 },
  { name: "2021", value: 3500 },
  { name: "2022", value: 4200 },
  { name: "2023", value: 4800 },
];
//
const FinanceGraph = () => {
  return (
    <Box
      bg="white"
      color="gray.900"
      p={2}
      borderRadius="2xl"
      w="full"
      maxW="600px"
      mx="auto"
    >
      <Tabs.Root variant="plain" defaultValue="mensual">
        <Tabs.List
          justifyContent="center"
          display="flex"
          width="100%"
          mb={2}
          borderBottom="none"
          border="none"
        >
          {["semanal", "mensual", "anual"].map((key) => (
            <Tabs.Trigger
              key={key}
              value={key}
              fontWeight="semibold"
              textTransform="capitalize"
              px={4}
              pb={2}
              borderBottom="none"
              _selected={{
                color: "black",
                borderBottom: "2px solid",
                borderColor: "green.400",
              }}
            >
              {key}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="semanal">
          <Box bg="blue.400" p={4} borderRadius="lg" minHeight="180px">
            <Flex justify="center">
              <Box w="100%" maxW="500px">
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={weeklyData} margin={{ left: -15, right: 15 }}>
                    <XAxis
                      dataKey="name"
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="white"
                      radius={[4, 4, 0, 0]}
                      barSize={8}
                    />
                    <Line
                      dataKey="value"
                      type="linear"
                      stroke="#3CCF91"
                      strokeWidth={4}
                      dot={true}
                      isAnimationActive={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="mensual">
          <Box bg="blue.400" p={4} borderRadius="lg" minHeight="180px">
            <Flex justify="center">
              <Box w="100%" maxW="500px">
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={monthlyData} margin={{ left: -15, right: 15 }}>
                    <XAxis
                      dataKey="name"
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="white"
                      radius={[4, 4, 0, 0]}
                      barSize={8}
                    />
                    <Line
                      dataKey="value"
                      type="linear"
                      stroke="#3CCF91"
                      strokeWidth={4}
                      dot={true}
                      isAnimationActive={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="anual">
          <Box bg="blue.400" p={4} borderRadius="lg" minHeight="180px">
            <Flex justify="center">
              <Box w="100%" maxW="500px">
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={yearlyData} margin={{ left: -15, right: 15 }}>
                    <XAxis
                      dataKey="name"
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="white"
                      radius={[4, 4, 0, 0]}
                      barSize={8}
                    />
                    <Line
                      dataKey="value"
                      type="linear"
                      stroke="#3CCF91"
                      strokeWidth={4}
                      dot={true}
                      isAnimationActive={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>

      <SimpleGrid columns={[1, 3]} gap={4}>
        <SummaryCard icon={FaShoppingCart} label="ventas" value="32,984$" />
        <SummaryCard icon={MdRocketLaunch} label="Gastos" value="2,42$" />
        <SummaryCard icon={FaWallet} label="Balance" value="30,400$" />
      </SimpleGrid>
    </Box>
  );
};
type SummaryCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

const SummaryCard = ({ icon, label, value }: SummaryCardProps) => (
  <Flex
    direction="column"
    bg="white"
    borderRadius="xl"
    p={4}
    align="flex-start"
    position="relative"
  >
    <Flex w="100%" align="center" mb={2}>
      <Box
        bg="green.500"
        borderRadius="md"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mr={3}
      >
        <Icon as={icon} boxSize={5} color="white" />
      </Box>
      <Text fontSize="md" color="gray.400" fontWeight="bold" textTransform="capitalize">
        {label}
      </Text>
    </Flex>
    <Text fontSize="2xl" fontWeight="semibold" color="black" mb={2}>
      {value}
    </Text>
    <Box w="100%" h="4px" bg="gray.100" borderRadius="full" mt="auto">
      <Box 
        w={label === "ventas" ? "70%" : label === "Gastos" ? "30%" : "80%"} 
        h="4px" 
        bg="green.500" 
        borderRadius="full" 
      />
    </Box>
  </Flex>
);

export default FinanceGraph;
