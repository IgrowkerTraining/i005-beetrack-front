import { RegisterFormData } from "@/components/login-registerComponents/registerSchema";
import { toaster } from "@/components/ui/toaster";
import { AUTH_ENDPOINT } from "@/const/api";
import { authService } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { Credentials, User } from "@/types/authType";
import { buildUrl } from "@/utils/buildUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface AppError {
  message: string;
  details: string;
}

// De momento no se usa en ningún lado, por eso comento la lína 25, que está dando problemas con la nueva versión de ReactQuery
export const useCheckAuthStatus = () => {
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, {
    ...queryParams,
    resource: "checkAuthStatus",
  });

  const query = useQuery<User, AppError>({
    queryKey: [url],
    queryFn: () => authService.checkAuthStatus(),
    // onSuccess: (user: User) => {
    //   setUser(user);
    //   setIsAuthenticated(true);
    // },
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
    },
    onError: (error) => {
      console.log(error)
    }
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
      queryClient.clear();
      // localStorage.removeItem("profile")
      // localStorage.removeItem("auth")
      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<User, AppError, RegisterFormData>({
    mutationFn: authService.registerUser,
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Usuario registrado correctamente",
      });
      navigate("/login");
      queryClient.invalidateQueries({ queryKey: [url] });
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        description: error.message,
      });
    }
  });
};

export const useCheckEmailExists = () => {
  return useMutation<boolean, AppError, string>({
    mutationFn: authService.checkEmailExists,
    onSuccess: (data) => {
      return data
    }
  });
};
