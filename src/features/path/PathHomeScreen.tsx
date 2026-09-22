import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Copy,
  EmptyState,
  go,
  Icon,
  Row,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { date, money } from "@/utils/format";
import { pathColors as c, pathStyles as s } from "./pathStyles";

const sections = ["Para resolver", "Em andamento", "Meus imóveis"] as const;

export default function PathHomeScreen() {
  const data = useData();
  const wide = useWindowDimensions().width >= 850;
  const [section, setSection] =
    useState<(typeof sections)[number]>("Para resolver");
  const pending = data.pending.filter((item) => !item.resolved);
  const payments = data.payments
    .filter((item) => item.status !== "Pago")
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const tasks = [
    ...pending.map((item) => ({
      id: item.id,
      title: item.title,
      description:
        data.properties.find((property) => property.id === item.propertyId)
          ?.name ?? "Documento solicitado",
      meta: `Enviar até ${date(item.deadline)}`,
      href: `/pendencias?propertyId=${item.propertyId}`,
      action: "Enviar documento",
      urgent: true,
    })),
    ...payments.map((item) => ({
      id: item.id,
      title: item.description,
      description: `${money(item.value)} · ${data.properties.find((property) => property.id === item.propertyId)?.name ?? "Seu imóvel"}`,
      meta: `${item.status === "Vencido" ? "Em atraso desde" : "Vencimento"} ${date(item.dueAt)}`,
      href: `/boleto/${item.id}`,
      action: "Consultar parcela",
      urgent: item.status === "Vencido",
    })),
  ];
  return (
    <Screen home back={false}>
      <View style={{ paddingVertical: 10, gap: 14 }}>
        <Text style={s.label}>MEU CAMINHO / ETR</Text>
        <Text
          accessibilityRole="header"
          style={[s.headline, wide && { fontSize: 52, lineHeight: 58 }]}
        >
          Olá, {data.user.name.split(" ")[0]}.{"\n"}Vamos dar o próximo passo?
        </Text>
        <Copy style={{ color: c.muted }}>
          O que depende de você e o que já está com a ETR, em um só lugar.
        </Copy>
      </View>
      <View
        style={{
          flexDirection: wide ? "row" : "column",
          gap: wide ? 40 : 28,
          alignItems: "stretch",
        }}
      >
        <View style={{ flex: wide ? 2 : undefined, minWidth: 0, gap: 18 }}>
          <View
            accessibilityRole="tablist"
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: c.line,
            }}
          >
            {sections.map((item) => (
              <Pressable
                key={item}
                accessibilityRole="tab"
                accessibilityState={{ selected: item === section }}
                onPress={() => setSection(item)}
                style={{
                  flex: 1,
                  minHeight: 66,
                  paddingHorizontal: 4,
                  justifyContent: "center",
                  borderBottomWidth: 3,
                  borderBottomColor:
                    item === section ? c.accent : "transparent",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: item === section ? c.accent : c.muted,
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {section === "Para resolver" && (
            <View style={s.section}>
              <Row style={{ justifyContent: "space-between" }}>
                <Text style={s.label}>SUA LISTA DE AÇÕES</Text>
                <Copy small muted>
                  {tasks.length} {tasks.length === 1 ? "item" : "itens"}
                </Copy>
              </Row>
              {tasks.length === 0 && (
                <EmptyState
                  title="Tudo em dia"
                  description="Não há documentos pendentes ou parcelas a pagar. Você pode acompanhar seus processos na próxima aba."
                />
              )}
              {tasks.map((task, index) => (
                <Pressable
                  key={`${task.href}-${task.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={`${task.action}: ${task.title}`}
                  onPress={() => go(task.href)}
                  style={({ pressed }) => [
                    s.row,
                    index === 0 && {
                      backgroundColor: c.peach,
                      borderBottomWidth: 0,
                      padding: 18,
                      borderRadius: 4,
                    },
                    { opacity: pressed ? 0.7 : 1, alignItems: "flex-start" },
                  ]}
                >
                  <Text style={s.number}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <View style={{ flex: 1, gap: 9 }}>
                    <Copy
                      small
                      style={{
                        color: task.urgent ? c.accent : c.muted,
                        fontWeight: "600",
                      }}
                    >
                      {task.meta}
                    </Copy>
                    <Title>{task.title}</Title>
                    <Copy muted small>
                      {task.description}
                    </Copy>
                    <Row>
                      <Copy
                        style={{ color: c.ink, fontWeight: "700", flex: 1 }}
                      >
                        {task.action}
                      </Copy>
                      <Icon name="arrow-up-right" size={20} />
                    </Row>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {section === "Em andamento" && (
            <View style={s.section}>
              <Text style={s.label}>O QUE JÁ ESTÁ COM A ETR</Text>
              {!data.processes.length && (
                <EmptyState
                  title="Nenhum pedido em andamento"
                  description="Solicite um serviço para iniciar seu acompanhamento."
                  action="Fazer um pedido"
                  onPress={() => go("/requerimento")}
                />
              )}
              {data.processes.map((process) => (
                <Pressable
                  key={process.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Acompanhar ${process.protocol}`}
                  onPress={() => go(`/processo/${process.id}`)}
                  style={s.row}
                >
                  <View style={{ flex: 1, gap: 12 }}>
                    <Copy small muted>
                      PROTOCOLO {process.protocol}
                    </Copy>
                    <Title>{process.type}</Title>
                    <Copy>
                      {
                        data.properties.find(
                          (item) => item.id === process.propertyId,
                        )?.name
                      }
                    </Copy>
                    <StatusBadge label={process.status} tone="info" />
                    <Copy small muted>
                      {process.movements[0]?.title ??
                        "Aguardando a primeira atualização"}
                    </Copy>
                  </View>
                  <Icon name="arrow-up-right" />
                </Pressable>
              ))}
            </View>
          )}

          {section === "Meus imóveis" && (
            <View style={s.section}>
              <Text style={s.label}>SEU TERRITÓRIO</Text>
              {!data.properties.length && (
                <EmptyState
                  title="Nenhum imóvel vinculado"
                  description="Fale com a ETR para receber orientação sobre o seu cadastro."
                  action="Pedir orientação"
                  onPress={() => go("/atendimento")}
                />
              )}
              {data.properties.map((property, index) => (
                <Pressable
                  key={property.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir ${property.name}`}
                  onPress={() => go(`/imovel/${property.id}`)}
                  style={s.row}
                >
                  <Text style={s.number}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Title>{property.name}</Title>
                    <Copy muted>
                      {property.region} ·{" "}
                      {property.area.toLocaleString("pt-BR")} ha
                    </Copy>
                    <Copy small>{property.status}</Copy>
                  </View>
                  <Icon name="arrow-up-right" />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={{ flex: wide ? 1 : undefined, minWidth: 0, gap: 24 }}>
          <View style={s.panel}>
            <Text style={s.label}>UM NOVO COMEÇO</Text>
            <Title>O que você precisa fazer?</Title>
            <Copy muted>
              Encontre o serviço pela sua necessidade. A gente orienta cada
              etapa.
            </Copy>
            <Button
              title="Encontrar um serviço"
              icon="search"
              onPress={() => go("/servicos")}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => go("/requerimento")}
              style={{ minHeight: 48, justifyContent: "center" }}
            >
              <Copy style={{ fontWeight: "600", textAlign: "center" }}>
                Já sei: quero fazer um requerimento →
              </Copy>
            </Pressable>
          </View>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: c.accent,
              paddingLeft: 20,
              gap: 12,
            }}
          >
            <Icon name="compass" color={c.accent} size={28} />
            <Title>Cada etapa tem um porquê.</Title>
            <Copy muted>
              Entenda o caminho entre o primeiro pedido e a regularização da sua
              terra.
            </Copy>
            <Button
              title="Conhecer a jornada"
              variant="ghost"
              onPress={() => go("/jornada")}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => go("/atendimento")}
            style={s.row}
          >
            <Icon name="message-circle" />
            <View style={{ flex: 1 }}>
              <Copy style={{ fontWeight: "700" }}>Prefere conversar?</Copy>
              <Copy muted small>
                Conte com o atendimento da ETR.
              </Copy>
            </View>
            <Icon name="arrow-up-right" />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
