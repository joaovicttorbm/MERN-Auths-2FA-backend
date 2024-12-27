// Fornece tipagem consistente para extensões de bibliotecas externas.
// Melhora a experiência de desenvolvimento com melhores mensagens de erro e suporte ao autocompletar.
// Facilita o uso de propriedades customizadas no fluxo de requisição HTTP||HTTPS.

import { UserDocument } from "../database/models/user.model";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends UserDocument {}
    interface Request {
      sessionId?: string;
    }
  }
}
