import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  go,
  InfoCard,
  StatusBadge,
  Title,
} from "@/components/ui";
import { AttachmentPicker } from "@/components/AttachmentPicker";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { receiveDocument } from "@/services/transitions";
import { Attachment } from "@/types";
import { date } from "@/utils/format";
export default function PendingScreen() {
  const data = useData();
  const { propertyId } = useLocalSearchParams<{ propertyId?: string }>();
  const related = data.pending.filter(
    (item) => !propertyId || item.propertyId === propertyId,
  );
  const process = data.processes.find(
    (item) => !propertyId || item.propertyId === propertyId,
  );
  const { update, notify } = useCitizen();
  const [selected, setSelected] = useState<Record<string, Attachment>>({});
  const items = related.filter((item) => !item.resolved);
  return (
    <Screen
      title="Pendências"
      subtitle={
        items.length
          ? `Você possui ${items.length} item para resolver. Vamos ajudar.`
          : "Seus envios estão em dia."
      }
    >
      {items.map((item) => (
        <Card key={item.id}>
          <StatusBadge
            label={`Envie até ${date(item.deadline)}`}
            tone="warning"
          />
          <Title>{item.title}</Title>
          <Copy>{item.reason}</Copy>
          <InfoCard title="Como resolver" description={item.instruction} />
          <AttachmentPicker
            onSelect={(file) => setSelected({ ...selected, [item.id]: file })}
          />
          {selected[item.id] && (
            <InfoCard
              title="Arquivo selecionado"
              description={selected[item.id].name}
              tone="success"
            />
          )}
          <Button
            title="Enviar documento"
            icon="send"
            disabled={!selected[item.id]}
            onPress={() => {
              update((current) =>
                receiveDocument(current, item.id, selected[item.id]),
              );
              notify("Documento recebido! A equipe fará a conferência.");
            }}
          />
        </Card>
      ))}
      {!items.length && (
        <>
          <EmptyState
            description="Você não possui nenhuma pendência de envio no momento. Os documentos recebidos serão conferidos pela equipe."
            action={process ? "Ver processo atualizado" : "Ver processos"}
            onPress={() =>
              go(process ? `/processo/${process.id}` : "/processos")
            }
          />
          {related
            .filter((item) => item.resolved)
            .map((item) => (
              <Card key={item.id}>
                <StatusBadge label="Recebido para conferência" tone="info" />
                <Copy>{item.title}</Copy>
                <Button
                  title="Visualizar documento"
                  variant="secondary"
                  onPress={() => go(`/documento/${item.documentId}`)}
                />
              </Card>
            ))}
        </>
      )}
    </Screen>
  );
}
