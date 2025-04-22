import { phoneNumberSchema } from "@/schemas/profileSchemas";
import { z } from "zod";

// Esquema para transformar la fecha de nacimiento de string a Date
const dateOfBirthSchema = z
  .string()
  .date('El campo es obligatorio')
  .refine((dob) => {
    const b = new Date(dob)
    const today = new Date();
    const age = today.getFullYear() - b.getFullYear();
    const month = today.getMonth() - b.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < b.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, {
    message: "Debes tener al menos 18 años",
  })

export const baseRegisterSchema = z.object({
  // Step 1: Email
  email: z.string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Formato de email invalido"),
  
  // Step 2: Password
  password: z.string()
    .min(10, "La contraseña debe contener al menos 10 caracteres")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#\?\)\,&_]).+$/, "La contraseña no coincide con el patrón requerido abajo."),
  confirmPassword: z.string()
    .min(1, "Contraseña de confirmación es requerida"),
  
  // Step 3: Personal Info
  name: z.string().trim().min(1, "Nombre requerido"),
  last_name: z.string().trim().min(1, "Apellido requerido"),
  birthdate: dateOfBirthSchema,
  
  // Step 4: Store Info
  storeName: z.string().trim().min(1, "Nombre de establecimiento es requerido"),
  storeTel: phoneNumberSchema,
  storeAddress: z.string().optional(),
});

export const emailSchema = baseRegisterSchema
  .pick({
    email: true
  });

export const passwordSchema = baseRegisterSchema
  .pick({
    password: true,
    confirmPassword: true
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const personalInfoSchema = baseRegisterSchema
  .pick({
    name: true,
    last_name: true,
    birthdate: true
  });

export const storeInfoSchema = baseRegisterSchema
  .pick({
    storeName: true,
    storeTel: true,
    storeAddress: true
  });

export const registerSchema = baseRegisterSchema
  .refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type CheckEmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type StoreInfoForm = z.infer<typeof storeInfoSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
