import useSidenavbarStore from '@/store/useSidenavbarStore';
import { Button, Text, useBreakpointValue } from '@chakra-ui/react';
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';

const CollapseMenuButton = () => {
	const { isToggle, setIsOpen, setToggle } = useSidenavbarStore();
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

	return (
		<Button
			w={"full"}
			p={"14px"}
			h={"auto"}
			colorPalette={"green"}
			onClick={() => isMobile ? setIsOpen() : setToggle(!isToggle)}>
			{isToggle
				? <TbLayoutSidebarLeftExpandFilled />
				: <TbLayoutSidebarLeftCollapseFilled />
			}

			<Text
				display={{ base: "block", md: isToggle ? "none" : "" }}>
				Minimizar
			</Text>
		</Button>
	)
}

export default CollapseMenuButton;