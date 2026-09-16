import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { Landscape } from "@/components/Landscape";
import {
  Button,
  Card,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { date } from "@/utils/format";
export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useData().news.find((p) => p.id === id);
  return (
    <Screen title="Notícias">
      {item ? (
        <>
          <Eyebrow>
            {item.category} • {date(item.date)}
          </Eyebrow>
          <Title large>{item.title}</Title>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <Landscape height={190} />
          </Card>
          <Copy>{item.body}</Copy>
          <Button
            title="Falar com a ETR"
            variant="secondary"
            onPress={() => go("/atendimento")}
          />
        </>
      ) : (
        <EmptyState
          title="Notícia não encontrada"
          description="Volte para conferir as notícias disponíveis."
        />
      )}
    </Screen>
  );
}
