import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform, Share } from "react-native";
import { Attachment } from "@/types";
import { persistAttachment } from "./attachmentStorage";
export async function pickDocument(): Promise<Attachment | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/pdf", "image/*"],
    copyToCacheDirectory: true,
  });
  if (result.canceled) return null;
  const file = result.assets[0];
  if (file.size && file.size > 15 * 1024 * 1024)
    throw new Error("Escolha um arquivo de até 15 MB.");
  return { name: file.name, uri: await persistAttachment(file.uri, file.name) };
}
export async function takePhoto(): Promise<Attachment | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted)
    throw new Error(
      "Permita o uso da câmera ou escolha um arquivo do aparelho.",
    );
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 0.65,
  });
  if (result.canceled) return null;
  const asset = result.assets[0];
  if (asset.fileSize && asset.fileSize > 15 * 1024 * 1024)
    throw new Error("Escolha uma foto de até 15 MB.");
  const name = asset.fileName || "foto-documento.jpg";
  return { name, uri: await persistAttachment(asset.uri, name) };
}
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export async function exportPdf(title: string, lines: string[]) {
  const html = `<html lang="pt-BR"><head><meta charset="utf-8" /></head><body style="font-family:Arial;padding:40px;color:#174B39"><h1>ETR • DEMONSTRAÇÃO</h1><h2>${escapeHtml(title)}</h2><p>DOCUMENTO FICTÍCIO — SEM VALIDADE OFICIAL — NÃO PAGAR</p>${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}<hr/><p>Protótipo de regularização rural • 15/09/2026</p></body></html>`;
  if (Platform.OS === "web") {
    const preview = window.open("", "_blank");
    if (!preview)
      throw new Error(
        "Permita a abertura da janela do documento no navegador.",
      );
    preview.document.open();
    preview.document.write(html);
    preview.document.close();
    preview.document.title = title;
    preview.focus();
    setTimeout(() => {
      if (!preview.closed) preview.print();
    }, 250);
  } else {
    const result = await Print.printToFileAsync({ html });
    if (await Sharing.isAvailableAsync())
      await Sharing.shareAsync(result.uri, {
        mimeType: "application/pdf",
        dialogTitle: title,
      });
    else
      throw new Error(
        "O compartilhamento de arquivos não está disponível neste aparelho.",
      );
  }
}
export async function shareText(title: string, message: string) {
  if (Platform.OS === "web") {
    if (navigator.share) await navigator.share({ title, text: message });
    else {
      await navigator.clipboard.writeText(message);
      return "Texto copiado para compartilhar.";
    }
  } else await Share.share({ title, message });
  return "Compartilhamento aberto.";
}

export async function shareAttachment(uri: string, name: string) {
  if (Platform.OS !== "web") {
    await Sharing.shareAsync(uri);
    return "Compartilhamento aberto.";
  }
  const blob = await (await fetch(uri)).blob();
  const file = new File([blob], name, {
    type: blob.type || "application/octet-stream",
  });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: name });
    return "Compartilhamento aberto.";
  }
  const link = document.createElement("a");
  link.href = uri;
  link.download = name;
  link.click();
  return "Arquivo baixado. Você pode anexá-lo na sua mensagem.";
}
