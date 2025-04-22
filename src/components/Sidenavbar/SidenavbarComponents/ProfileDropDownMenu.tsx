import { Box, Button, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdLogout, MdPerson } from "react-icons/md";
import NavItem from "./NavItem";
import { FaCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";
import useSidenavbarStore from "@/store/useSidenavbarStore";

const ProfileDropDownMenu = () => {
    const [profileDropDownIsOpen, setProfileDropDownIsOpen] = useState<boolean>(false);
    const { isToggle } = useSidenavbarStore();

    const logout = useLogout();
    const location = useLocation();

    return (
        <Menu.Root positioning={{ placement: "top-start", sameWidth: true }} variant={"solid"} onOpenChange={() => setProfileDropDownIsOpen(!profileDropDownIsOpen)} defaultOpen={false}>
            <Menu.Trigger asChild>
                <Button
                    variant={"ghost"}
                    width={"full"}
                    mt={"auto"}
                    p={"14px"}
                    h={"auto"}
                    bg={location.pathname === "/profile" ? "colorPalette.solid" : ""}
                    justifyContent={"start"}
                    alignItems={"center"}
                    fontWeight={"bold"}
                    colorPalette={"navItem"}
                    rounded={"16px"}>
                    <MdPerson />
                    <Box w={"full"} display={{ base: "inherit", md: isToggle ? "none" : "" }}>
                        Usuario
                        <Box asChild ml={"auto"}>
                            {profileDropDownIsOpen
                                ? <MdKeyboardArrowDown />
                                : <MdKeyboardArrowUp />}
                        </Box>
                    </Box>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content spaceY={2}>
                        <Menu.Item asChild value="profile-link" _highlighted={{ color: "black" }}>
                            {/* <NavItem to="/logout" icon={<MdLogout />} text="Logout" /> */}
                            <Button
                                p={"14px"}
                                h={"auto"}
                                variant={"ghost"}
                                colorPalette={"navItem"}
                                fontWeight={"bold"}
                                rounded={"16px"}
                                justifyContent={"start"}
                                onClick={() => logout.mutate()}>
                                    <MdLogout />
                                Logout
                            </Button>
                        </Menu.Item>
                        <Menu.Item asChild value="logout-link" _highlighted={{ color: "black" }}>
                            <NavItem to="/profile" icon={<FaCircleUser />} text="Perfil" toggeable={false} />
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default ProfileDropDownMenu;