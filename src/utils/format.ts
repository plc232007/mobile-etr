export const DEMO_DATE = "2026-09-15";
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const date = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
export const shortDate = (value: string) =>
  new Date(`${value}T12:00:00`)
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    .replace(".", "");
export const daysUntil = (value: string) =>
  Math.ceil((Date.parse(value) - Date.parse(DEMO_DATE)) / 86400000);
export const uniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
