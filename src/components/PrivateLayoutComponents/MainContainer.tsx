import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

type PrivateLayoutProps = {
    children?: ReactNode;
    showTopbar?: boolean;
    contentPadding?: string | object;
};

const MainContainer = ({
    children,
    showTopbar = true,
    contentPadding = "0"
}: PrivateLayoutProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });


    return (
        <Box
            as={"main"}
            position={isMobile ? "absolute" : "relative"}
            overflowY={"auto"}
            display={"flex"}
            flexDirection={"column"}
            w={"full"}
            h={"100vh"}
            p={contentPadding}
            bg={{ base: "content.light", _dark: "content.dark" }}>
            {showTopbar && <Topbar />}

            <Flex direction="column" margin="0" padding={6} flexGrow={1}>
                {children || <Outlet />}
            </Flex>
        </Box>
    )
}

export default MainContainer