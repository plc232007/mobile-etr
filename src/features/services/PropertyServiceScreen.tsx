import { Screen } from "@/components/Screen";
import { Copy, EmptyState, MenuItem } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";

export default function PropertyServiceScreen({
  geo = false,
}: {
  geo?: boolean;
}) {
  const data = useData();
  const { geoEnabled } = usePrototype();
  return (
    <Screen
      title={geo ? "ETR GEO" : "ETR Monitora"}
      subtitle="Escolha o imóvel que deseja consultar."
    >
      {geo && !geoEnabled ? (
        <EmptyState
          title="ETR GEO não habilitado"
          description="Os demais serviços continuam disponíveis."
        />
      ) : (
        <>
          <Copy muted>
            {geo
              ? "Mapa ilustrativo dos imóveis vinculados ao seu cadastro."
              : "Consulte a situação e as informações de acompanhamento do seu imóvel."}
          </Copy>
          {data.properties.map((item) => (
            <MenuItem
              key={item.id}
              title={item.name}
              description={
                geo
                  ? item.region
                  : item.occurrence
                    ? "Há uma atualização para conferir"
                    : "Nenhuma ocorrência exibida"
              }
              icon={geo ? "map" : "activity"}
              href={`/${geo ? "mapa" : "monitoramento"}/${item.id}`}
            />
          ))}
          {!data.properties.length && (
            <EmptyState
              title="Nenhum imóvel vinculado"
              description="Converse com a ETR para receber orientação sobre seu cadastro."
            />
          )}
        </>
      )}
    </Screen>
  );
}
