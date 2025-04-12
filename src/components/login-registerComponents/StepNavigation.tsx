import { Button } from "@chakra-ui/react";

type StepNavigationProps = {
  step: number;
  isLoading: boolean;
  isCheckingEmail: boolean;
  isRegistering: boolean;
};

export const StepNavigation = ({
  step,
  isLoading,
  isCheckingEmail,
  isRegistering,
}: StepNavigationProps) => {
  return (
    <Button
      type="submit"
      variant="solid"
      w="full"
      bg={"amarillo"}
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
    >
      {step < 4 ? "Siguiente" : "Registrar"}
    </Button>
  );
};
