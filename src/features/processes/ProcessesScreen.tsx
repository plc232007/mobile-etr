import { useState } from "react";
import { Screen } from "@/components/Screen";
import { ProcessCard } from "@/components/cards";
import { Button, EmptyState, Filters, go, SearchBar } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";
export default function ProcessesScreen() {
  const data = useData();
  const { model } = usePrototype();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const list = data.processes.filter(
    (item) =>
      `${item.type} ${item.protocol} ${data.properties.find((p) => p.id === item.propertyId)?.name}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "Todos" ||
        (filter === "Com pendências"
          ? data.pending.some((p) => p.processId === item.id && !p.resolved)
          : item.stage === 6)),
  );
  return (
    <Screen
      title={model === "original" ? "Meus processos" : "Minhas solicitações"}
      subtitle="Cada etapa da sua regularização, bem aqui."
      back={false}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por imóvel ou protocolo"
      />
      <Filters
        values={["Todos", "Com pendências", "Concluídos"]}
        value={filter}
        onChange={setFilter}
      />
      {list.length ? (
        list.map((item) => (
          <ProcessCard
            key={item.id}
            process={item}
            property={data.properties.find((p) => p.id === item.propertyId)}
          />
        ))
      ) : (
        <EmptyState
          title="Nenhum processo encontrado"
          description="Seus pedidos aparecerão aqui. Você também pode tentar outra busca."
          icon="layers"
        />
      )}
      <Button
        title="Novo requerimento"
        icon="plus"
        onPress={() => go("/requerimento")}
      />
    </Screen>
  );
}
