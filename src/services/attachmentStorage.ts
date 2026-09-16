import { Platform } from "react-native";
import { File, Paths } from "expo-file-system";
import { uniqueId } from "@/utils/format";
// Files stay separate from the JSON repository; this keeps large PDFs out of localStorage.
async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("etr-demo-attachments", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function persistAttachment(
  uri: string,
  name: string,
): Promise<string> {
  if (Platform.OS !== "web") {
    const source = new File(uri);
    const target = new File(
      Paths.document,
      `etr-${uniqueId()}-${name.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
    );
    source.copy(target);
    return target.uri;
  }
  const blob = await (await fetch(uri)).blob();
  const key = uniqueId();
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("files", "readwrite");
      transaction.objectStore("files").put(blob, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
  return `etr-file:${key}`;
}
export async function resolveAttachment(uri: string): Promise<string> {
  if (!uri.startsWith("etr-file:")) return uri;
  const db = await openDatabase();
  try {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const request = db
        .transaction("files")
        .objectStore("files")
        .get(uri.slice(9));
      request.onsuccess = () =>
        request.result
          ? resolve(request.result)
          : reject(new Error("Arquivo não encontrado neste aparelho."));
      request.onerror = () => reject(request.error);
    });
    return URL.createObjectURL(blob);
  } finally {
    db.close();
  }
}
export async function clearAttachments(): Promise<void> {
  if (Platform.OS !== "web") {
    for (const item of Paths.document.list())
      if (item.name.startsWith("etr-")) item.delete();
    return;
  }
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("files", "readwrite");
      transaction.objectStore("files").clear();
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}
