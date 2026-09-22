import { useState } from "react";
import { Screen } from "@/components/Screen";
import {
  Copy,
  EmptyState,
  Filters,
  MenuItem,
  SearchBar,
} from "@/components/ui";
import { usePrototype } from "@/hooks/usePrototype";
import { getServices, matchesService } from "./catalog";

export default function ServiceCatalogScreen() {
  const { geoEnabled } = usePrototype();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const services = getServices(geoEnabled).filter(
    (item) =>
      matchesService(item, query) &&
      (category === "Todos" || category === item.category),
  );
  return (
    <Screen
      title="Serviços ETR"
      subtitle="Encontre o que você precisa fazer."
      back={false}
    >
      <SearchBar
        placeholder="Buscar serviço..."
        value={query}
        onChangeText={setQuery}
      />
      <Filters
        values={["Todos", "Solicitar", "Consultar", "Acompanhar"]}
        value={category}
        onChange={setCategory}
      />
      <Copy muted small>
        {services.length}{" "}
        {services.length === 1 ? "serviço encontrado" : "serviços encontrados"}
      </Copy>
      {services.map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
      {!services.length && (
        <EmptyState
          title="Nenhum serviço encontrado"
          description="Tente buscar por boleto, certidão ou requerimento."
          action="Limpar busca e filtros"
          onPress={() => {
            setQuery("");
            setCategory("Todos");
          }}
        />
      )}
    </Screen>
  );
}
