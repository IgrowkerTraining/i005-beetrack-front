import { Button, Flex } from "@chakra-ui/react";

type StepNavigationProps = {
  step: number;
  isLoading: boolean;
  isCheckingEmail: boolean;
  isRegistering: boolean;
  handlePrevStep?: () => void;
};

export const StepNavigation = ({
  step,
  isLoading,
  isCheckingEmail,
  isRegistering,
  handlePrevStep,
}: StepNavigationProps) => {
  return (
    <Flex w="full" gap={4} direction="row">
      {step > 1 && (
        <Button
          type="button"
          variant="outline"
          color="gray.700"
          fontWeight="medium"
          onClick={handlePrevStep}
          borderRadius="xl"
          py={6}
          borderColor="gray.300"
          w="50%"
        >
          Atrás
        </Button>
      )}
    <Button
      type="submit"
      variant="solid"
      bg={"#ffd701"}
      color={"gray.900"}
      fontWeight={"bold"}
      loading={isLoading}
      loadingText={
        isCheckingEmail
          ? "Checking Email"
          : isRegistering
          ? "Registering"
          : "Processing"
      }
      borderRadius="xl"
      py={6}
      w={step > 1 ? "50%" : "full"}
    >
      {step < 4 ? "Continuar" : "Registrar"}
    </Button>
    </Flex>
  );
};
