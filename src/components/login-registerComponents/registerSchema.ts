import { z } from "zod";

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
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

export type RegisterFormData = z.infer<typeof registerSchema>;
