import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Card,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  InfoCard,
  MenuItem,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { DocumentCard, PendingCard } from "@/components/cards";
import { Timeline } from "@/components/Timeline";
import { useData } from "@/hooks/useCitizen";
import { date } from "@/utils/format";
export default function ProcessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useData();
  const process = data.processes.find((item) => item.id === id);
  if (!process)
    return (
      <Screen title="Processo">
        <EmptyState
          title="Processo não encontrado"
          description="Confira seus processos disponíveis."
          action="Ver processos"
          onPress={() => go("/processos")}
        />
      </Screen>
    );
  const property = data.properties.find(
    (item) => item.id === process.propertyId,
  );
  const pending = data.pending.filter(
    (item) => item.processId === id && !item.resolved,
  );
  const documents = data.documents.filter(
    (item) => item.propertyId === process.propertyId,
  );
  return (
    <Screen title={process.type} subtitle={`Protocolo ${process.protocol}`}>
      <Card>
        <StatusBadge label={process.status} tone="info" />
        <Title>{property?.name}</Title>
        <Copy small muted>
          Aberto em {date(process.openedAt)}
        </Copy>
        <MenuItem
          title="Ver informações do imóvel"
          icon="map-pin"
          href={`/imovel/${process.propertyId}`}
        />
      </Card>
      <SectionHeader title="Seu andamento" />
      <Card>
        <Timeline
          current={process.stage}
          dates={[
            process.openedAt,
            process.movements.find(
              (item) => item.title === "Documentação inicial conferida",
            )?.date,
            process.movements.find(
              (item) => item.title === "Análise técnica iniciada",
            )?.date,
          ]}
        />
      </Card>
      {pending.map((item) => (
        <PendingCard key={item.id} pending={item} />
      ))}
      {!pending.length && (
        <InfoCard
          tone="success"
          title="Nenhuma pendência de envio"
          description="A equipe avisará caso precise de mais alguma informação."
        />
      )}
      <SectionHeader title="Mensagem da equipe" />
      <InfoCard
        title="Estamos acompanhando seu pedido"
        description={process.message}
        icon="message-circle"
      />
      <SectionHeader title="Últimas movimentações" />
      <Card>
        {process.movements.map((item, index) => (
          <View
            key={`${item.title}-${index}`}
            style={{ gap: 5, paddingBottom: 12 }}
          >
            <Eyebrow>{date(item.date)}</Eyebrow>
            <Copy style={{ fontWeight: "600" }}>{item.title}</Copy>
            <Copy muted small>
              {item.description}
            </Copy>
          </View>
        ))}
      </Card>
      <SectionHeader title="Documentos do imóvel" />
      {documents.map((item) => (
        <DocumentCard key={item.id} document={item} />
      ))}
      {!documents.length && (
        <Copy muted>Nenhum documento vinculado ainda.</Copy>
      )}
      <MenuItem
        title="Preciso de ajuda com este processo"
        icon="help-circle"
        href="/atendimento"
      />
    </Screen>
  );
}
