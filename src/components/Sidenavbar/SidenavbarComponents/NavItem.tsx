import useSidenavbarStore from '@/store/useSidenavbarStore';
import { Button, Text } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/system';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
    to: string;
    text: string; // Texto del botón
    icon?: ReactElement;
}

const NavItem = ({ to, text, icon, ...rest }: NavItemProps) => {

    const { isToggle } = useSidenavbarStore();
    const { setIsOpen } = useSidenavbarStore();

    const sidenavabarStyles: SystemStyleObject = {
        "&.active": { bg: "yellow.amarillo" },
    }

    return (
        <Button
            asChild
            w={"full"}
            p={"14px"}
            h={"auto"}
            gap={3}
            fontWeight={"bold"}
            fontSize={"14px"}
            justifyContent={"start"}
            borderRadius={"16px"}
            _hover={{ bg: "yellow.400" }}
            variant={"ghost"}
            css={sidenavabarStyles}
            {...rest}>
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? "active" : "pending"}
                onClick={() => setIsOpen(false)}>
                {icon}
                <Text
                    display={{ base: "block", md: isToggle ? "none" : "" }}>
                    {text}
                </Text>
            </NavLink>
        </Button>
    )
}

export default NavItem;