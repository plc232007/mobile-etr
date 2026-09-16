import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  go,
  Icon,
  InfoCard,
  Row,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { followNotice } from "@/services/transitions";
import { exportPdf } from "@/services/files";
import { date } from "@/utils/format";
export default function NoticeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useData();
  const { update, notify } = useCitizen();
  const item = data.notices.find((p) => p.id === id);
  if (!item)
    return (
      <Screen title="Edital">
        <EmptyState
          title="Edital não encontrado"
          description="Consulte os editais disponíveis."
        />
      </Screen>
    );
  const car = data.pending.some((p) => p.id === "car" && p.resolved);
  return (
    <Screen title={`Edital ${item.number}`} subtitle={item.region}>
      <Card>
        <StatusBadge
          label={
            item.status === "Em andamento" ? "Inscrições abertas" : "Encerrado"
          }
          tone={item.status === "Em andamento" ? "success" : "neutral"}
        />
        <Title>{item.title}</Title>
        <Copy muted>Prazo: {date(item.deadline)}</Copy>
        <Copy>{item.description}</Copy>
      </Card>
      <SectionHeader title="Documentos necessários" />
      <Card>
        {[
          { title: "Identificação", ready: true },
          { title: "Comprovante de ocupação", ready: true },
          { title: "Cadastro Ambiental Rural — CAR", ready: car },
          { title: "Plano de Utilização (PU) ou DIU", ready: false },
          { title: "Anotação de Responsabilidade Técnica — ART", ready: false },
        ].map((doc) => (
          <Row key={doc.title}>
            <Icon name={doc.ready ? "check-circle" : "circle"} />
            <Copy style={{ flex: 1 }}>{doc.title}</Copy>
          </Row>
        ))}
      </Card>
      <InfoCard
        title="Confira antes de enviar"
        description="A lista é ilustrativa. Os critérios e documentos serão definidos no edital oficial, quando houver integração."
      />
      <SectionHeader title="Etapas do edital" />
      <Card>
        <Copy>1. Conferir os critérios e reunir os documentos</Copy>
        <Copy>2. Enviar o requerimento dentro do prazo</Copy>
        <Copy>3. Acompanhar a análise e as publicações</Copy>
      </Card>
      <Button
        title={item.following ? "Deixar de acompanhar" : "Acompanhar edital"}
        icon={item.following ? "check" : "bell"}
        onPress={() => {
          update((current) => followNotice(current, id));
          notify(
            item.following
              ? "Você deixou de acompanhar este edital."
              : "Edital acompanhado! Uma atualização simulada chegou aos alertas.",
          );
        }}
      />
      {item.status === "Em andamento" && (
        <Button
          title="Iniciar requerimento"
          variant="secondary"
          onPress={() => go("/requerimento")}
        />
      )}
      <Button
        title="Ver PDF do edital (demonstrativo)"
        variant="secondary"
        icon="file-text"
        onPress={() =>
          void exportPdf(`Edital ${item.number} — Exemplo`, [
            item.title,
            item.description,
            `Prazo: ${date(item.deadline)}`,
          ]).catch(() => notify("Não foi possível abrir o PDF."))
        }
      />
      <Copy muted small>
        O documento oficial não está conectado neste protótipo. O PDF é uma
        amostra sem validade.
      </Copy>
    </Screen>
  );
}
