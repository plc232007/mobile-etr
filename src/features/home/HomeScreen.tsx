import React from "react";
import { Pressable, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Landscape } from "@/components/Landscape";
import {
  Button,
  Card,
  Copy,
  Eyebrow,
  go,
  Icon,
  IconName,
  Row,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { colors } from "@/theme";
import { date, money, shortDate } from "@/utils/format";
const shortcuts: { title: string; icon: IconName; href: string }[] = [
  { title: "Requerimento", icon: "edit-3", href: "/requerimento" },
  { title: "Certidão", icon: "award", href: "/certidao" },
  { title: "Editais", icon: "clipboard", href: "/editais" },
  { title: "Meu imóvel", icon: "map", href: "/imoveis" },
];
export default function HomeScreen() {
  const data = useData();
  const property = data.properties[0];
  const process = data.processes.find(
    (item) => item.propertyId === property?.id,
  );
  const pending = data.pending.filter((item) => !item.resolved);
  const payment = data.payments.find((item) => item.status === "Em aberto");
  return (
    <Screen home back={false}>
      <View style={{ gap: 5 }}>
        <Eyebrow>SEU ESPAÇO NO CAMPO</Eyebrow>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.text,
            fontSize: 30,
            lineHeight: 39,
            fontWeight: "700",
            letterSpacing: -1,
          }}
        >
          Olá, {data.user.name.split(" ")[0]}{" "}
          <Text style={{ fontSize: 24 }}>☀</Text>
        </Text>
        <Copy muted>Vamos cuidar da sua terra?</Copy>
      </View>
      {property && process ? (
        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: colors.primary,
          }}
        >
          <View style={{ padding: 23, gap: 12 }}>
            <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Eyebrow light>MINHA REGULARIZAÇÃO</Eyebrow>
              <Icon name="sunrise" color={colors.lime} size={22} />
            </Row>
            <Text
              style={{
                color: "white",
                fontSize: 23,
                fontWeight: "600",
                lineHeight: 30,
                letterSpacing: -0.5,
              }}
            >
              {property.name}
            </Text>
            <Row style={{ gap: 5 }}>
              <Icon name="map-pin" size={13} color="#D4E2D6" />
              <Copy small style={{ color: "#D4E2D6" }}>
                {property.region}
              </Copy>
            </Row>
            <View
              style={{
                height: 1,
                backgroundColor: "#426952",
                marginVertical: 3,
              }}
            />
            <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <View style={{ gap: 6 }}>
                <Row style={{ gap: 7 }}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: colors.lime,
                      borderRadius: 3,
                    }}
                  />
                  <Copy style={{ color: "white", fontWeight: "600" }}>
                    {process.status}
                  </Copy>
                </Row>
                <Copy small style={{ color: "#D4E2D6" }}>
                  Etapa {process.stage + 1} de 7 da sua jornada
                </Copy>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ver andamento"
                onPress={() => go(`/processo/${process.id}`)}
                style={{
                  backgroundColor: colors.lime,
                  minHeight: 48,
                  paddingHorizontal: 14,
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <Text
                  style={{
                    color: colors.primaryDark,
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  Ver andamento
                </Text>
                <Icon name="arrow-right" size={17} />
              </Pressable>
            </Row>
          </View>
          <Landscape height={95} />
        </View>
      ) : (
        <Card>
          <Title>Seu próximo passo começa aqui</Title>
          <Copy muted>Solicite um serviço para iniciar sua jornada.</Copy>
          <Button
            title="Novo requerimento"
            onPress={() => go("/requerimento")}
          />
        </Card>
      )}
      {pending.length > 0 ? (
        <Card
          style={{
            backgroundColor: colors.warningSoft,
            borderColor: "#EDDFBF",
            padding: 18,
          }}
        >
          <Row style={{ alignItems: "flex-start" }}>
            <View
              style={{
                backgroundColor: "#F4E4BC",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Icon name="alert-circle" color={colors.warning} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Copy style={{ fontWeight: "700" }}>
                Você possui {pending.length} pendência
                {pending.length > 1 ? "s" : ""}
              </Copy>
              <Copy small muted>
                {pending[0].title}
              </Copy>
              <Pressable
                accessibilityRole="button"
                onPress={() => go("/pendencias")}
                style={{ minHeight: 48, justifyContent: "center" }}
              >
                <Row style={{ gap: 7 }}>
                  <Text
                    style={{
                      color: colors.warning,
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    Resolver agora
                  </Text>
                  <Icon name="arrow-right" color={colors.warning} size={16} />
                </Row>
              </Pressable>
            </View>
          </Row>
        </Card>
      ) : (
        <Card>
          <StatusBadge label="Nenhuma pendência de envio" />
          <Copy muted small>
            Seus documentos foram recebidos. Avisaremos quando houver novidades.
          </Copy>
        </Card>
      )}
      {payment && (
        <Card style={{ padding: 18 }}>
          <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <Eyebrow>PRÓXIMO VENCIMENTO</Eyebrow>
            <Icon name="calendar" size={18} color={colors.muted} />
          </Row>
          <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <View style={{ gap: 3 }}>
              <Copy small muted>
                Parcela CDU • {date(payment.dueAt)}
              </Copy>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "700",
                  color: colors.text,
                  letterSpacing: -0.6,
                }}
              >
                {money(payment.value)}
              </Text>
            </View>
            <Button
              title="Gerar boleto"
              variant="secondary"
              onPress={() => go(`/boleto/${payment.id}`)}
            />
          </Row>
        </Card>
      )}
      <SectionHeader title="O que você precisa?" />
      <Row style={{ gap: 8, alignItems: "stretch" }}>
        {shortcuts.map((item) => (
          <Pressable
            key={item.title}
            accessibilityRole="button"
            onPress={() => go(item.href)}
            style={({ pressed }) => ({
              flex: 1,
              minWidth: 0,
              alignItems: "center",
              gap: 10,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 17,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icon} size={24} />
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 11,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </Row>
      <SectionHeader
        title="Últimas atualizações"
        action="Ver todas"
        onPress={() => go("/alertas")}
      />
      <View style={{ gap: 20 }}>
        {data.alerts.slice(0, 2).map((item, index) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            onPress={() => go(item.href)}
          >
            <Row style={{ alignItems: "flex-start" }}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: index === 0 ? colors.primarySoft : "#EFF0EB",
                  borderRadius: 17,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={index === 0 ? "check" : "clock"} size={16} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Copy small muted>
                  {item.date === "2026-09-15" ? "Hoje" : shortDate(item.date)}
                </Copy>
                <Copy style={{ fontWeight: "500" }}>{item.title}</Copy>
              </View>
              <Icon name="chevron-right" size={16} color={colors.muted} />
            </Row>
          </Pressable>
        ))}
      </View>
      <Card
        style={{ marginTop: 8, backgroundColor: "#EEF1E8" }}
        onPress={() => go("/jornada")}
      >
        <Row>
          <Icon name="compass" size={28} />
          <View style={{ flex: 1 }}>
            <Copy style={{ fontWeight: "700" }}>
              Cada passo, uma conquista.
            </Copy>
            <Copy muted small>
              Entenda sua jornada de regularização.
            </Copy>
          </View>
          <Icon name="arrow-right" size={18} />
        </Row>
      </Card>
    </Screen>
  );
}
