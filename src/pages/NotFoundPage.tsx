import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Logo from '@/assets/logo.svg';
import { useEffect } from 'react';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {

    const { setIsOpen } = useSidenavbarStore();
    useEffect(() => setIsOpen(false), [])

    return (
        <Flex h={"100vh"} direction={"column"} alignItems={"center"} justifyContent={"center"} textAlign="center" gap={4} py={10} px={6}>
            <Image
                src={Logo}
                alt="Logo Bee Track"
                maxW={"150px"} />
            <Heading as="h1" size="2xl" mb={4}>
                404
            </Heading>
            <Text fontSize="lg" mb={6}>
                Lo sentimos, la página que buscas no existe.
            </Text>
            <Button
                asChild
                colorPalette={"yellow"}
                bg={{ base: "colorPalette.500", _hover: "colorPalette.400" }}
                borderRadius={"16px"} >
                <NavLink to={"/"}>Volver a inicio</NavLink>
            </Button>
        </Flex>
    );
};

export default NotFoundPage;