import { AUTH_ENDPOINT } from "@/const/api";
import { authService } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { Credentials, NewUserData, User } from "@/types/authType";
import { buildUrl } from "@/utils/buildUrl";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

interface AppError {
  message: string;
  details: string;
}
export const useCheckAuthStatus = () => {
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, {
    ...queryParams,
    resource: "checkAuthStatus",
  });

  const query = useQuery<User, AppError>({
    queryKey: [url],
    queryFn: () => authService.checkAuthStatus(),
    staleTime: 5 * 60 * 1000, // lo puse porque esta en products tmb ^^'
  });
  useEffect(() => {
    if (query.data) {
        setUser(query.data);
        setIsAuthenticated(true);
    }
  })
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<User, AppError, Credentials>({
    mutationFn: authService.loginUser,
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: [url] });
      toaster.create({
        type: "success",
        description: "Bienvenido a tu cuenta",
      })
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        description: error.message,
      })
      console.error(error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetState, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<void, AppError>({
    mutationFn: authService.logoutUser,
    onSuccess: () => {
      resetState();
      localStorage.clear();
      queryClient.invalidateQueries({ queryKey: [url] });
      toaster.create({
        type: "success",
        description: "Espero verto pronto ♥",
      })
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<User, AppError, NewUserData>({
    mutationFn: authService.registerUser,
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: [url] });
      toaster.create({
        type: "success",
        description: "Registro exitoso. ¡Bienvenido!",
      })
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        description: error.message || "Error al registrarse",
      })
    }
  });
};

export const useCheckEmailExists = () => {
  return useMutation<boolean, AppError, string>({
    mutationFn: authService.checkEmailExists,
  });
};