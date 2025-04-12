import { ReactNode } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';
import Sidenavbar from '@/components/Sidenavbar/Sidenavbar';
import Topbar from '@/components/DashboardComponents/Topbar';
import { Outlet } from 'react-router-dom';
import useAutocloseSidenavbar from '@/hooks/useAutocloseSidenavbar';
import OverlayToLayout from '@/components/ui/OverlayToLayout';
import { useToolbarTittle } from '@/hooks/useToolbarTitle';

type PrivateLayoutProps = {
  children?: ReactNode;
  showTopbar?: boolean;
  showSidebar?: boolean;
  contentPadding?: string | object;
};

const PrivateLayout = ({
  children,
  showTopbar = true,
  showSidebar = true,
  contentPadding = "0"
}: PrivateLayoutProps) => {

  const isMobile = useBreakpointValue({ base: true, md: false });
  useAutocloseSidenavbar();
  useToolbarTittle();

  return (
    <Box
      display={"flex"}
      position={"relative"}>
      {/* <ColorModeButton pos={"fixed"} bottom={"10px"} left={"10px"} zIndex={1000} border={"md"} borderColor={{ base: "black", _dark: "white" }} /> */}
      <Sidenavbar />
      <Box
        as={"main"}
        position={isMobile ? "absolute" : "relative"} overflowY={"auto"}
        w={"full"}
        h={"100vh"}
        p={contentPadding}
        bg={{ base: "content.light", _dark: "content.dark" }}>
        {showTopbar && <Topbar />}
        {children || <Outlet />}
      </Box>
      {isMobile && <OverlayToLayout />}
    </Box>
  );
};

export default PrivateLayout;