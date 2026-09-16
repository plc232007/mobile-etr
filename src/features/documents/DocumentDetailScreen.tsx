import { useEffect, useState } from "react";
import { Image, Linking, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { AttachmentPicker } from "@/components/AttachmentPicker";
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
import { useCitizen, useData } from "@/hooks/useCitizen";
import { exportPdf, shareAttachment, shareText } from "@/services/files";
import * as Sharing from "expo-sharing";
import { resolveAttachment } from "@/services/attachmentStorage";
import { date, DEMO_DATE } from "@/utils/format";
export default function DocumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useData();
  const { update, notify } = useCitizen();
  const [replace, setReplace] = useState(false);
  const [preview, setPreview] = useState(false);
  const item = data.documents.find((p) => p.id === id);
  const [resolvedUri, setResolvedUri] = useState<string>();
  useEffect(() => {
    let active = true;
    let url: string | undefined;
    setResolvedUri(undefined);
    if (item?.uri)
      void resolveAttachment(item.uri)
        .then((value) => {
          url = value;
          if (active) setResolvedUri(value);
          else if (value.startsWith("blob:")) URL.revokeObjectURL(value);
        })
        .catch(() =>
          notify(
            "O arquivo não está disponível neste aparelho. Envie uma nova versão.",
          ),
        );
    return () => {
      active = false;
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    };
  }, [item?.uri, notify]);
  if (!item)
    return (
      <Screen title="Documento">
        <EmptyState
          title="Documento não encontrado"
          description="Consulte sua carteira de documentos."
        />
      </Screen>
    );
  const lines = [
    item.name,
    `Categoria: ${item.category}`,
    `Situação: ${item.status}`,
    `Data: ${date(item.issuedAt)}`,
  ];
  const perform = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
    } catch {
      notify("Não foi possível abrir o documento. Tente novamente.");
    }
  };
  const view = async () => {
    if (item.uri && !resolvedUri) {
      notify("Aguarde o carregamento do arquivo.");
      return;
    }
    if (!item.uri) {
      setPreview(!preview);
      return;
    }
    if (/\.(jpg|jpeg|png|webp)$/i.test(item.fileName || "")) {
      setPreview(!preview);
      return;
    }
    if (Platform.OS === "web") await Linking.openURL(resolvedUri!);
    else if (await Sharing.isAvailableAsync())
      await Sharing.shareAsync(resolvedUri!);
    else throw new Error("Sem visualizador");
  };
  const download = async () => {
    if (item.uri && !resolvedUri) {
      notify("Aguarde o carregamento do arquivo.");
      return;
    }
    if (!item.uri) {
      await exportPdf(item.name, lines);
      return;
    }
    if (Platform.OS === "web") {
      const link = document.createElement("a");
      link.href = resolvedUri!;
      link.download = item.fileName || "documento";
      link.click();
    } else await Sharing.shareAsync(resolvedUri!);
  };
  return (
    <Screen title="Seu documento" subtitle={item.category}>
      <Card>
        <Title>{item.name}</Title>
        <StatusBadge
          label={item.status}
          tone={
            item.status === "Atualização necessária"
              ? "warning"
              : item.status === "Recebido"
                ? "info"
                : "success"
          }
        />
        <Copy muted>Registrado em {date(item.issuedAt)}</Copy>
        <Copy small muted>
          {item.fileName || "Documento de demonstração"}
        </Copy>
      </Card>
      {item.status === "Recebido" && (
        <InfoCard
          title="Recebido para conferência"
          description="O envio foi registrado. A validade será conferida pela equipe."
        />
      )}
      <Button
        title="Visualizar"
        icon="eye"
        onPress={() => void perform(view)}
      />
      {preview && (
        <Card>
          {item.uri ? (
            <Image
              source={{ uri: resolvedUri }}
              accessibilityLabel={`Prévia de ${item.name}`}
              style={{ width: "100%", height: 350, resizeMode: "contain" }}
            />
          ) : (
            <>
              <Copy muted small>
                ETR • DOCUMENTO DE DEMONSTRAÇÃO
              </Copy>
              <Title>{item.name}</Title>
              {lines.slice(1).map((line) => (
                <Copy key={line}>{line}</Copy>
              ))}
              <InfoCard
                title="Sem validade oficial"
                description="Esta é uma representação fictícia do documento para demonstração."
              />
            </>
          )}
        </Card>
      )}
      <Button
        title="Baixar documento"
        icon="download"
        variant="secondary"
        onPress={() => void perform(download)}
      />
      <Button
        title="Compartilhar documento"
        icon="share-2"
        variant="secondary"
        onPress={() =>
          void perform(async () => {
            if (item.uri) {
              if (!resolvedUri) {
                notify("Aguarde o carregamento do arquivo.");
                return;
              }
              notify(
                await shareAttachment(resolvedUri, item.fileName || item.name),
              );
            } else
              notify(
                await shareText(
                  item.name,
                  `DEMONSTRAÇÃO — SEM VALIDADE\n${lines.join("\n")}`,
                ),
              );
          })
        }
      />
      <Button
        title="Substituir documento"
        icon="refresh-cw"
        variant="ghost"
        onPress={() => setReplace(!replace)}
      />
      {replace && (
        <Card>
          <Title>Selecione a nova versão</Title>
          <AttachmentPicker
            onSelect={(attachment) => {
              update((current) => ({
                ...current,
                documents: current.documents.map((doc) =>
                  doc.id === id
                    ? {
                        ...doc,
                        uri: attachment.uri,
                        fileName: attachment.name,
                        status: "Recebido",
                        issuedAt: DEMO_DATE,
                      }
                    : doc,
                ),
              }));
              setReplace(false);
              setPreview(false);
              notify("Nova versão recebida para conferência.");
            }}
          />
        </Card>
      )}
      <Button
        title="Usar em novo requerimento"
        variant="secondary"
        onPress={() => {
          const draft = data.draft
            ? { ...data.draft, attachments: [...data.draft.attachments] }
            : {
                step: 1,
                service: "",
                propertyId: item.propertyId || "",
                attachments: [],
                message: "",
              };
          if (!draft.attachments.some((a) => a.documentId === id))
            draft.attachments = [
              ...draft.attachments,
              {
                name: item.fileName || item.name,
                uri: item.uri,
                documentId: id,
              },
            ];
          update((current) => ({ ...current, draft: { ...draft } }));
          go("/requerimento");
        }}
      />
      {!item.uri && (
        <Copy small muted>
          Os documentos iniciais são amostras. No navegador, o download abre a
          opção de salvar como PDF.
        </Copy>
      )}
    </Screen>
  );
}
