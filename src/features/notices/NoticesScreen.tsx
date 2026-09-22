import { useState } from "react";
import { Screen } from "@/components/Screen";
import { NoticeCard } from "@/components/cards";
import { EmptyState, Filters, SearchBar } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
export default function NoticesScreen() {
  const data = useData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [order, setOrder] = useState("Prazo mais próximo");
  const items = data.notices
    .filter(
      (item) =>
        `${item.title} ${item.number} ${item.region}`
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (filter === "Todos" ||
          (filter === "Minha região"
            ? !!item.relatedPropertyId
            : filter === "Encerrados"
              ? item.status === "Encerrado"
              : item.status === filter)),
    )
    .sort((a, b) =>
      order === "Prazo mais próximo"
        ? a.deadline.localeCompare(b.deadline)
        : b.deadline.localeCompare(a.deadline),
    );
  return (
    <Screen
      title="Editais"
      subtitle="Oportunidades e próximos passos para sua região."
    >
      <SearchBar
        placeholder="Buscar edital ou região"
        value={search}
        onChangeText={setSearch}
      />
      <Filters
        values={["Todos", "Em andamento", "Encerrados", "Minha região"]}
        value={filter}
        onChange={setFilter}
      />
      <Filters
        values={["Prazo mais próximo", "Prazo mais distante"]}
        value={order}
        onChange={setOrder}
      />
      {items.length ? (
        items.map((item) => <NoticeCard key={item.id} notice={item} />)
      ) : (
        <EmptyState
          title="Nenhum edital encontrado"
          description="Tente outra palavra ou remova os filtros."
          icon="search"
        />
      )}
    </Screen>
  );
}
