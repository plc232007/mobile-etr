import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
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
export default function MonitoringScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useData().properties.find((p) => p.id === id);
  const { geoEnabled } = usePrototype();
  return (
    <Screen
      title="Monitoramento do imóvel"
      subtitle="Informações para você acompanhar com tranquilidade."
    >
      {item ? (
        <>
          <Card>
            <Title>{item.name}</Title>
            <Copy muted small>
              Última atualização: 08/09/2026
            </Copy>
            <StatusBadge label="Imóvel identificado" />
            <StatusBadge label="Limites cadastrados" />
            {!item.occurrence && (
              <StatusBadge label="Nenhuma ocorrência exibida" />
            )}
          </Card>
          {!!item.occurrence && (
            <>
              <InfoCard
                tone="warning"
                title="Uma atualização para conferir"
                description={item.occurrence}
              />
              <Button
                title="Ver informações com a equipe"
                variant="secondary"
                onPress={() => go("/atendimento")}
              />
            </>
          )}
          <InfoCard
            title="Acompanhamento do território"
            description="Estas informações ajudam você a conhecer a situação do imóvel. Eventuais atualizações serão avaliadas pela equipe com você."
          />
          {geoEnabled && (
            <Button
              title="Visualizar no mapa"
              icon="map"
              onPress={() => go(`/mapa/${id}`)}
            />
          )}
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
