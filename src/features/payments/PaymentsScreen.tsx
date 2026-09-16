import { useState } from "react";
import { Screen } from "@/components/Screen";
import { PaymentCard } from "@/components/cards";
import { EmptyState, Filters, InfoCard } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
export default function PaymentsScreen() {
  const data = useData();
  const [filter, setFilter] = useState("Em aberto");
  const list = data.payments.filter(
    (item) =>
      filter === "Todos" ||
      (filter === "Pagos"
        ? item.status === "Pago"
        : filter === "Vencidos"
          ? item.status === "Vencido"
          : item.status === filter),
  );
  return (
    <Screen
      title="Boletos"
      subtitle="Acompanhe as parcelas relacionadas ao seu imóvel."
    >
      <Filters
        values={["Em aberto", "Vencidos", "Pagos", "Todos"]}
        value={filter}
        onChange={setFilter}
      />
      <InfoCard
        title="O que é CDU?"
        description="Concessão de Direito de Uso: contrato que permite o uso do imóvel conforme as condições acordadas com a ETR."
      />
      {list.length ? (
        list.map((item) => <PaymentCard key={item.id} payment={item} />)
      ) : (
        <EmptyState
          description="Nenhum boleto nesta categoria."
          icon="file-text"
        />
      )}
    </Screen>
  );
}
