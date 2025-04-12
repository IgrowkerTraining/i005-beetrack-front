import { VStack, useBreakpointValue } from '@chakra-ui/react';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import MainSidenavbarMenu from './SidenavbarComponents/MainSidenavbarMenu';

const Sidenavbar = () => {
	const { isOpen } = useSidenavbarStore();
    const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<VStack
			as={"aside"}
			position={"sticky"}
			w={"fit-content"}
			h={"100vh"}
			p={4}
			justifyContent={"space-between"}
			bg={{ base: "sidenavbar.light", _dark: "sidenavbar.dark" }}
			shadow={{ base: "2px 0px 4px rgba(0, 0, 0, 0.1)", _dark: "2px 0px 4px rgba(255, 255, 255, 0.1)" }}
			transform={isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)"}
			transition={isMobile ? "transform 0.3s ease-in-out" : ""}
			zIndex={100}>
			<MainSidenavbarMenu />
		</VStack>
	)
}
export default Sidenavbar;