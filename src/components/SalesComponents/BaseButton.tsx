import { Button, HStack, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface BaseButtonProps {
    readonly title?: string;
    readonly icon?: any;
    readonly onClick: () => void;
    readonly isPrimary?: boolean;
    readonly w?: string | object;
}

export default function BaseButton({ title = "Acceso rápido", icon, onClick, isPrimary = true, w= "50%" } : BaseButtonProps) {
    const color = useColorModeValue("blue.400", "white");
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    return (
        <Button
            w={w}
            onClick={onClick}
            bg={isPrimary ? "yellow.400" : "#f7f9fc"}
            _active={{ bg: isPrimary ? "yellow.500" : "gray.300" }}
            _hover={{ bg: isPrimary ? "yellow.500" : "gray.300" }}
            borderColor={isPrimary ? "yellow.400" : "gray.200"}
            borderRadius="xl"
            p={2}  
            flex={1}                      
            textAlign="center"
            variant="solid"
        >
            <HStack gap={2} justify="center">
            {icon && <Icon as={icon} boxSize={4} color={color} />}
                <Text
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                    color={color}
                    textAlign="center"
                    whiteSpace="normal"
                    p={2}
                >
                    {title}
                </Text>
            </HStack>
        </Button>
    )
}