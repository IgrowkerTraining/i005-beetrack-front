import { Box, Flex, HStack, IconButton, Image, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { MdBarChart, MdHomeFilled, MdInventory, MdMenu, MdPerson, MdPointOfSale } from 'react-icons/md';
import NavItem from './NavItem';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import Logo from '@/assets/logo.svg';

const MainSidenavbarMenu = () => {

    const { setIsOpen, setToggle, isToggle } = useSidenavbarStore();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <VStack id="main-menu-item" h={"full"} gap={"24px"} zIndex={10}>
            <Flex gap={4} alignItems={"center"}>
                <IconButton
                    variant={"ghost"}
                    onClick={() => isMobile ? setIsOpen(false) : setToggle()}>
                    <MdMenu />
                </IconButton>
                <HStack display={{ base: "flex", md: isToggle ? "none" : "" }}>
                    <Image
                        src={Logo} alt="Logo Beetrack" maxWidth={"50px"} />
                    <Box>
                        <Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
                        <Text as={"p"} fontSize={"2xs"}>SALES & MINORY MANAGER</Text>
                    </Box>
                </HStack>
            </Flex>
            <VStack w={"full"} h={"full"}>
                <NavItem to="/" icon={<MdHomeFilled />} text="Home" />
                <NavItem to="/inventario" icon={<MdInventory />} text="Inventario" />
                <NavItem to="/ventas" icon={<MdPointOfSale />} text="Ventas" />
                <NavItem to="/estadisticas" icon={<MdBarChart />} text="Estadísticas" />
                <Box asChild marginTop={"auto"}>
                    <NavItem to="/perfil" icon={<MdPerson />} text="Perfil" />
                </Box>
            </VStack>
        </VStack>
    )
}

export default MainSidenavbarMenu