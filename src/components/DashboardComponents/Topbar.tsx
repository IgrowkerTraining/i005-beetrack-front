import { Flex, Text, InputGroup, Input, Box, IconButton, Button, useBreakpointValue } from '@chakra-ui/react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useColorModeValue } from '@/components/ui/color-mode';
import { MdMenu } from 'react-icons/md';
import useSidenavbarStore from '@/store/useSidenavbarStore';

const Topbar = () => {
  const { setIsOpen, titleToTopBar } = useSidenavbarStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bg = useColorModeValue("white", "sidenavbar.dark");
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      as="header"
      w="full"
      py={4}
      px={6}
      align="center"
      justify="space-between"
      bg={bg}
      boxShadow="soft"
      height="24"
    >
      {isMobile &&
        <Button
          h={"auto"}
          p={"10px"}
          mr={"4px"}
          variant={"ghost"}
          onClick={() => setIsOpen()}>
          <MdMenu />
        </Button>
      }
      <Text fontSize="lg" fontWeight="bold" color={color}>
        { titleToTopBar ?? "Nombre tienda" }
      </Text>

      <Flex align="center" gap={4}>
        <InputGroup flex="1" startElement={<FaSearch />}>
          <Input
            placeholder="Buscar"
            borderRadius="full"
            variant="outline"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            color={color}
          />
        </InputGroup>

        <Box position="relative">
          <IconButton
            aria-label="Notificaciones"
            variant="plain"
            color={color}
          > <FaBell /> </IconButton>
          {/* <Box
            position="absolute"
            top="0"
            right="0"
            w="10px"
            h="10px"
            bg="red.500"
            borderRadius="full"
          /> */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Topbar;
