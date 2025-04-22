<<<<<<< HEAD
import { Box, Flex, Stack, Image, Progress, Text } from "@chakra-ui/react";
=======
import { Heading, Flex, Image, Text, HStack, Box } from "@chakra-ui/react";
>>>>>>> origin
import Logo from "@/assets/logo.svg";


type StepProgressProps = {
  step: number;
  title: string;
};

export const StepProgress = ({ title }: StepProgressProps) => {
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
<<<<<<< HEAD
      <Progress.Root
        value={(step / 4) * 100}
        size="sm"
        colorScheme="blue"
        mb={4}
        borderRadius="md"
      />

      {/* TODo: modificar esto para la navegacion */}
      {step > 1 && (
      <Stack gap={2} justifyContent="center" marginBottom={2}>
        {/* {[2, 3, 4].map((s) => (
          <Box
            key={s}
            w="8px"
            h="8px"
            borderRadius="full"
            bg={s <= step ? "blue.500" : "gray.200"}
          />
        ))} */}



 
      </Stack>

      )}
=======
      <Box mt={10}>
        <Heading w="100%" fontWeight="bold" fontSize="xl">
          Registrarse
        </Heading>
        {title}
      </Box>
>>>>>>> origin
    </>
  );
};
