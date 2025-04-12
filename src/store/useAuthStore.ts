import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/types/authType";
import { Query } from "@tanstack/react-query";
import { QueryParams } from "@/types/utilsAppTypes";
interface AppError {
  message: string;
  code?: string | number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: AppError | null;
  queryParams: QueryParams

  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setError: (error: AppError | null) => void;
  resetState: () => void;
}

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  queryParams: { resource: "auth" },
};

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...initialState,

      setLoading: (isLoading: boolean) => set({ loading: isLoading }),

      setUser: (user: User | null) => set({ user }),

      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),

      setError: (error: AppError | null) => set({ error }),

      resetState: () => set(initialState),
    }),
    { name: "AuthStore" }
  )
);

export default useAuthStore;
