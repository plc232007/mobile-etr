import { useState } from "react";
import { Screen } from "@/components/Screen";
import { DocumentCard } from "@/components/cards";
import {
  Button,
  Card,
  Copy,
  InfoCard,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { exportPdf, shareText } from "@/services/files";
import { DEMO_DATE } from "@/utils/format";
export default function CertificateScreen() {
  const data = useData();
  const { update, notify } = useCitizen();
  const [consulted, setConsulted] = useState(false);
  const [busy, setBusy] = useState(false);
  const certificate = data.documents.filter(
    (item) => item.category === "Certidões",
  );
  const consult = async () => {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setConsulted(true);
    setBusy(false);
    if (!certificate.length)
      update((current) => ({
        ...current,
        documents: [
          ...current.documents,
          {
            id: "certidao-2026",
            name: "Certidão Negativa — Setembro 2026",
            category: "Certidões",
            status: "Válido",
            issuedAt: DEMO_DATE,
          },
        ],
      }));
  };
  return (
    <Screen
      title="Certidão Negativa"
      subtitle="Consulte ou emita sua certidão relacionada à ETR."
    >
      <InfoCard
        title="Consulta simulada"
        description="O resultado é fictício e independente dos boletos da demonstração. Não representa a situação fiscal real do usuário."
      />
      <Card>
        <Copy muted small>
          CPF DO TITULAR
        </Copy>
        <Title>{data.user.cpf}</Title>
        <Copy>{data.user.name}</Copy>
        <Button
          title={consulted ? "Consultar novamente" : "Consultar"}
          loading={busy}
          icon="search"
          onPress={() => void consult()}
        />
      </Card>
      {consulted && (
        <Card>
          <StatusBadge label="Certidão disponível (simulação)" />
          <Title>Seu documento está pronto</Title>
          <Copy>Emitida em 15/09/2026</Copy>
          <Copy>Válida até 15/10/2026</Copy>
          <Button
            title="Visualizar certidão"
            icon="file-text"
            onPress={() =>
              void exportPdf("Certidão Negativa — Amostra", [
                data.user.name,
                data.user.cpf,
                "Emitida em 15/09/2026",
                "Válida até 15/10/2026",
                "Resultado simulado, sem validade oficial.",
              ]).catch(() => notify("Não foi possível abrir a certidão."))
            }
          />
          <Button
            title="Compartilhar certidão"
            variant="secondary"
            icon="share-2"
            onPress={() =>
              void shareText(
                "Certidão — Demonstração",
                "Certidão fictícia de João da Silva. Emitida em 15/09/2026, válida até 15/10/2026. SEM VALIDADE OFICIAL.",
              )
                .then(notify)
                .catch(() => notify("Compartilhamento não concluído."))
            }
          />
        </Card>
      )}
      <SectionHeader title="Histórico de certidões" />
      {certificate.length ? (
        certificate.map((item) => (
          <DocumentCard key={item.id} document={item} />
        ))
      ) : (
        <Copy muted>
          Você ainda não consultou uma certidão. O histórico aparecerá aqui.
        </Copy>
      )}
    </Screen>
  );
}
