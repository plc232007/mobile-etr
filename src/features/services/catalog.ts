import type { IconName } from "@/components/ui";

export interface Service {
  title: string;
  description: string;
  icon: IconName;
  href: string;
  category: "Solicitar" | "Consultar" | "Acompanhar";
  primary?: boolean;
  geo?: boolean;
}
const catalog: Service[] = [
  {
    title: "Requerimento Online",
    description: "Faça uma nova solicitação à ETR, em etapas.",
    icon: "edit-3",
    href: "/requerimento",
    category: "Solicitar",
    primary: true,
  },
  {
    title: "Emitir boleto",
    description: "Consulte parcelas e gere seu boleto.",
    icon: "file-text",
    href: "/boletos",
    category: "Consultar",
    primary: true,
  },
  {
    title: "Certidão Negativa",
    description: "Consulte ou solicite sua certidão.",
    icon: "award",
    href: "/certidao",
    category: "Solicitar",
    primary: true,
  },
  {
    title: "Editais",
    description: "Consulte publicações e acompanhe prazos.",
    icon: "clipboard",
    href: "/editais",
    category: "Consultar",
  },
  {
    title: "ETR Monitora",
    description: "Acompanhe a situação dos seus imóveis.",
    icon: "activity",
    href: "/monitora",
    category: "Acompanhar",
  },
  {
    title: "Notícias",
    description: "Acompanhe as novidades da ETR.",
    icon: "book-open",
    href: "/noticias",
    category: "Consultar",
  },
  {
    title: "ETR GEO",
    description: "Consulte a representação do imóvel no mapa.",
    icon: "map",
    href: "/geo",
    category: "Consultar",
    geo: true,
  },
  {
    title: "Minhas solicitações",
    description: "Consulte protocolos e o andamento dos requerimentos.",
    icon: "layers",
    href: "/processos",
    category: "Acompanhar",
  },
  {
    title: "Documentos e pendências",
    description: "Envie documentos solicitados pela ETR.",
    icon: "upload",
    href: "/pendencias",
    category: "Solicitar",
  },
  {
    title: "Meus documentos",
    description: "Visualize, baixe e compartilhe seus arquivos.",
    icon: "folder",
    href: "/documentos",
    category: "Consultar",
  },
  {
    title: "Meus imóveis",
    description: "Consulte os imóveis vinculados ao cadastro.",
    icon: "map-pin",
    href: "/imoveis",
    category: "Consultar",
  },
  {
    title: "Agendar atendimento",
    description: "Escolha motivo, unidade, dia e horário.",
    icon: "calendar",
    href: "/agendamento",
    category: "Solicitar",
  },
  {
    title: "Jornada da regularização",
    description: "Entenda as etapas do seu caminho.",
    icon: "compass",
    href: "/jornada",
    category: "Acompanhar",
  },
  {
    title: "Ajuda e atendimento",
    description: "Tire dúvidas e converse com a equipe.",
    icon: "help-circle",
    href: "/atendimento",
    category: "Solicitar",
  },
];
export const getServices = (geoEnabled: boolean) =>
  catalog.filter((item) => !item.geo || geoEnabled);
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export const matchesService = (service: Service, query: string) =>
  normalizeSearch(`${service.title} ${service.description}`).includes(
    normalizeSearch(query),
  );
