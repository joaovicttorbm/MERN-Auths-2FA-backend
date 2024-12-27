import { z } from "zod";

const stringTrimmed = z.string().trim();

export const verifyMfaSchema = z.object({
  code: stringTrimmed.min(1).max(6),
  secretKey: stringTrimmed.min(1),
});

export const verifyMfaForLoginSchema = z.object({
  code: stringTrimmed.min(1).max(6),
  email: stringTrimmed.email().min(1),
  userAgent: z.string().optional(),
});
