import { Resend } from "resend"; // API de envio de e-mails Resend,
import { config } from "../config/app.config";

export const resend = new Resend(config.RESEND_API_KEY);
