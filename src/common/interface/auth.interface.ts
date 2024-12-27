// Descrever os dados esperados em operações de autenticação e gerenciamento de usuários.
// DTOs (Data Transfer Objects) para validar dados.

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
}

export interface resetPasswordDto {
  password: string;
  verificationCode: string;
}
