import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { PropertyMap } from "@/components/Landscape";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  go,
  InfoCard,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";
export default function MapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useData().properties.find((p) => p.id === id);
  const { geoEnabled } = usePrototype();
  if (!geoEnabled)
    return (
      <Screen title="ETR GEO">
        <EmptyState
          title="ETR GEO não habilitado"
          description="Os demais serviços continuam disponíveis."
          action="Ver serviços"
          onPress={() => go("/servicos")}
        />
      </Screen>
    );
  return (
    <Screen
      title="Meu imóvel no mapa"
      subtitle="Uma visão simples do seu território."
    >
      {item ? (
        <>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <PropertyMap />
          </Card>
          <InfoCard
            title="Localização ilustrativa"
            description="O polígono representa apenas o conceito do aplicativo. Não use este mapa para definir limites ou localização real."
          />
          <Card>
            <Title>{item.name}</Title>
            <Copy>Área aproximada: {item.area.toLocaleString("pt-BR")} ha</Copy>
            <Copy>Região: {item.region}</Copy>
            <StatusBadge label="Território identificado" />
            <Copy muted small>
              {item.identifier}
            </Copy>
          </Card>
          <Button
            title="Ver informações do imóvel"
            onPress={() => go(`/imovel/${id}`)}
          />
        </>
      ) : (
        <EmptyState
          title="Imóvel não encontrado"
          description="Volte e selecione um imóvel."
        />
      )}
    </Screen>
  );
}
