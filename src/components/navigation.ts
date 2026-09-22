import type { Prototype } from "@/hooks/usePrototype";
import type { IconName } from "./ui";
export interface NavItem {
  name: string;
  title: string;
  icon: IconName;
  href: string;
}
const home: NavItem = {
  name: "index",
  title: "Início",
  icon: "home",
  href: "/",
};
const services: NavItem = {
  name: "servicos",
  title: "Serviços",
  icon: "grid",
  href: "/servicos",
};
const requests: NavItem = {
  name: "processos",
  title: "Solicitações",
  icon: "layers",
  href: "/processos",
};
const news: NavItem = {
  name: "noticias",
  title: "Notícias",
  icon: "book-open",
  href: "/noticias",
};
const alerts: NavItem = {
  name: "alertas",
  title: "Notificações",
  icon: "bell",
  href: "/alertas",
};
const profile: NavItem = {
  name: "perfil",
  title: "Perfil",
  icon: "user",
  href: "/perfil",
};
export function mobileNavigation(model: Prototype): NavItem[] {
  if (model === "cliente") return [home, services, requests, news, profile];
  if (model === "caminho") return [home, requests, services, alerts, profile];
  return [
    home,
    { ...requests, title: "Processos" },
    services,
    { ...alerts, title: "Alertas" },
    profile,
  ];
}
export function desktopNavigation(model: Prototype): NavItem[] {
  return [
    home,
    ...(model === "cliente"
      ? [services, { ...requests, title: "Meus requerimentos" }]
      : [requests, services]),
    news,
    {
      name: "ajuda",
      title: "Ajuda",
      icon: "help-circle",
      href: "/atendimento",
    },
    profile,
  ];
}
