import { Screen } from "@/components/Screen";
import { Landscape } from "@/components/Landscape";
import { NewsCard } from "@/components/cards";
import { Card, Copy, EmptyState } from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
export default function NewsScreen() {
  const data = useData();
  return (
    <Screen
      title="Notícias da ETR"
      subtitle="Informação que aproxima você do campo."
    >
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <Landscape />
      </Card>
      <Copy muted small>
        Conteúdo institucional fictício para demonstração.
      </Copy>
      {[...data.news]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      {!data.news.length && (
        <EmptyState
          title="Nenhuma notícia disponível"
          description="As novidades da ETR aparecerão aqui."
        />
      )}
    </Screen>
  );
}
