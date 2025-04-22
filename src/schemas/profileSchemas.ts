import { z } from 'zod';

const phoneNumberSchema = z
    .string()
    .nonempty({ message: 'El teléfono es obligatorio' })
    .min(6, { message: 'El teléfono debe contener entre 6-14 dígitos' })
    .max(14, { message: 'El teléfono debe contener entre 6-14 dígitos' })
    .regex(/^\d+$/, { message: 'El teléfono solo puede contener números' });

export const storeDataFormSchema = z.object({
    name: z.string().min(3, { message: 'El nombre debe contener al menos 3 letras' }),
    address: z.string().min(5, { message: 'La dirección debe contener al menos 5 letras' }),
    tel: phoneNumberSchema
});

export type StoreDataForm = z.infer<typeof storeDataFormSchema>;

export const userDataFormSchema = z.object({
    name: z.string().min(3, { message: 'El nombre debe contener al menos 3 letras' }),
    last_name: z.string().min(5, { message: 'El apellido debe contener al menos 5 letras' }),
    email: z.string()
    .min(1, { message: 'El email es obligatorio' })
    .email({ message: 'Formato incorrecto: ejemplo@correo.com' })
});

export type UserDataForm = z.infer<typeof userDataFormSchema>;