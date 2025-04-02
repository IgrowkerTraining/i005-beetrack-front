import { Box, Flex, HStack, Image, List, Separator, Text } from "@chakra-ui/react";
import Logo from '@/assets/logo.svg';
import { FaHistory } from "react-icons/fa";
import { FaHouse, FaChartSimple, FaCashRegister, FaBoxArchive } from "react-icons/fa6";

const Sidebar = () => {
	return (
		<Flex direction={"column"} alignItems={"center"}>
			<HStack color={"blue.500"} gap={4}>
				<Image
					src={Logo} alt="Logo Beetrack" maxWidth={"50px"} />
				<Box>
					<Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
					<Text as={"p"} fontSize={"2xs"}>SALES & MINORY MANAGER</Text>
				</Box>
			</HStack>
			<Separator my={"10px"} />
			<List.Root listStyle={"none"} gap={4} alignItems={"start"} w={"full"}>
				<List.Item>
					<List.Indicator>
						<FaHouse />
					</List.Indicator>
					Inicio
				</List.Item>
				<List.Item>
					<List.Indicator>
						<FaBoxArchive />
					</List.Indicator>
					Inventario
				</List.Item>
				<List.Item>
					<List.Indicator>
						<FaCashRegister />
					</List.Indicator>
					Ventas
				</List.Item>
				<List.Item>
					<List.Indicator>
						<FaChartSimple />
					</List.Indicator>
					Estadísticas
				</List.Item>
				<List.Item>
					<List.Indicator>
						<FaHistory />
					</List.Indicator>
					Historial
				</List.Item>
			</List.Root>
		</Flex>
	)
}
export default Sidebar;