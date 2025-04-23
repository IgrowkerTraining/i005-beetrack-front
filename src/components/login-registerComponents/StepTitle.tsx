import { Heading, Flex, Image, Text, HStack, Box } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";

type StepTitleProps = {
  step: number;
  title: string;
};

export const StepTitle = ({ title }: StepTitleProps) => {
  return (
    <>
      <Flex direction={"column"} align="flex-start" mb={8}>
        <HStack>
          <Image src={Logo} alt="Logo Beetrack" maxWidth="50px" />
          <Box mx={3}>
            <Heading size="md" fontWeight="bold" lineHeight="1" mb={0}>
              BEETRACK
            </Heading>
            <Text
              as="span"
              fontSize="xs"
              color="gray.600"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              SALES & INVENTORY MANAGER
            </Text>
          </Box>
        </HStack>
      </Flex>
      <Box mt={10}>
        <Heading w="100%" fontWeight="bold" fontSize="xl">
          Registrarse
        </Heading>
        {title}
      </Box>
    </>
  );
};
