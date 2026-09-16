import { useState } from "react";
import { Screen } from "@/components/Screen";
import { AlertCard } from "@/components/cards";
import { Button, EmptyState, Filters, go } from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
export default function AlertsScreen() {
  const data = useData();
  const { update, notify } = useCitizen();
  const [filter, setFilter] = useState("Todos");
  const list = data.alerts.filter(
    (item) =>
      filter === "Todos" ||
      (filter === "Não lidos" ? !item.read : item.type === filter),
  );
  return (
    <Screen
      title="Seus alertas"
      subtitle="O que importa para você, em um só lugar."
      back={false}
    >
      <Filters
        values={[
          "Todos",
          "Não lidos",
          "Processo",
          "Pendência",
          "Boleto",
          "Edital",
          "Atendimento",
        ]}
        value={filter}
        onChange={setFilter}
      />
      <Button
        title="Marcar todos como lidos"
        variant="ghost"
        icon="check"
        disabled={!data.alerts.some((item) => !item.read)}
        onPress={() => {
          update((current) => ({
            ...current,
            alerts: current.alerts.map((item) => ({ ...item, read: true })),
          }));
          notify("Todos os alertas foram marcados como lidos.");
        }}
      />
      {list.length ? (
        list.map((item) => (
          <AlertCard
            key={item.id}
            alert={item}
            onPress={() => {
              update((current) => ({
                ...current,
                alerts: current.alerts.map((alert) =>
                  alert.id === item.id ? { ...alert, read: true } : alert,
                ),
              }));
              go(item.href);
            }}
          />
        ))
      ) : (
        <EmptyState
          title="Tudo em dia por aqui"
          description="Não há alertas nesta categoria. As novidades aparecerão aqui."
          icon="bell"
        />
      )}
    </Screen>
  );
}
