import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Formato de email inválido").min(1, "Email requerido"),
    password: z.string().min(1, "Contraseña requerida")
});

export type LoginFormData = z.infer<typeof loginSchema>;