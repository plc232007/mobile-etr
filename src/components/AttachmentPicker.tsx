import { useState } from "react";
import { View } from "react-native";
import { Attachment } from "@/types";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { pickDocument, takePhoto } from "@/services/files";
import { Button, Card, Copy, MenuItem } from "./ui";
export function AttachmentPicker({
  onSelect,
}: {
  onSelect: (attachment: Attachment) => void;
}) {
  const { notify } = useCitizen();
  const data = useData();
  const [library, setLibrary] = useState(false);
  const [busy, setBusy] = useState(false);
  const select = async (camera: boolean) => {
    setBusy(true);
    try {
      const attachment = await (camera ? takePhoto() : pickDocument());
      if (attachment) onSelect(attachment);
    } catch (error) {
      notify(
        error instanceof Error
          ? error.message
          : "Não foi possível abrir o arquivo.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <View style={{ gap: 10 }}>
      <Button
        title="Escolher arquivo"
        icon="upload"
        variant="secondary"
        loading={busy}
        onPress={() => void select(false)}
      />
      <Button
        title="Tirar foto do documento"
        icon="camera"
        variant="secondary"
        disabled={busy}
        onPress={() => void select(true)}
      />
      <Button
        title="Usar documento salvo"
        icon="folder"
        variant="ghost"
        onPress={() => setLibrary(!library)}
      />
      {library && (
        <Card>
          <Copy style={{ fontWeight: "600" }}>Sua carteira de documentos</Copy>
          {data.documents
            .filter((item) => item.status !== "Atualização necessária")
            .map((item) => (
              <MenuItem
                key={item.id}
                title={item.name}
                description={item.status}
                icon="file-text"
                onPress={() => {
                  onSelect({
                    name: item.fileName || item.name,
                    uri: item.uri,
                    documentId: item.id,
                  });
                  setLibrary(false);
                }}
              />
            ))}
        </Card>
      )}
      <Copy small muted>
        PDF ou imagem de até 15 MB. Use apenas arquivos de teste.
      </Copy>
    </View>
  );
}
