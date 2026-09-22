const configuredPassword = process.env.EXPO_PUBLIC_ETR_DEMO_PASSWORD?.trim();

export function validatePrototypePassword(password: string) {
  if (!configuredPassword) {
    return {
      valid: false,
      message: "A senha da demonstração não foi configurada neste ambiente.",
    };
  }
  if (password.length < 8) {
    return {
      valid: false,
      message: "A senha deve ter pelo menos 8 caracteres.",
    };
  }
  if (password !== configuredPassword) {
    return { valid: false, message: "CPF/CNPJ ou senha inválidos." };
  }
  return { valid: true, message: "" };
}
