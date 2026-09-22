import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Copy,
  EmptyState,
  Filters,
  go,
  Icon,
  SearchBar,
  Title,
} from "@/components/ui";
import { pathStyles as s } from "./pathStyles";

const services = [
  {
    title: "Quero regularizar minha terra",
    description: "Inicie um requerimento com orientação em cada etapa.",
    category: "Solicitar",
    href: "/requerimento",
  },
  {
    title: "Preciso de uma certidão",
    description: "Consulte a disponibilidade da Certidão Negativa.",
    category: "Solicitar",
    href: "/certidao",
  },
  {
    title: "Quero agendar um atendimento",
    description: "Escolha motivo, unidade, dia e horário.",
    category: "Solicitar",
    href: "/agendamento",
  },
  {
    title: "Preciso enviar um documento",
    description: "Confira e resolva as pendências de documentação.",
    category: "Resolver",
    href: "/pendencias",
  },
  {
    title: "Quero consultar meus boletos",
    description: "Veja parcelas, vencimentos e comprovantes.",
    category: "Resolver",
    href: "/boletos",
  },
  {
    title: "Quero ver meus documentos",
    description: "Acesse sua carteira de documentos digitais.",
    category: "Acompanhar",
    href: "/documentos",
  },
  {
    title: "Como está meu processo?",
    description: "Veja o andamento e as últimas movimentações.",
    category: "Acompanhar",
    href: "/processos",
  },
  {
    title: "Quero consultar editais",
    description: "Encontre publicações e acompanhe prazos.",
    category: "Acompanhar",
    href: "/editais",
  },
  {
    title: "Quero consultar meu imóvel",
    description: "Dados do imóvel, ETR GEO e ETR Monitora.",
    category: "Acompanhar",
    href: "/imoveis",
  },
  {
    title: "Preciso falar com a ETR",
    description: "Atendimento e dúvidas frequentes.",
    category: "Resolver",
    href: "/atendimento",
  },
  {
    title: "Quero entender a regularização",
    description: "Conheça as etapas da sua jornada.",
    category: "Acompanhar",
    href: "/jornada",
  },
  {
    title: "Quero ler as notícias da ETR",
    description: "Acompanhe as novidades institucionais.",
    category: "Acompanhar",
    href: "/noticias",
  },
];
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export default function PathServicesScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const matches = services.filter(
    (item) =>
      (category === "Todos" || item.category === category) &&
      normalize(`${item.title} ${item.description}`).includes(normalize(query)),
  );
  return (
    <Screen back={false}>
      <Text style={s.label}>SERVIÇOS / POR ONDE COMEÇAR</Text>
      <Text accessibilityRole="header" style={s.headline}>
        Conte o que você precisa.
      </Text>
      <Copy muted>
        Escolha uma necessidade para encontrar seu próximo passo.
      </Copy>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar serviço: boleto, documento…"
      />
      <Filters
        values={["Todos", "Solicitar", "Resolver", "Acompanhar"]}
        value={category}
        onChange={setCategory}
      />
      <Copy small muted>
        {matches.length}{" "}
        {matches.length === 1 ? "serviço encontrado" : "serviços encontrados"}
      </Copy>
      <View>
        {matches.map((item, index) => (
          <Pressable
            key={item.title}
            accessibilityRole="button"
            onPress={() => go(item.href)}
            style={s.row}
          >
            <Text style={s.number}>{String(index + 1).padStart(2, "0")}</Text>
            <View style={{ flex: 1, gap: 6 }}>
              <Title>{item.title}</Title>
              <Copy muted>{item.description}</Copy>
            </View>
            <Icon name="arrow-up-right" />
          </Pressable>
        ))}
      </View>
      {!matches.length && (
        <EmptyState
          title="Vamos tentar de outro jeito?"
          description="Busque por uma palavra como documento ou boleto, ou limpe os filtros para ver todos os serviços."
          action="Limpar busca e filtros"
          onPress={() => {
            setQuery("");
            setCategory("Todos");
          }}
        />
      )}
    </Screen>
  );
}
