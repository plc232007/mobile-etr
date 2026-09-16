import { useState } from "react";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  Field,
  go,
  InfoCard,
  MenuItem,
  SectionHeader,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { date, DEMO_DATE, uniqueId } from "@/utils/format";
const faqs = [
  {
    question: "Como acompanho minha regularização?",
    answer:
      "Abra Processos e selecione seu pedido. A linha do tempo mostra a etapa atual, documentos e mensagens da equipe.",
  },
  {
    question: "O que é o CAR?",
    answer:
      "O Cadastro Ambiental Rural reúne informações ambientais do imóvel rural. Quando solicitado, envie uma cópia legível do recibo de inscrição.",
  },
  {
    question: "Enviar um documento significa aprovação?",
    answer:
      "Não. Primeiro o documento é recebido. A equipe confere as informações e avisa sobre os próximos passos.",
  },
  {
    question: "Posso continuar um pedido depois?",
    answer:
      "Sim. No requerimento, toque em Salvar rascunho e sair. Seu rascunho fica salvo neste aparelho.",
  },
];
export default function SupportScreen() {
  const data = useData();
  const { update, notify } = useCitizen();
  const [chat, setChat] = useState(false);
  const [contact, setContact] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");
  return (
    <Screen
      title="Como podemos ajudar?"
      subtitle="Você não precisa fazer tudo sozinho."
    >
      <Card>
        <Title>Estamos do seu lado</Title>
        <Copy muted>Escolha a melhor forma de seguir com a gente.</Copy>
        <MenuItem
          title="Conversar com a ETR"
          description="Envie uma mensagem de demonstração"
          icon="message-circle"
          onPress={() => setChat(!chat)}
        />
        <MenuItem
          title="Agendar atendimento"
          icon="calendar"
          href="/agendamento"
        />
        <MenuItem
          title="Telefones e endereço"
          icon="map-pin"
          onPress={() => setContact(!contact)}
        />
      </Card>
      {contact && (
        <InfoCard
          title="Unidade de demonstração"
          description="Centro de Atendimento Rural • Brasília — DF. Telefone ilustrativo: (61) 0000-0000. Segunda a sexta, das 8h às 17h. Os canais oficiais devem ser confirmados no site da ETR antes de um atendimento real."
        />
      )}
      {chat && (
        <Card>
          <StatusBadge label="Conversa simulada" tone="info" />
          <Copy>
            Olá, João! Conte como podemos ajudar com seu imóvel ou processo.
          </Copy>
          <Field
            label="Sua mensagem"
            value={message}
            onChangeText={setMessage}
            placeholder="Escreva sua dúvida..."
            multiline
            maxLength={1000}
          />
          <Button
            title="Enviar mensagem"
            icon="send"
            disabled={!message.trim()}
            onPress={() => {
              const id = uniqueId();
              const protocol = `AT-${data.alerts.filter((item) => item.type === "Atendimento").length + 101}`;
              update((current) => ({
                ...current,
                alerts: [
                  {
                    id,
                    title: `Atendimento ${protocol}`,
                    description: `Mensagem recebida: ${message.trim()}. Nossa equipe retornará neste canal (simulação).`,
                    date: DEMO_DATE,
                    type: "Atendimento",
                    href: "/atendimento",
                    read: false,
                  },
                  ...current.alerts,
                ],
              }));
              setTicket(protocol);
              setMessage("");
              notify("Mensagem registrada na demonstração.");
            }}
          />
          {!!ticket && (
            <InfoCard
              tone="success"
              title={`Solicitação ${ticket} recebida`}
              description="Você pode acompanhar o registro abaixo e na central de alertas. Nenhuma mensagem foi enviada à ETR."
            />
          )}
        </Card>
      )}
      <SectionHeader title="Dúvidas frequentes" />
      {faqs.map((item, index) => (
        <Card key={item.question}>
          <MenuItem
            title={item.question}
            icon="help-circle"
            onPress={() => setOpen(open === index ? null : index)}
          />
          {open === index && <Copy>{item.answer}</Copy>}
        </Card>
      ))}
      <SectionHeader title="Seus atendimentos" />
      {!data.appointments.length &&
        !data.alerts.some((item) => item.type === "Atendimento") && (
          <Copy muted>Seus agendamentos e solicitações aparecerão aqui.</Copy>
        )}
      {data.appointments.map((item) => (
        <Card key={item.id}>
          <StatusBadge label="Agendamento confirmado" />
          <Title>{item.reason}</Title>
          <Copy>
            {date(item.date)} às {item.time}
          </Copy>
          <Copy muted>{item.unit}</Copy>
          <Copy small muted>
            Protocolo {item.id}
          </Copy>
        </Card>
      ))}
      {data.alerts
        .filter(
          (item) => item.type === "Atendimento" && item.href === "/atendimento",
        )
        .map((item) => (
          <Card key={item.id}>
            <Title>{item.title}</Title>
            <Copy>{item.description}</Copy>
            <StatusBadge label="Recebido (simulação)" tone="info" />
          </Card>
        ))}
      <Button
        title="Ver central de alertas"
        variant="secondary"
        onPress={() => go("/alertas")}
      />
    </Screen>
  );
}
