import { AppData, Attachment, RequestDraft } from "../types";
import { DEMO_DATE, uniqueId } from "../utils/format";
export function receiveDocument(
  data: AppData,
  pendingId: string,
  attachment: Attachment,
): AppData {
  const pending = data.pending.find((item) => item.id === pendingId);
  if (!pending || pending.resolved) return data;
  const id = uniqueId();
  return {
    ...data,
    documents: [
      ...data.documents,
      {
        id,
        name: pending.title,
        category: "Do imóvel",
        status: "Recebido",
        issuedAt: DEMO_DATE,
        propertyId: pending.propertyId,
        fileName: attachment.name,
        uri: attachment.uri,
      },
    ],
    pending: data.pending.map((item) =>
      item.id === pendingId
        ? { ...item, resolved: true, documentId: id }
        : item,
    ),
    processes: data.processes.map((item) =>
      item.id === pending.processId
        ? {
            ...item,
            message:
              "Recebemos o documento solicitado. Nossa equipe fará a conferência e avisará sobre os próximos passos.",
            movements: [
              {
                date: DEMO_DATE,
                title: "CAR recebido para conferência",
                description: `${attachment.name} foi anexado. Aguarde a avaliação da equipe.`,
              },
              ...item.movements,
            ],
          }
        : item,
    ),
    alerts: [
      {
        id: uniqueId(),
        title: "Documento enviado com sucesso",
        description: "Seu CAR foi recebido e aguarda conferência pela equipe.",
        date: DEMO_DATE,
        type: "Processo",
        href: `/processo/${pending.processId}`,
        read: false,
      },
      ...data.alerts,
    ],
  };
}
export function submitRequest(
  data: AppData,
  draft: RequestDraft,
): { data: AppData; id: string } {
  if (
    !draft.service ||
    !data.properties.some((item) => item.id === draft.propertyId) ||
    !draft.attachments.length
  )
    throw new Error("Selecione o serviço, o imóvel e pelo menos um documento.");
  const id = uniqueId();
  const protocol = `2026.${String(456 + data.processes.filter((item) => item.id !== "regularizacao" && item.id !== "cadastro").length).padStart(6, "0")}`;
  const documents = draft.attachments
    .filter((item) => !item.documentId)
    .map((item) => ({
      id: uniqueId(),
      name: item.name,
      category: "Requerimentos" as const,
      status: "Recebido" as const,
      issuedAt: DEMO_DATE,
      propertyId: draft.propertyId,
      fileName: item.name,
      uri: item.uri,
    }));
  return {
    id,
    data: {
      ...data,
      draft: null,
      documents: [...data.documents, ...documents],
      processes: [
        {
          id,
          protocol,
          type: draft.service,
          propertyId: draft.propertyId,
          status: "Solicitação recebida",
          openedAt: DEMO_DATE,
          stage: 0,
          message:
            draft.message ||
            "Recebemos seu pedido. Você será avisado quando houver novidades.",
          movements: [
            {
              date: DEMO_DATE,
              title: "Seu pedido foi enviado",
              description: `${draft.attachments.length} documento(s) anexado(s) para conferência.`,
            },
          ],
        },
        ...data.processes,
      ],
      alerts: [
        {
          id: uniqueId(),
          title: "Seu pedido foi enviado",
          description: `Acompanhe o protocolo ${protocol}.`,
          date: DEMO_DATE,
          type: "Processo",
          href: `/processo/${id}`,
          read: false,
        },
        ...data.alerts,
      ],
    },
  };
}
export function followNotice(data: AppData, id: string): AppData {
  const notice = data.notices.find((item) => item.id === id);
  if (!notice) return data;
  return {
    ...data,
    notices: data.notices.map((item) =>
      item.id === id ? { ...item, following: !item.following } : item,
    ),
    alerts: notice.following
      ? data.alerts
      : [
          {
            id: uniqueId(),
            title: `Atualização no edital ${notice.number}`,
            description:
              "Acompanhamento ativado. Esta é uma atualização simulada sobre a documentação necessária.",
            date: DEMO_DATE,
            type: "Edital",
            href: `/edital/${id}`,
            read: false,
          },
          ...data.alerts,
        ],
  };
}
