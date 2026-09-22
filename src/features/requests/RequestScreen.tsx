import { useRef, useState } from "react";
import { View } from "react-native";
import { Screen } from "@/components/Screen";
import { AttachmentPicker } from "@/components/AttachmentPicker";
import { ProgressSteps } from "@/components/Timeline";
import {
  Button,
  Card,
  Choice,
  Copy,
  EmptyState,
  Field,
  go,
  Icon,
  InfoCard,
  Row,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { submitRequest } from "@/services/transitions";
import { RequestDraft } from "@/types";
const services = [
  "Regularização fundiária",
  "Atualização cadastral",
  "Solicitação de documento",
  "Outros",
];
export default function RequestScreen() {
  const data = useData();
  const { update, notify } = useCitizen();
  const [draft, setDraft] = useState<RequestDraft>(
    data.draft ?? {
      step: 1,
      service: "",
      propertyId: "",
      attachments: [],
      message: "",
    },
  );
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState("");
  const [attempted, setAttempted] = useState(false);
  const submitted = useRef(false);
  const change = (patch: Partial<RequestDraft>) => {
    setAttempted(false);
    const next = { ...draft, ...patch };
    setDraft(next);
    update((current) => ({ ...current, draft: next }));
  };
  const process = data.processes.find((item) => item.id === result);
  if (result)
    return (
      <Screen title="Pedido enviado">
        <EmptyState
          title="Requerimento enviado!"
          description={`Protocolo ${process?.protocol}. Você será notificado quando houver atualizações.`}
          action="Ver requerimento"
          onPress={() => go(`/processo/${result}`)}
        />
        <Button
          title="Voltar ao início"
          variant="secondary"
          onPress={() => go("/")}
        />
      </Screen>
    );
  const valid =
    draft.step === 1
      ? !!draft.service
      : draft.step === 2
        ? !!draft.propertyId
        : draft.step === 3
          ? draft.attachments.length > 0
          : true;
  const send = () => {
    if (submitted.current) return;
    submitted.current = true;
    try {
      const response = submitRequest(data, draft);
      update(() => response.data);
      setResult(response.id);
    } catch (error) {
      submitted.current = false;
      notify(
        error instanceof Error ? error.message : "Não foi possível enviar.",
      );
    }
  };
  return (
    <Screen
      title="Novo requerimento"
      subtitle="Um passo de cada vez. Estamos com você."
    >
      <ProgressSteps current={draft.step} />
      {draft.step === 1 && (
        <>
          <Title>Qual serviço você deseja solicitar?</Title>
          <Copy muted small>
            Obrigatório: escolha um tipo de requerimento.
          </Copy>
          {services.map((service) => (
            <Choice
              key={service}
              title={service}
              selected={draft.service === service}
              onPress={() => change({ service })}
            />
          ))}
        </>
      )}
      {draft.step === 2 && (
        <>
          <Title>Selecione o imóvel</Title>
          <Copy muted>Qual imóvel está relacionado ao seu pedido?</Copy>
          <Copy muted small>
            Obrigatório: selecione o imóvel.
          </Copy>
          {data.properties.map((item) => (
            <Choice
              key={item.id}
              title={item.name}
              description={item.region}
              selected={draft.propertyId === item.id}
              onPress={() => change({ propertyId: item.id })}
            />
          ))}
          {!data.properties.length && (
            <EmptyState
              title="Nenhum imóvel vinculado"
              description="Entre em contato com a ETR para receber orientação. Seu rascunho pode ser salvo."
              action="Pedir orientação"
              onPress={() => go("/atendimento")}
            />
          )}
        </>
      )}
      {draft.step === 3 && (
        <>
          <Title>Vamos reunir os documentos</Title>
          <Copy muted small>
            Obrigatório nesta demonstração: adicione pelo menos um documento.
          </Copy>
          <InfoCard
            title="Documentos de apoio"
            description="Para regularização: identificação, comprovante de ocupação e CAR. Neste protótipo, anexe pelo menos um arquivo para experimentar o envio."
          />
          <AttachmentPicker
            onSelect={(attachment) => {
              if (
                draft.attachments.some((item) => item.name === attachment.name)
              ) {
                notify("Este documento já foi adicionado.");
                return;
              }
              change({ attachments: [...draft.attachments, attachment] });
            }}
          />
          {draft.attachments.map((item, index) => (
            <Card key={`${item.name}-${index}`}>
              <Row>
                <Icon name="check-circle" />
                <Copy style={{ flex: 1 }}>{item.name}</Copy>
              </Row>
              <Button
                title={`Remover ${item.name}`}
                variant="ghost"
                onPress={() =>
                  change({
                    attachments: draft.attachments.filter(
                      (_, i) => i !== index,
                    ),
                  })
                }
              />
            </Card>
          ))}
        </>
      )}
      {draft.step === 4 && (
        <>
          <Title>Quer nos contar mais alguma coisa?</Title>
          <Copy muted>
            Esta etapa é opcional. Use este espaço para explicar o que você
            precisa.
          </Copy>
          <Field
            label="Mensagem para a equipe"
            placeholder="Escreva aqui, se desejar..."
            value={draft.message}
            onChangeText={(message) => change({ message })}
            multiline
            maxLength={1000}
          />
          <Copy small muted>
            {draft.message.length}/1.000 caracteres
          </Copy>
        </>
      )}
      {draft.step === 5 && (
        <>
          <Title>Confira seu pedido</Title>
          <Card>
            <Copy muted small>
              SERVIÇO
            </Copy>
            <Copy style={{ fontWeight: "600" }}>{draft.service}</Copy>
            <Copy muted small>
              IMÓVEL
            </Copy>
            <Copy>
              {
                data.properties.find((item) => item.id === draft.propertyId)
                  ?.name
              }
            </Copy>
            <Copy muted small>
              DOCUMENTOS
            </Copy>
            {draft.attachments.map((item) => (
              <Row key={item.name}>
                <Icon name="check" size={16} />
                <Copy small>{item.name}</Copy>
              </Row>
            ))}
            {!!draft.message && (
              <>
                <Copy muted small>
                  SUA MENSAGEM
                </Copy>
                <Copy>{draft.message}</Copy>
              </>
            )}
          </Card>
          <Choice
            title="Conferi as informações do pedido"
            description="Este envio será registrado somente na demonstração."
            selected={confirmed}
            onPress={() => setConfirmed(!confirmed)}
          />
        </>
      )}
      <View style={{ gap: 8 }}>
        {attempted && !valid && (
          <Copy style={{ color: "#AD3434" }}>
            {draft.step === 1
              ? "Selecione o tipo de requerimento para continuar."
              : draft.step === 2
                ? "Selecione um imóvel para continuar."
                : "Adicione pelo menos um documento para continuar."}
          </Copy>
        )}
        {draft.step < 5 ? (
          <Button
            title="Continuar"
            icon="arrow-right"
            onPress={() =>
              valid ? change({ step: draft.step + 1 }) : setAttempted(true)
            }
          />
        ) : (
          <Button
            title="Confirmar e enviar"
            icon="send"
            disabled={!confirmed}
            onPress={send}
          />
        )}
        {draft.step > 1 && (
          <Button
            title="Voltar uma etapa"
            variant="secondary"
            onPress={() => change({ step: draft.step - 1 })}
          />
        )}
        <Button
          title="Salvar rascunho e sair"
          variant="ghost"
          icon="save"
          onPress={() => {
            update((current) => ({ ...current, draft }));
            notify("Rascunho salvo. Continue quando quiser.");
            go("/servicos");
          }}
        />
      </View>
    </Screen>
  );
}
