import {Outlet, Navigate} from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Flex, Spinner } from "@chakra-ui/react";

interface AccessRoutesProps {
    isPrivate: boolean;
}

const AccessRoutes: React.FC<AccessRoutesProps> = ({ isPrivate }) => {
    const user = useAuthStore(state => state.user)
    const loading = useAuthStore(state => state.loading)

    if(loading) {
        return (
            <Flex justify={'center'} align={'center'} height={'100vh'}>
                <Spinner
                    borderWidth={'4px'}
                    size={'xl'}
                />
            </Flex>
        )
    }

  if (!user) {
    return isPrivate ? <Navigate to="/login" replace /> : <Outlet />;
  } //TODO: Cambiar "user" a "!user" cuando tengamos implementada la autenticación.

  if (user && !isPrivate) {
    return <Navigate to="/" replace />;
  } //TODO: Cambiar "!user" a "user" cuando tengamos implementada la autenticación.

  return <Outlet />;
};

export default AccessRoutes;