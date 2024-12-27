import { z } from "zod";

// Definindo esquemas reutilizáveis
const stringTrimmed = z.string().trim();
export const emailSchema = stringTrimmed.email().min(1).max(255);
export const passwordSchema = stringTrimmed.min(6).max(255);
export const verificationCodeSchema = stringTrimmed.min(1).max(25);

// Schema de registro (incluindo validação de senha)
export const registerSchema = z
  .object({
    name: stringTrimmed.min(1).max(255),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });


export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});
