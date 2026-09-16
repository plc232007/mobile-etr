import { Screen } from "@/components/Screen";
import { PropertyCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
export default function PropertiesScreen() {
  const data = useData();
  return (
    <Screen title="Meus imóveis" subtitle="Sua história tem lugar aqui.">
      {data.properties.map((item) => (
        <PropertyCard key={item.id} property={item} />
      ))}
      {!data.properties.length && (
        <EmptyState
          title="Nenhum imóvel vinculado"
          description="Converse com a equipe para vincular seu imóvel."
          icon="map"
        />
      )}
    </Screen>
  );
}
