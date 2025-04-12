import { z } from "zod";

export const baseRegisterSchema = z.object({
  // Step 1: Email
  email: z.string().min(1, "Email requerido").email("Formato de email invalido"),
  
  // Step 2: Password
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Contraseña de confirmación es requerida"),
  
  // Step 3: Personal Info
  name: z.string().min(1, "Nombre requerido"),
  lastName: z.string().min(1, "Apellido requerido"),
  dateOfBirth: z.string().min(1, "Fecha de nacimiento requerida"),
  
  // Step 4: Store Info
  storeName: z.string().min(1, "Nombre de establecimiento es requerido"),
  storePhone: z.string().min(1, "Número de telefono es requerido"),
  storeAddress: z.string().optional(),
});

export const emailSchema = baseRegisterSchema.pick({ email: true });
export const passwordSchema = baseRegisterSchema.pick({ password: true, confirmPassword: true })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export const personalInfoSchema = baseRegisterSchema.pick({ name: true, lastName: true, dateOfBirth: true });
export const storeInfoSchema = baseRegisterSchema.pick({ storeName: true, storePhone: true, storeAddress: true });

export const registerSchema = baseRegisterSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
