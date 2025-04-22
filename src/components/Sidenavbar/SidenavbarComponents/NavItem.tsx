import useSidenavbarStore from '@/store/useSidenavbarStore';
import { Button, Text } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/system';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@/components/ui/tooltip';


type NavItemProps = {
    to: string;
    text: string; // Texto del botón
    icon?: ReactElement;
    toggeable?: boolean;
}

const NavItem = ({ to, text, icon, toggeable = true, ...rest }: NavItemProps) => {

    const { isToggle } = useSidenavbarStore();
    const { setIsOpen } = useSidenavbarStore();

    const sidenavabarStyles: SystemStyleObject = {
        "&.active": { bg: "yellow.amarillo" },
    }

    return (
        <Tooltip content={text} positioning={{ placement: "right" }} disabled={!isToggle}>
            <Button
                asChild
                w={"full"}
                p={"14px"}
                h={"auto"}
                gap={3}
                fontWeight={"bold"}
                fontSize={"14px"}
                justifyContent={"start"}
                colorPalette={"navItem"}
                borderRadius={"16px"}
                variant={"ghost"}
                css={sidenavabarStyles}
                {...rest}>
                <NavLink
                    to={to}
                    className={({ isActive }) => isActive ? "active" : "pending"}
                    onClick={() => setIsOpen(false)}>
                    {icon}
                    <Text
                        display={{ base: "block", md: toggeable ? isToggle ? "none" : "" : "" }}>
                        {text}
                    </Text>
                </NavLink>
            </Button>
        </Tooltip>
    )
}

export default NavItem;