import useSidenavbarStore from '@/store/useSidenavbarStore';
import { Box } from '@chakra-ui/react';

const OverlayToLayout = () => {
	const { isOpen, setIsOpen } = useSidenavbarStore();

	return (
		<Box id="overlay"
			display={isOpen ? "block" : "none"}
			position={"absolute"}
			top={0}
			right={0}
			bottom={0}
			left={0}
			bg={"rgba(0, 0, 0, 0.5)"}
			backdropFilter={"blur(10px)"}
			zIndex={"1"}
			onClick={() => { setIsOpen(false) }} />
	)
}

export default OverlayToLayout;