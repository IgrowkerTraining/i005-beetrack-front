import { Box, useBreakpointValue } from '@chakra-ui/react';
import Sidenavbar from '@/components/Sidenavbar/Sidenavbar';
import useAutocloseSidenavbar from '@/hooks/useAutocloseSidenavbar';
import OverlayToLayout from '@/components/ui/OverlayToLayout';
import { useToolbarTittle } from '@/hooks/useToolbarTitle';
import MainContainer from '@/components/PrivateLayoutComponents/MainContainer';
import { useFetchProfile } from '@/hooks/useProfile';
// import { ColorModeButton } from '@/components/ui/color-mode';

const PrivateLayout = () => {

  const isMobile = useBreakpointValue({ base: true, md: false });
  useAutocloseSidenavbar();
  useToolbarTittle();
  useFetchProfile()

  return (
    <Box
      display={"flex"}
      position={"relative"}>
      {/* <ColorModeButton pos={"fixed"} bottom={"10px"} left={"10px"} zIndex={1000} border={"md"} borderColor={{ base: "black", _dark: "white" }} /> */}
      <Sidenavbar />
      <MainContainer />
      {isMobile && <OverlayToLayout />}
    </Box>
  );
};

export default PrivateLayout;