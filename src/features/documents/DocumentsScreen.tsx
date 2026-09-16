import { useState } from "react";
import { Screen } from "@/components/Screen";
import { DocumentCard } from "@/components/cards";
import { EmptyState, Filters, SearchBar } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
export default function DocumentsScreen() {
  const data = useData();
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const list = data.documents.filter(
    (item) =>
      (filter === "Todos" || item.category === filter) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Screen
      title="Meus documentos"
      subtitle="Organizados, acessíveis e sempre com você."
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar documento"
      />
      <Filters
        values={[
          "Todos",
          "Pessoais",
          "Do imóvel",
          "Regularização",
          "Certidões",
          "Contratos",
          "Comprovantes",
          "Requerimentos",
        ]}
        value={filter}
        onChange={setFilter}
      />
      {list.length ? (
        list.map((item) => <DocumentCard key={item.id} document={item} />)
      ) : (
        <EmptyState
          title="Nenhum documento encontrado"
          description="Seus documentos aparecerão aqui após o envio. Tente outra categoria."
          icon="folder"
        />
      )}
    </Screen>
  );
}
