import { useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  InfoCard,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { exportPdf, shareText } from "@/services/files";
import { date, money } from "@/utils/format";
const code = "00000.00000 00000.000000 00000.000000 0 00000000000000";
export default function PaymentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useData();
  const { notify } = useCitizen();
  const item = data.payments.find((p) => p.id === id);
  if (!item)
    return (
      <Screen title="Boleto">
        <EmptyState
          title="Boleto não encontrado"
          description="Volte à lista para selecionar uma parcela."
        />
      </Screen>
    );
  const property = data.properties.find((p) => p.id === item.propertyId);
  const lines = [
    item.description,
    property?.name || "",
    money(item.value),
    `Vencimento: ${date(item.dueAt)}`,
    `Situação: ${item.status}`,
    `Código fictício: ${code}`,
  ];
  const action = async (fn: () => Promise<unknown>, message?: string) => {
    try {
      const result = await fn();
      if (message || typeof result === "string")
        notify(message || (result as string));
    } catch {
      notify("Não foi possível concluir. Tente novamente.");
    }
  };
  return (
    <Screen
      title={
        item.status === "Pago"
          ? "Comprovante de pagamento"
          : "Detalhe do boleto"
      }
      subtitle={item.description}
    >
      <Card>
        <StatusBadge
          label={item.status}
          tone={
            item.status === "Vencido"
              ? "danger"
              : item.status === "Pago"
                ? "success"
                : "warning"
          }
        />
        <Eyebrow>VALOR DA PARCELA</Eyebrow>
        <Title large>{money(item.value)}</Title>
        <Copy>Vencimento: {date(item.dueAt)}</Copy>
        {!!item.paidAt && <Copy>Pago em {date(item.paidAt)}</Copy>}
        <Copy muted>{property?.name}</Copy>
      </Card>
      {item.status === "Vencido" && (
        <InfoCard
          tone="warning"
          title="Esta parcela venceu"
          description="Entre em contato com a equipe para verificar a atualização do valor. O valor apresentado é apenas demonstrativo."
        />
      )}
      <InfoCard
        title="Boleto de demonstração"
        description="Este código é fictício e não pode ser pago. Nenhuma cobrança será gerada."
      />
      {item.status !== "Pago" && (
        <Card>
          <Eyebrow>LINHA DIGITÁVEL FICTÍCIA</Eyebrow>
          <Copy style={{ letterSpacing: 1 }}>{code}</Copy>
          <Button
            title="Copiar código"
            icon="copy"
            variant="secondary"
            onPress={() =>
              void action(
                () => Clipboard.setStringAsync(code),
                "Código de demonstração copiado.",
              )
            }
          />
        </Card>
      )}
      <Button
        title={item.status === "Pago" ? "Gerar comprovante PDF" : "Gerar PDF"}
        icon="download"
        onPress={() =>
          void action(() => exportPdf("Boleto ilustrativo", lines))
        }
      />
      <Button
        title="Compartilhar"
        variant="secondary"
        icon="share-2"
        onPress={() =>
          void action(() =>
            shareText(
              "Boleto ETR — Demonstração",
              `SEM VALIDADE — NÃO PAGAR\n${lines.join("\n")}`,
            ),
          )
        }
      />
      <Copy muted small>
        No navegador, use “Salvar como PDF” na janela de impressão.
      </Copy>
      <InfoCard
        title="PIX em uma próxima versão"
        description="O pagamento por PIX ainda não está disponível."
      />
      {item.status === "Vencido" && (
        <Button
          title="Falar com atendimento"
          variant="ghost"
          onPress={() => go("/atendimento")}
        />
      )}
    </Screen>
  );
}
