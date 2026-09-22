import React from "react";
import { View } from "react-native";
import {
  CitizenAlert,
  CitizenDocument,
  News,
  Notice,
  Payment,
  Pending,
  Process,
  Property,
} from "@/types";
import {
  Button,
  Card,
  Copy,
  Eyebrow,
  go,
  Icon,
  Row,
  StatusBadge,
  Title,
} from "./ui";
import { date, daysUntil, money } from "@/utils/format";
import { colors } from "@/theme";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";
import { processStages } from "./Timeline";
export function ProcessCard({
  process,
  property,
}: {
  process: Process;
  property?: Property;
}) {
  const { model } = usePrototype();
  const data = useData();
  const pending = data.pending.filter(
    (item) => item.processId === process.id && !item.resolved,
  ).length;
  const latest = [...process.movements].sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0];
  return (
    <Card onPress={() => go(`/processo/${process.id}`)}>
      <Row style={{ justifyContent: "space-between" }}>
        <Eyebrow>PROTOCOLO {process.protocol}</Eyebrow>
        <Icon name="arrow-up-right" size={18} />
      </Row>
      <Title>{process.type}</Title>
      <Copy muted>{property?.name}</Copy>
      <StatusBadge
        label={process.status}
        tone={process.status.includes("pendente") ? "warning" : "info"}
      />
      {model !== "original" && (
        <>
          <Copy small muted>
            Última atualização: {date(latest?.date ?? process.openedAt)}
          </Copy>
          <Copy small>
            {pending
              ? `${pending} pendência${pending > 1 ? "s" : ""} de envio`
              : "Nenhuma pendência de envio"}
          </Copy>
          <Row style={{ gap: 5 }}>
            {processStages.map((stage, index) => (
              <View
                key={stage}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor:
                    index <= process.stage ? colors.primary : colors.border,
                }}
              />
            ))}
          </Row>
          <Copy small muted>
            Etapa {process.stage + 1} de {processStages.length} ·{" "}
            {processStages[process.stage]}
          </Copy>
        </>
      )}
    </Card>
  );
}
export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card onPress={() => go(`/imovel/${property.id}`)}>
      <Row>
        <View
          style={{
            padding: 13,
            backgroundColor: colors.primarySoft,
            borderRadius: 12,
          }}
        >
          <Icon name="map" size={25} />
        </View>
        <View style={{ flex: 1 }}>
          <Title>{property.name}</Title>
          <Copy small muted>
            {property.region} • {property.area.toLocaleString("pt-BR")} ha
          </Copy>
        </View>
        <Icon name="chevron-right" size={18} />
      </Row>
      <StatusBadge
        label={property.status}
        tone={property.status.includes("pendente") ? "warning" : "info"}
      />
    </Card>
  );
}
export function PendingCard({
  pending,
  onPress,
}: {
  pending: Pending;
  onPress?: () => void;
}) {
  return (
    <Card
      style={{ backgroundColor: colors.warningSoft, borderColor: "#EDDEBD" }}
    >
      <Row>
        <Icon name="alert-circle" color={colors.warning} />
        <Eyebrow>PRECISA DA SUA ATENÇÃO</Eyebrow>
      </Row>
      <Title>{pending.title}</Title>
      <Copy>{pending.reason}</Copy>
      <Copy small muted>
        Envie até {date(pending.deadline)}
      </Copy>
      <Button
        title="Resolver agora"
        variant="secondary"
        onPress={onPress ?? (() => go("/pendencias"))}
        icon="arrow-right"
      />
    </Card>
  );
}
export function PaymentCard({ payment }: { payment: Payment }) {
  return (
    <Card onPress={() => go(`/boleto/${payment.id}`)}>
      <Row style={{ justifyContent: "space-between" }}>
        <Icon name="file-text" />
        <StatusBadge
          label={payment.status}
          tone={
            payment.status === "Pago"
              ? "success"
              : payment.status === "Vencido"
                ? "danger"
                : "warning"
          }
        />
      </Row>
      <Copy style={{ fontWeight: "600" }}>{payment.description}</Copy>
      <Title>{money(payment.value)}</Title>
      <Row style={{ justifyContent: "space-between" }}>
        <Copy muted small>
          Vencimento: {date(payment.dueAt)}
        </Copy>
        <Icon name="arrow-right" size={18} />
      </Row>
    </Card>
  );
}
export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <Card onPress={() => go(`/edital/${notice.id}`)}>
      <Row style={{ justifyContent: "space-between" }}>
        <Eyebrow>EDITAL {notice.number}</Eyebrow>
        {notice.following && <Icon name="bookmark" size={17} />}
      </Row>
      <Title>{notice.title}</Title>
      <Row>
        <Icon name="map-pin" size={15} />
        <Copy muted small>
          {notice.region}
        </Copy>
      </Row>
      <StatusBadge
        label={
          notice.status === "Em andamento" ? "Inscrições abertas" : "Encerrado"
        }
        tone={notice.status === "Em andamento" ? "success" : "neutral"}
      />
      <Copy muted small>
        {notice.status === "Em andamento"
          ? `${daysUntil(notice.deadline)} dias restantes • Até ${date(notice.deadline)}`
          : `Encerrado em ${date(notice.deadline)}`}
      </Copy>
      {!!notice.relatedPropertyId && (
        <Copy small>Seu imóvel pode estar relacionado a este edital.</Copy>
      )}
    </Card>
  );
}
export function DocumentCard({ document }: { document: CitizenDocument }) {
  return (
    <Card onPress={() => go(`/documento/${document.id}`)}>
      <Row>
        <Icon name="file-text" />
        <View style={{ flex: 1 }}>
          <Copy style={{ fontWeight: "600" }}>{document.name}</Copy>
          <Copy small muted>
            {document.category} • {date(document.issuedAt)}
          </Copy>
        </View>
        <Icon name="chevron-right" size={18} />
      </Row>
      <StatusBadge
        label={document.status}
        tone={
          document.status === "Atualização necessária"
            ? "warning"
            : document.status === "Recebido"
              ? "info"
              : "success"
        }
      />
    </Card>
  );
}
export function AlertCard({
  alert,
  onPress,
}: {
  alert: CitizenAlert;
  onPress: () => void;
}) {
  return (
    <Card
      onPress={onPress}
      style={{
        borderLeftWidth: alert.read ? 1 : 4,
        borderLeftColor: alert.read ? colors.border : colors.primary,
      }}
    >
      <Row style={{ justifyContent: "space-between" }}>
        <Eyebrow>
          {alert.type} • {date(alert.date)}
        </Eyebrow>
        {!alert.read && <StatusBadge label="Novo" tone="info" />}
      </Row>
      <Title>{alert.title}</Title>
      <Copy muted>{alert.description}</Copy>
      <Row>
        <Copy small style={{ color: colors.primary, fontWeight: "600" }}>
          Ver informações
        </Copy>
        <Icon name="arrow-right" size={16} />
      </Row>
    </Card>
  );
}
export function NewsCard({ news }: { news: News }) {
  return (
    <Card onPress={() => go(`/noticia/${news.id}`)}>
      <Eyebrow>
        {news.category} • {date(news.date)}
      </Eyebrow>
      <Title>{news.title}</Title>
      <Row>
        <Copy small style={{ color: colors.primary }}>
          Ler notícia
        </Copy>
        <Icon name="arrow-right" size={16} />
      </Row>
    </Card>
  );
}
