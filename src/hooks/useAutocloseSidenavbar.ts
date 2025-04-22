import useSidenavbarStore from '@/store/useSidenavbarStore';
import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';

const useAutocloseSidenavbar = () => {
    const { isOpen, setIsOpen } = useSidenavbarStore();
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    useEffect(() => {
        if(!isMobile && isOpen) setIsOpen(false);
    }, [isMobile, isOpen, setIsOpen]);
}

export default useAutocloseSidenavbar;