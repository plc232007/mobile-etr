import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { PropertyMap } from "@/components/Landscape";
import {
  DocumentCard,
  NoticeCard,
  PaymentCard,
  ProcessCard,
} from "@/components/cards";
import {
  Card,
  Copy,
  EmptyState,
  go,
  MenuItem,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";
export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useData();
  const { geoEnabled } = usePrototype();
  const item = data.properties.find((p) => p.id === id);
  if (!item)
    return (
      <Screen title="Imóvel">
        <EmptyState
          title="Imóvel não encontrado"
          description="Selecione um imóvel vinculado ao seu cadastro."
        />
      </Screen>
    );
  return (
    <Screen title={item.name} subtitle={item.region}>
      <Card>
        <StatusBadge label={item.status} tone="info" />
        <Title>{item.area.toLocaleString("pt-BR")} hectares</Title>
        <Copy muted small>
          Área aproximada • {item.identifier}
        </Copy>
        <Copy>Região administrativa: {item.region}</Copy>
      </Card>
      {geoEnabled && (
        <>
          <Card
            onPress={() => go(`/mapa/${id}`)}
            style={{ padding: 0, overflow: "hidden" }}
          >
            <PropertyMap />
          </Card>
          <Copy muted small>
            Mapa ilustrativo • Toque para explorar as informações
          </Copy>
        </>
      )}
      <MenuItem
        title="Monitoramento do imóvel"
        description={
          item.occurrence
            ? "Há uma atualização para conferir"
            : "Nenhuma ocorrência exibida"
        }
        icon="eye"
        href={`/monitoramento/${id}`}
      />
      <SectionHeader title="Processos" />
      {data.processes
        .filter((p) => p.propertyId === id)
        .map((p) => (
          <ProcessCard key={p.id} process={p} property={item} />
        ))}
      <SectionHeader title="Documentos" />
      {data.documents
        .filter((p) => p.propertyId === id)
        .map((p) => (
          <DocumentCard key={p.id} document={p} />
        ))}
      <MenuItem
        title="Ver carteira de documentos"
        icon="folder"
        href="/documentos"
      />
      <SectionHeader title="Boletos" />
      {data.payments
        .filter((p) => p.propertyId === id)
        .map((p) => (
          <PaymentCard key={p.id} payment={p} />
        ))}
      <SectionHeader title="Editais relacionados" />
      {data.notices
        .filter((p) => p.relatedPropertyId === id)
        .map((p) => (
          <NoticeCard key={p.id} notice={p} />
        ))}
    </Screen>
  );
}
