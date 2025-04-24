import { phoneNumberSchema } from "@/schemas/profileSchemas";
import { z } from "zod";

<<<<<<< HEAD
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
=======
const dateOfBirthSchema = z
  .string()
  .date("El campo es obligatorio")
  .refine(
    (dob) => {
      const b = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - b.getFullYear();
      const month = today.getMonth() - b.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < b.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    },
    {
      message: "Debes tener al menos 18 años",
    }
  );

export const baseRegisterSchema = z.object({
  // Step 1: Email
  email: z
    .string()
    .min(1, "Email requerido")
    .email('Formato incorrecto: ejemplo@correo.com'),

  // Step 2: Password
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#\?\)\,&_]).+$/,
      "La contraseña tiene que tener un caracter especial"
    ),
  confirmPassword: z.string().min(1, "Contraseña de confirmación es requerida"),

  // Step 3: Personal Info
  name: z.string().trim().min(1, "Nombre requerido"),
  lastName: z.string().trim().min(1, "Apellido requerido"),
  dateOfBirth: dateOfBirthSchema,

  // Step 4: Store Info
  storeName: z.string().trim().min(1, "Nombre de establecimiento es requerido"),
  storePhone: z
    .string()
    .nonempty({ message: "El teléfono es obligatorio" })
    .min(6, { message: "El teléfono debe contener al menos 6 números" })
    .regex(/^\d+$/, { message: "El teléfono solo puede contener números" }),
  storeAddress: z.string().optional(),
});

export const emailSchema = baseRegisterSchema.pick({ email: true });
export const passwordSchema = baseRegisterSchema
  .pick({ password: true, confirmPassword: true })
>>>>>>> origin
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
<<<<<<< HEAD

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
=======
export const personalInfoSchema = baseRegisterSchema.pick({
  name: true,
  lastName: true,
  dateOfBirth: true,
});
export const storeInfoSchema = baseRegisterSchema.pick({
  storeName: true,
  storePhone: true,
  storeAddress: true,
});

export const registerSchema = baseRegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  }
);

>>>>>>> origin
export type RegisterFormData = z.infer<typeof registerSchema>;
