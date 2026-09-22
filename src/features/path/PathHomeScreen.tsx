import { Text, useWindowDimensions, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ProcessCard } from "@/components/cards";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  MenuItem,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { date } from "@/utils/format";
import { colors } from "@/theme";
import { RecentActivity, RecentNews } from "@/features/home/HomeUpdates";
import { pathStyles as s } from "./pathStyles";

export default function PathHomeScreen() {
  const data = useData();
  const wide = useWindowDimensions().width >= 1000;
  const pending = data.pending.filter((item) => !item.resolved);
  const processes = data.processes.filter((item) => item.stage < 6);
  const payments = data.payments.filter((item) => item.status !== "Pago");
  const overdue = payments.filter((item) => item.status === "Vencido");
  const certificates = data.documents.filter(
    (item) => item.category === "Certidões",
  );
  const certificate = [...certificates].sort((a, b) =>
    b.issuedAt.localeCompare(a.issuedAt),
  )[0];
  return (
    <Screen home back={false}>
      <View style={{ gap: 10 }}>
        <Text style={s.label}>MINHA ETR / CENTRAL PESSOAL</Text>
        <Text accessibilityRole="header" style={s.headline}>
          Olá, {data.user.name.split(" ")[0]}.
        </Text>
        <Copy muted>Veja sua situação e o que precisa da sua atenção.</Copy>
      </View>
      <View
        style={{
          flexDirection: wide ? "row" : "column",
          gap: 32,
          alignItems: "stretch",
        }}
      >
        <View style={{ flex: wide ? 2 : undefined, minWidth: 0, gap: 20 }}>
          <SectionHeader title="Sua atenção agora" />
          {pending.map((item) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: colors.warningSoft,
                borderColor: "#E7D6AF",
                borderLeftWidth: 4,
                borderLeftColor: colors.warning,
              }}
            >
              <Eyebrow>AÇÃO NECESSÁRIA</Eyebrow>
              <Title>{item.title}</Title>
              <Copy>{item.reason}</Copy>
              <Copy small muted>
                Requerimento{" "}
                {data.processes.find((process) => process.id === item.processId)
                  ?.protocol ?? "vinculado ao imóvel"}
              </Copy>
              <Copy small>Prazo: {date(item.deadline)}</Copy>
              <Button
                title="Enviar documento"
                icon="upload"
                onPress={() => go(`/pendencias?propertyId=${item.propertyId}`)}
              />
            </Card>
          ))}
          {!pending.length && (
            <View style={{ gap: 10 }}>
              <StatusBadge label="Nenhuma pendência de envio" />
              <Copy muted>
                Seus envios estão em dia. Os documentos recebidos serão
                conferidos pela equipe.
              </Copy>
            </View>
          )}
          {overdue.length > 0 && (
            <MenuItem
              title={`${overdue.length} ${overdue.length === 1 ? "parcela em atraso" : "parcelas em atraso"}`}
              description="Confira o boleto e a orientação de atendimento."
              icon="alert-circle"
              href={`/boleto/${overdue[0].id}`}
            />
          )}
          <SectionHeader
            title="Requerimentos em andamento"
            action="Ver todos"
            onPress={() => go("/processos")}
          />
          {processes.slice(0, 2).map((process) => (
            <ProcessCard
              key={process.id}
              process={process}
              property={data.properties.find(
                (item) => item.id === process.propertyId,
              )}
            />
          ))}
          {!processes.length && (
            <EmptyState
              title="Nenhum requerimento em andamento"
              description="Você pode iniciar um pedido ou consultar o histórico de solicitações."
              action="Novo requerimento"
              onPress={() => go("/requerimento")}
            />
          )}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              gap: 16,
              paddingTop: 20,
            }}
          >
            <Title>Boletos</Title>
            <Copy>
              {payments.length
                ? `${payments.length} ${payments.length === 1 ? "boleto para consultar" : "boletos para consultar"}`
                : "Nenhum boleto em aberto."}
            </Copy>
            <Button
              title="Ver boletos"
              variant="secondary"
              onPress={() => go("/boletos")}
            />
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              gap: 16,
              paddingTop: 20,
            }}
          >
            <Title>Certidão Negativa</Title>
            {certificate ? (
              <>
                <StatusBadge
                  label={
                    certificate.status === "Válido"
                      ? "Certidão disponível"
                      : certificate.status
                  }
                  tone={
                    certificate.status === "Atualização necessária"
                      ? "warning"
                      : "info"
                  }
                />
                <Copy small muted>
                  Emitida em {date(certificate.issuedAt)}
                </Copy>
                <Button
                  title="Visualizar certidão"
                  variant="secondary"
                  onPress={() => go(`/documento/${certificate.id}`)}
                />
              </>
            ) : (
              <>
                <Copy muted>Nenhuma certidão disponível.</Copy>
                <Button
                  title="Solicitar certidão"
                  variant="secondary"
                  onPress={() => go("/certidao")}
                />
              </>
            )}
          </View>
          <SectionHeader
            title="Ações rápidas"
            action="Serviços"
            onPress={() => go("/servicos")}
          />
          <MenuItem
            title="Novo requerimento"
            description={
              data.draft
                ? "Você tem um rascunho para continuar."
                : "Faça uma nova solicitação à ETR."
            }
            icon="plus"
            href="/requerimento"
          />
          <MenuItem title="Emitir boleto" icon="file-text" href="/boletos" />
          <MenuItem title="Solicitar certidão" icon="award" href="/certidao" />
          <MenuItem title="Meus documentos" icon="folder" href="/documentos" />
          <MenuItem title="Meus imóveis" icon="map-pin" href="/imoveis" />
        </View>
        <View style={{ flex: wide ? 1 : undefined, minWidth: 0, gap: 24 }}>
          <RecentActivity />
          {data.properties.length > 0 && (
            <View style={{ gap: 8 }}>
              <SectionHeader title="ETR Monitora" />
              <Copy muted small>
                Informações dos imóveis vinculados ao seu cadastro.
              </Copy>
              {data.properties.map((item) => (
                <MenuItem
                  key={item.id}
                  title={item.name}
                  description={item.occurrence ?? "Nenhuma ocorrência exibida"}
                  icon="activity"
                  href={`/monitoramento/${item.id}`}
                />
              ))}
            </View>
          )}
          <SectionHeader
            title="Editais"
            action="Ver todos"
            onPress={() => go("/editais")}
          />
          {data.notices.slice(0, 2).map((item) => (
            <MenuItem
              key={item.id}
              title={`Edital ${item.number}`}
              description={`${item.title} · ${item.status} · Prazo ${date(item.deadline)}`}
              icon="clipboard"
              href={`/edital/${item.id}`}
            />
          ))}
          {!data.notices.length && <Copy muted>Nenhum edital disponível.</Copy>}
          <RecentNews />
          <MenuItem
            title="Precisa de ajuda?"
            description="Converse com a ETR."
            icon="message-circle"
            href="/atendimento"
          />
        </View>
      </View>
    </Screen>
  );
}
