import { useRef, useState } from "react";
import { View } from "react-native";
import { Screen } from "@/components/Screen";
import { ProgressSteps } from "@/components/Timeline";
import {
  Button,
  Card,
  Choice,
  Copy,
  EmptyState,
  go,
  InfoCard,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { date, DEMO_DATE, uniqueId } from "@/utils/format";
export default function AppointmentScreen() {
  const data = useData();
  const { update, notify } = useCitizen();
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [unit, setUnit] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const locked = useRef(false);
  const valid =
    step === 1
      ? !!reason
      : step === 2
        ? !!unit
        : step === 3
          ? !!day
          : step === 4
            ? !!time
            : true;
  const confirm = () => {
    if (locked.current) return;
    if (
      data.appointments.some(
        (item) => item.date === day && item.time === time && item.unit === unit,
      )
    ) {
      notify("Você já possui um agendamento nesta data e horário.");
      return;
    }
    locked.current = true;
    const id = `AG-${101 + data.appointments.length}`;
    update((current) => ({
      ...current,
      appointments: [
        ...current.appointments,
        { id, reason, unit, date: day, time },
      ],
      alerts: [
        {
          id: uniqueId(),
          title: "Atendimento agendado",
          description: `${date(day)} às ${time} • ${unit}. Protocolo ${id}.`,
          date: DEMO_DATE,
          type: "Atendimento",
          href: "/agendamento",
          read: false,
        },
        ...current.alerts,
      ],
    }));
    setResult(id);
  };
  if (result)
    return (
      <Screen title="Tudo combinado">
        <EmptyState
          title="Atendimento agendado!"
          description={`${date(day)} às ${time}, ${unit}. Protocolo ${result}. Leve sua identificação e os documentos do imóvel. Agendamento fictício.`}
          action="Ver meus atendimentos"
          onPress={() => go("/atendimento")}
        />
      </Screen>
    );
  return (
    <Screen
      title="Agendar atendimento"
      subtitle="Reserve um momento para conversar com a gente."
    >
      <ProgressSteps current={step} />
      {step === 1 && (
        <>
          <Title>Qual é o motivo?</Title>
          {[
            "Regularização do imóvel",
            "Dúvidas sobre documentos",
            "Boletos e parcelas",
            "Outro assunto",
          ].map((item) => (
            <Choice
              key={item}
              title={item}
              selected={reason === item}
              onPress={() => setReason(item)}
            />
          ))}
        </>
      )}
      {step === 2 && (
        <>
          <Title>Onde prefere ser atendido?</Title>
          {[
            "Unidade Sobradinho (fictícia)",
            "Unidade Planaltina (fictícia)",
            "Atendimento por vídeo (simulado)",
          ].map((item) => (
            <Choice
              key={item}
              title={item}
              selected={unit === item}
              onPress={() => setUnit(item)}
            />
          ))}
        </>
      )}
      {step === 3 && (
        <>
          <Title>Escolha uma data</Title>
          <Copy muted>Setembro de 2026 • Datas de demonstração</Copy>
          <View style={{ gap: 10 }}>
            {[
              "2026-09-16",
              "2026-09-17",
              "2026-09-18",
              "2026-09-21",
              "2026-09-22",
            ].map((item) => (
              <Choice
                key={item}
                title={date(item)}
                description={new Date(`${item}T12:00:00`).toLocaleDateString(
                  "pt-BR",
                  { weekday: "long" },
                )}
                selected={day === item}
                onPress={() => {
                  setDay(item);
                  setTime("");
                }}
              />
            ))}
          </View>
        </>
      )}
      {step === 4 && (
        <>
          <Title>Qual horário fica melhor?</Title>
          {["09:00", "10:30", "14:00", "15:30"].map((item) => (
            <Choice
              key={item}
              title={item}
              selected={time === item}
              onPress={() => setTime(item)}
            />
          ))}
        </>
      )}
      {step === 5 && (
        <>
          <Title>Confira seu agendamento</Title>
          <Card>
            <Copy>{reason}</Copy>
            <Copy>{unit}</Copy>
            <Title>
              {date(day)} às {time}
            </Title>
            <Copy muted>{data.user.name}</Copy>
          </Card>
          <InfoCard
            title="Um encontro de demonstração"
            description="A reserva será salva somente neste aplicativo. Nenhum horário real será reservado."
          />
        </>
      )}
      <Button
        title={step === 5 ? "Confirmar agendamento" : "Continuar"}
        disabled={!valid}
        onPress={() => (step === 5 ? confirm() : setStep(step + 1))}
      />
      {step > 1 && (
        <Button
          title="Voltar uma etapa"
          variant="secondary"
          onPress={() => setStep(step - 1)}
        />
      )}
    </Screen>
  );
}
