import { RegisterFormData } from "@/components/login-registerComponents/registerSchema";
import { toaster } from "@/components/ui/toaster";
import { AUTH_ENDPOINT } from "@/const/api";
import { authService } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { Credentials, User } from "@/types/authType";
import { buildUrl } from "@/utils/buildUrl";
<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface AppError {
  message: string;
  details: string;
}

// De momento no se usa en ningún lado, por eso comento la lína 25, que está dando problemas con la nueva versión de ReactQuery
=======
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

interface AppError {
  message: string;
  details: string;
}
>>>>>>> origin
export const useCheckAuthStatus = () => {
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, {
    ...queryParams,
    resource: "checkAuthStatus",
  });

  const query = useQuery<User, AppError>({
    queryKey: [url],
    queryFn: () => authService.checkAuthStatus(),
<<<<<<< HEAD
    // onSuccess: (user: User) => {
    //   setUser(user);
    //   setIsAuthenticated(true);
    // },
    staleTime: 5 * 60 * 1000, // lo puse porque esta en products tmb ^^'
  });

=======
    staleTime: 5 * 60 * 1000, // lo puse porque esta en products tmb ^^'
  });
>>>>>>> origin
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
<<<<<<< HEAD
      queryClient.clear();
      // localStorage.removeItem("profile")
      // localStorage.removeItem("auth")
=======
>>>>>>> origin
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
      toaster.create({
        type: "success",
        description: "Registro exitoso. ¡Bienvenido!",
      })
    },
    onError: (error) => {
      toaster.create({
        type: "error",
<<<<<<< HEAD
        description: error.message,
      });
=======
        description: error.message || "Error al registrarse",
      })
>>>>>>> origin
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
