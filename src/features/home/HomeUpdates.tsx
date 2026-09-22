import { View } from "react-native";
import {
  Card,
  Copy,
  Eyebrow,
  go,
  Icon,
  MenuItem,
  Row,
  SectionHeader,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { date } from "@/utils/format";
import { colors } from "@/theme";

export function RecentNews() {
  const news = [...useData().news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);
  return (
    <View style={{ gap: 12 }}>
      <SectionHeader
        title="Últimas notícias"
        action="Ver todas"
        onPress={() => go("/noticias")}
      />
      {news.map((item) => (
        <Card key={item.id} onPress={() => go(`/noticia/${item.id}`)}>
          <Eyebrow>
            {date(item.date)} · {item.category}
          </Eyebrow>
          <Title>{item.title}</Title>
          <Copy muted small>
            {item.body.slice(0, 140)}
            {item.body.length > 140 ? "…" : ""}
          </Copy>
          <Copy small>Leia mais →</Copy>
        </Card>
      ))}
      {!news.length && (
        <Copy muted>Nenhuma notícia disponível no momento.</Copy>
      )}
    </View>
  );
}

export function RecentActivity() {
  const alerts = [...useData().alerts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);
  return (
    <View style={{ gap: 16 }}>
      <SectionHeader
        title="Atividades recentes"
        action="Ver todas"
        onPress={() => go("/alertas")}
      />
      <Copy muted small>
        Atualizações registradas na demonstração.
      </Copy>
      {alerts.map((item) => (
        <View
          key={item.id}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: colors.border,
            paddingLeft: 16,
          }}
        >
          <Row>
            <Icon name={item.read ? "check-circle" : "bell"} size={15} />
            <Copy muted small>
              {date(item.date)} · {item.read ? "Lida" : "Não lida"}
            </Copy>
          </Row>
          <MenuItem
            title={item.title}
            description={item.description}
            icon="arrow-up-right"
            href={item.href}
          />
        </View>
      ))}
      {!alerts.length && <Copy muted>Nenhuma atualização por enquanto.</Copy>}
    </View>
  );
}
