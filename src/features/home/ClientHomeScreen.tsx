import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  Icon,
  IconName,
  MenuItem,
  Row,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { colors } from "@/theme";
import { date, money } from "@/utils/format";

const services: {
  title: string;
  description: string;
  icon: IconName;
  href: string;
}[] = [
  {
    title: "Requerimento Online",
    description: "Faça um novo pedido",
    icon: "edit-3",
    href: "/requerimento",
  },
  {
    title: "Boletos",
    description: "Consulte suas parcelas",
    icon: "file-text",
    href: "/boletos",
  },
  {
    title: "Certidão Negativa",
    description: "Consulte e emita",
    icon: "award",
    href: "/certidao",
  },
  {
    title: "Editais",
    description: "Acompanhe publicações",
    icon: "clipboard",
    href: "/editais",
  },
];

export default function ClientHomeScreen() {
  const data = useData();
  const [selected, setSelected] = useState(data.properties[0]?.id);
  const [choosing, setChoosing] = useState(false);
  const property =
    data.properties.find((item) => item.id === selected) ?? data.properties[0];
  const process = data.processes.find(
    (item) => item.propertyId === property?.id,
  );
  const pending = data.pending.filter(
    (item) => item.propertyId === property?.id && !item.resolved,
  );
  const payment = data.payments
    .filter(
      (item) => item.propertyId === property?.id && item.status !== "Pago",
    )
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt))[0];
  return (
    <Screen home back={false}>
      <View style={{ gap: 6 }}>
        <Eyebrow>ÁREA DO CLIENTE</Eyebrow>
        <Title large>Olá, {data.user.name.split(" ")[0]}.</Title>
        <Copy muted>Sua terra regularizada começa com o próximo passo.</Copy>
      </View>

      {property ? (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Selecionar imóvel"
            accessibilityState={{ expanded: choosing }}
            onPress={() => setChoosing(!choosing)}
            style={s.property}
          >
            <Icon name="map-pin" />
            <View style={{ flex: 1, gap: 3 }}>
              <Eyebrow>IMÓVEL EM ACOMPANHAMENTO</Eyebrow>
              <Copy style={{ fontWeight: "700" }}>{property.name}</Copy>
              <Copy muted small>
                {property.region} · {property.area.toLocaleString("pt-BR")} ha
              </Copy>
            </View>
            <Icon name={choosing ? "chevron-up" : "chevron-down"} size={18} />
          </Pressable>
          {choosing && (
            <Card>
              {data.properties.map((item) => (
                <MenuItem
                  key={item.id}
                  title={item.name}
                  description={item.region}
                  icon={item.id === property.id ? "check-circle" : "circle"}
                  onPress={() => {
                    setSelected(item.id);
                    setChoosing(false);
                  }}
                />
              ))}
            </Card>
          )}

          <View style={s.progress}>
            <Row style={{ justifyContent: "space-between" }}>
              <Eyebrow light>MINHA REGULARIZAÇÃO</Eyebrow>
              <Icon name="compass" color={colors.lime} />
            </Row>
            <Text accessibilityRole="header" style={s.progressTitle}>
              {process?.status ?? "Vamos começar?"}
            </Text>
            <Copy style={{ color: "#DFEBDD" }}>
              {process
                ? `Protocolo ${process.protocol}`
                : "Envie um requerimento para iniciar o acompanhamento deste imóvel."}
            </Copy>
            {process && (
              <>
                <View
                  accessibilityRole="progressbar"
                  accessibilityLabel="Etapas da regularização"
                  accessibilityValue={{
                    min: 1,
                    max: 7,
                    now: process.stage + 1,
                  }}
                  style={{ flexDirection: "row", gap: 5 }}
                >
                  {Array.from({ length: 7 }, (_, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        height: 5,
                        borderRadius: 3,
                        backgroundColor:
                          index <= process.stage ? colors.lime : "#426952",
                      }}
                    />
                  ))}
                </View>
                <Copy small style={{ color: "#DFEBDD" }}>
                  Etapa {process.stage + 1} de 7 · Acompanhe cada avanço
                </Copy>
              </>
            )}
            <Button
              title={
                process ? "Acompanhar meu processo" : "Iniciar requerimento"
              }
              variant="secondary"
              icon="arrow-right"
              onPress={() =>
                go(process ? `/processo/${process.id}` : "/requerimento")
              }
            />
          </View>

          <SectionHeader title="Seu próximo passo" />
          {pending.length ? (
            <Card
              style={{
                backgroundColor: colors.warningSoft,
                borderColor: "#E7D6AF",
                borderLeftWidth: 4,
                borderLeftColor: colors.warning,
              }}
            >
              <Row>
                <Icon name="alert-circle" color={colors.warning} />
                <Copy
                  style={{ color: colors.warning, fontWeight: "700", flex: 1 }}
                >
                  {pending.length}{" "}
                  {pending.length === 1
                    ? "documento precisa"
                    : "documentos precisam"}{" "}
                  da sua atenção
                </Copy>
              </Row>
              <Title>{pending[0].title}</Title>
              <Copy>{pending[0].reason}</Copy>
              <Copy small muted>
                Prazo de envio: {date(pending[0].deadline)}
              </Copy>
              <Button
                title="Enviar documento pendente"
                icon="upload"
                onPress={() => go(`/pendencias?propertyId=${property.id}`)}
              />
            </Card>
          ) : (
            <Card>
              <StatusBadge label="Nenhuma pendência de envio" />
              <Copy>
                Você está em dia com os envios deste imóvel. Acompanhe as
                próximas atualizações em Alertas.
              </Copy>
            </Card>
          )}

          {payment && (
            <Card>
              <Row>
                <Icon name="calendar" />
                <Eyebrow>
                  {payment.status === "Vencido"
                    ? "PARCELA EM ATRASO"
                    : "PARCELA A PAGAR"}
                </Eyebrow>
              </Row>
              <Copy>{payment.description}</Copy>
              <Row
                style={{ justifyContent: "space-between", flexWrap: "wrap" }}
              >
                <Title>{money(payment.value)}</Title>
                <Copy small muted>
                  Vence em {date(payment.dueAt)}
                </Copy>
              </Row>
              <Button
                title="Consultar boleto"
                variant="secondary"
                onPress={() => go(`/boleto/${payment.id}`)}
              />
            </Card>
          )}
          <Card style={{ paddingVertical: 4 }}>
            <MenuItem
              title="Dados e documentos do imóvel"
              description="Tudo sobre a sua propriedade"
              icon="folder"
              href={`/imovel/${property.id}`}
            />
            <MenuItem
              title="ETR GEO"
              description="Veja a localização do seu imóvel"
              icon="map"
              href={`/mapa/${property.id}`}
            />
            <MenuItem
              title="ETR Monitora"
              description="Acompanhe a situação do imóvel"
              icon="activity"
              href={`/monitoramento/${property.id}`}
            />
          </Card>
        </>
      ) : (
        <EmptyState
          title="Seu imóvel, mais perto de você"
          description="Inicie um pedido para dar o primeiro passo na sua regularização."
          action="Novo requerimento"
          onPress={() => go("/requerimento")}
          icon="map-pin"
        />
      )}

      <SectionHeader
        title="Serviços online"
        action="Ver todos"
        onPress={() => go("/servicos")}
      />
      <View style={s.services}>
        {services.map((item) => (
          <Pressable
            key={item.title}
            accessibilityRole="button"
            accessibilityLabel={item.title}
            onPress={() => go(item.href)}
            style={({ pressed }) => [s.service, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Icon name={item.icon} size={25} />
            <Copy style={{ fontWeight: "700" }}>{item.title}</Copy>
            <Copy small muted>
              {item.description}
            </Copy>
            <Icon name="arrow-up-right" size={17} />
          </Pressable>
        ))}
      </View>
      <Card style={{ backgroundColor: colors.primarySoft }}>
        <Eyebrow>CONTE COM A ETR</Eyebrow>
        <Title>Precisa de orientação?</Title>
        <Copy>
          Entenda as etapas da regularização ou fale com o atendimento.
        </Copy>
        <Button
          title="Entender minha jornada"
          variant="secondary"
          icon="compass"
          onPress={() => go("/jornada")}
        />
        <Button
          title="Falar com a ETR"
          variant="primary"
          icon="message-circle"
          onPress={() => go("/atendimento")}
        />
      </Card>
      <SectionHeader
        title="Notícias da ETR"
        action="Ver notícias"
        onPress={() => go("/noticias")}
      />
      {data.news.slice(0, 1).map((news) => (
        <Card key={news.id} onPress={() => go(`/noticia/${news.id}`)}>
          <Eyebrow>
            {news.category} · {date(news.date)}
          </Eyebrow>
          <Title>{news.title}</Title>
          <Copy small muted>
            Ler notícia →
          </Copy>
        </Card>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  property: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    minHeight: 90,
  },
  progress: {
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    padding: 24,
    gap: 18,
  },
  progressTitle: {
    color: "white",
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  services: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  service: {
    flexBasis: "45%",
    flexGrow: 1,
    padding: 18,
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
