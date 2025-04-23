import {
  Card,
  Box,
  Text,
  Stack,
  Heading,
  Image,
  Button,
  Link,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import HexagonPattern from "@/assets/HexagonPattern.svg";
import { useState } from "react";
import { useCheckEmailExists, useRegister } from "@/hooks/useAuth";
import { useEmailCheck } from "@/hooks/useEmailCheck";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "@/components/login-registerComponents/registerSchema";
import { EmailStep } from "@/components/login-registerComponents/EmailStep";
import { PasswordStep } from "@/components/login-registerComponents/PasswordStep";
import { PersonalInfoStep } from "@/components/login-registerComponents/PersonalInfoStep";
import { StoreInfoStep } from "@/components/login-registerComponents/StoreInfoStep";
import { StepProgress } from "@/components/login-registerComponents/StepProgress";
import { StepNavigation } from "@/components/login-registerComponents/StepNavigation";
import { useNavigate } from "react-router-dom";
import { MdInventory, MdPointOfSale, MdShoppingCart } from 'react-icons/md';

const Register = () => {
  const [step, setStep] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerMutation = useRegister();
  const emailCheckMutation = useCheckEmailExists();

  const { isCheckingEmail, checkEmailExists } =
    useEmailCheck(emailCheckMutation);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      dateOfBirth: "",
      storeName: "",
      storePhone: "",
      storeAddress: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsRegistering(true);

      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        storePhone: data.storePhone ? Number(data.storePhone) : undefined,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //TODO: DESCOMENTAR UNA VEZ TENGAMOS EL BACKEND
      // await registerMutation.mutateAsync(formattedData);

      console.log("Registration successful!", formattedData);
      setIsRegistering(false);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
      setIsRegistering(false);
    }
  };

  const validateCurrentStep = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await trigger("email");
        if (isValid) {
          isValid = await checkEmailExists(getValues("email"), setError);
        }
        break;
      case 2:
        isValid = await trigger(["password", "confirmPassword"]);
        break;
      case 3:
        isValid = await trigger(["name", "lastName", "dateOfBirth"]);
        break;
      case 4:
        isValid = await trigger(["storeName", "storePhone", "storeAddress"]);
        break;
    }

    return isValid;
  };

  const handleNextStep = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const isValid = await validateCurrentStep();

    if (isValid) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = (): any => {
    switch (step) {
      case 1:
        return (
          <Text fontSize="xs" color="gray.500">
            Elige cómo registrarte
          </Text>
        );
      case 2:
        return (
          <Text fontSize="xs" color="gray.500">
            Crear contraseña
          </Text>
        );
      case 3:
        return (
          <Text fontSize="xs" color="gray.500">
            Datos personales
          </Text>
        );
      case 4:
        return (
          <Text fontSize="xs" color="gray.500">
            Datos del comercio
          </Text>
        );
      default:
        return "Registro";
    }
  };

  const isLoading = isCheckingEmail || isRegistering || isSubmitting;

  return (
    <Flex
      minH="100vh"
      maxW="100vw"
      w="100%"
      direction={{ base: "column", md: "row" }}
      bg="gray.50"
      align="stretch"
      position="relative"
      overflow="hidden"
    >
      {/* Left Panel: only visible on desktop */}
      <Flex
        flex={1}
        display={{ base: "none", md: "flex" }}
        direction="column"
        align="center"
        justify="center"
        bg="gray.50"
        px={12}
        py={8}
        position="relative"
      >
        <Box
          position="absolute"
          top="-70px"
          left="-50px"
          zIndex="0"
          pointerEvents="none"
        >
          <Image
            src={HexagonPattern}
            alt="Decorative pattern"
            width="250px"
            height="183px"
          />
        </Box>
        <Box mb={8} w="full" zIndex={1}>
          <Heading fontSize="2xl" fontWeight="bold" mb={2}>
            TODO TU NEGOCIO, EN UNA SOLA APP
          </Heading>
          <Text fontSize={'sm'} color="gray.600" mb={6}>
            Pensado para emprendedores y comercios que quieren simplificar su día a día.
          </Text>
          <Stack gap={4}>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdInventory size="24px" />
              </Box>
              <Text fontWeight="bold">Controlá tu inventario</Text>
            </HStack>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdShoppingCart size="24px" />
              </Box>
              <Text fontWeight="bold">Registrá ventas</Text>
            </HStack>
            <HStack>
              <Box bg="#FFD701" p={2} borderRadius="md">
                <MdPointOfSale size="24px" />
              </Box>
              <Text fontWeight="bold">Gestioná tu caja de forma fácil y rápida.</Text>
            </HStack>
          </Stack>
        </Box>
        <Box display="flex" alignItems={'flex-end'}>
          <Image
            src="/src/assets/imgLogin.svg"
            maxW="100%"
            maxH="430px"
            objectFit="contain"
            w="100%"
            h="auto" />
        </Box>
      </Flex>

      {/* Right Panel: Register Form */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        position="relative"
        bg="white"
        shadow={'lg'}
        py={{ base: 8, md: 0 }}
      >
        <Box
          position="absolute"
          bottom="-70px"
          right="-50px"
          zIndex="0"
          pointerEvents="none"
        >
          <Image
            src={HexagonPattern}
            alt="Decorative pattern"
            width="250px"
            height="183px"
          />
        </Box>
        <Card.Root
          minH={{ base: "90vh", md: "60vh" }}
          maxW={{ base: "100%", md: "380px" }}
          variant={"subtle"}
          bg={"transparent"}
          as="form"
          w="full"
          onSubmit={handleNextStep}
        >
          <Card.Header>
            <StepProgress step={step} title={getStepTitle()} />
          </Card.Header>
          <Card.Body>
            {step === 1 && (
              <Stack
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={"full"}
              >
                <Button
                  border={"1px solid"}
                  variant="outline"
                  mb={4}
                  w="full"
                  fontWeight={"bold"}
                  borderRadius="xl"
                  size={"lg"}
                >
                  <AiFillGoogleCircle /> Registrate con Google
                </Button>
                <Button
                  border={"1px solid"}
                  variant="outline"
                  w="full"
                  fontWeight={"bold"}
                  borderRadius="xl"
                  size={"lg"}
                >
                  <IoLogoFacebook /> Registrate con Facebook
                </Button>
                <Flex align="center" width="100%" my={4}>
                  <Box flex="1" height="1px" bg="gray.300" />
                  <Text mx={4} fontWeight="bold" color="gray.600" fontSize="md">
                    0
                  </Text>
                  <Box flex="1" height="1px" bg="gray.300" />
                </Flex>
              </Stack>
            )}
            {step === 1 && <EmailStep register={register} errors={errors} />}

            {step === 2 && <PasswordStep register={register} errors={errors} />}

            {step === 3 && (
              <PersonalInfoStep register={register} errors={errors} />
            )}
            {step === 4 && <StoreInfoStep register={register} errors={errors} />}
          </Card.Body>
          <Card.Footer flexWrap={{ base: "wrap" }}>
            <StepNavigation
              step={step}
              isLoading={isLoading}
              isCheckingEmail={isCheckingEmail}
              isRegistering={isRegistering}
              handlePrevStep={handlePrevStep}
            />
            {step === 1 && (
              <Text mt={1} textStyle={"xs"}>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  textDecoration="underline"
                  fontWeight={"bold"}
                  href="/login"
                >
                  Iniciar sesión
                </Link>
              </Text>
            )}
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Flex>
  );
};

export default Register;
