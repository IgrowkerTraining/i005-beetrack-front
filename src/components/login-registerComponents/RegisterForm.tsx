import { Box, Card, Heading, HStack, Steps } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { StoreInfoStep } from "./StoreInfoStep";
import { RegisterFormData } from "./registerSchema";
import { useState } from "react";
import { StepProgress } from "./StepProgress";
import { useRegister } from "@/hooks/useAuth";

// TODO: a lo mejor puedes sacarlo a un archivo de constantes
const steps = [
    { title: 'Elige cómo registrate', id: 'choose-register-method' },
    {
        title: 'Crea una contraseña',
        id: 'password',
    },
    {
        title: 'Datos personales',
        id: 'personal-details',
    },
    {
        title: 'Datos del comercio',
        id: 'store-details',
    },
];

// TODO: a lo mejor puedes sacarlo a la carpeta hooks
export function useRouter() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return {
        push: navigate,             // como router.push
        pathname: location.pathname,
        query: Object.fromEntries(new URLSearchParams(location.search)), // tipo router.query
        params,                     // como router.query en rutas dinámicas
    };
}

const RegisterForm = () => {
    const [searchParams] = useSearchParams();
    const stepId = searchParams.get('step')
    const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
    const { mutate, isPending } = useRegister();

    let step = steps.findIndex((step) => step.id === stepId)
    if (step === -1) step = 0;
    if (stepId === 'done') step = steps.length;

    const router = useRouter();

    const goToNextStep = () => {
        const nextStep = steps[step + 1];

        if (nextStep) {
            router.push(`?step=${nextStep.id ?? 'done'}`)
        }
    }

    const goToPreviousStep = () => {
        const prevStep = steps[step - 1];
        if (prevStep) {
          router.push(`?step=${prevStep.id}`);
        }
      };

    const goToStep = (step: number) => {
        const nextStep = steps[step];
        if (nextStep) {
            router.push(`?step=${nextStep.id}`)
        }
    }

    const onSubmitFinal = (formData: Partial<RegisterFormData>) => {
        mutate(formData);
    }

    return (
        <Card.Root
            minH={{ base: "90vh", md: "60vh" }}
            maxW={{ base: "100%", md: "380px" }}
            variant={"subtle"}
            bg={"transparent"}
            w="full"
        >
            <Card.Header as={Heading}>
                <StepProgress />
            </Card.Header>

            <Card.Body>
                <Steps.Root
                    step={step}
                    onStepChange={(e) => goToStep(e.step)}
                    count={steps.length}>
                    <Steps.List>
                        {steps.map((s, index) => (
                            stepId === s.id &&
                            <Steps.Item key={index} index={index} title={s.title} flexDirection={"co"}>
                                <HStack>
                                    {/* {step !== 0 &&
                                        <Steps.PrevTrigger asChild>
                                            <IconButton variant={"ghost"}>
                                                <MdArrowBack />
                                            </IconButton>
                                        </Steps.PrevTrigger>
                                    } */}
                                    <Box>
                                        {step !== 0 &&
                                            <Steps.Description>Paso {index} de {steps.length - 1} </Steps.Description>
                                        }
                                        <Steps.Title>{s.title}</Steps.Title>
                                    </Box>
                                </HStack>
                            </Steps.Item>
                        ))}
                    </Steps.List>

                    <Steps.Content index={0}>
                        <EmailStep
                            onSubmit={(data) => {
                                setFormData(prev => ({ ...prev, ...data }));
                                goToNextStep();
                            }} />
                    </Steps.Content>

                    <Steps.Content index={1}>
                        <PasswordStep
                            onBack={goToPreviousStep}
                            onSubmit={({ password }) => {
                                setFormData(prev => ({ ...prev, password }));
                                goToNextStep();
                            }} />
                    </Steps.Content>

                    <Steps.Content index={2}>
                        <PersonalInfoStep
                            onBack={goToPreviousStep}
                            onSubmit={(data) => {
                                setFormData(prev => ({ ...prev, ...data }));
                                goToNextStep();
                            }} />
                    </Steps.Content>

                    <Steps.Content index={3}>
                        <StoreInfoStep
                            onBack={goToPreviousStep}
                            isPending={isPending}
                            onSubmit={(data) => {
                                const fullData = { ...formData, ...data };
                                onSubmitFinal(fullData as Partial<RegisterFormData>);
                            }} />
                    </Steps.Content>
                </Steps.Root>
            </Card.Body>
        </Card.Root >
    )
}

export default RegisterForm;