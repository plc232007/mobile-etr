import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Copy,
  EmptyState,
  Eyebrow,
  go,
  Icon,
  MenuItem,
  SearchBar,
  SectionHeader,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";
import { colors } from "@/theme";
import { getServices, matchesService } from "@/features/services/catalog";
import { RecentNews } from "./HomeUpdates";

export default function ClientHomeScreen() {
  const data = useData();
  const { geoEnabled } = usePrototype();
  const [query, setQuery] = useState("");
  const services = getServices(geoEnabled);
  const results = services.filter((item) => matchesService(item, query));
  return (
    <Screen home back={false}>
      <View style={{ gap: 8 }}>
        <Eyebrow>CENTRAL DE SERVIÇOS ETR</Eyebrow>
        <Copy muted>Olá, {data.user.name.split(" ")[0]}.</Copy>
        <Text
          accessibilityRole="header"
          style={{
            fontSize: 34,
            lineHeight: 41,
            fontWeight: "700",
            letterSpacing: -1,
            color: colors.primary,
          }}
        >
          O que você precisa?
        </Text>
      </View>
      <SearchBar
        placeholder="Buscar serviço..."
        value={query}
        onChangeText={setQuery}
      />
      {query.trim() ? (
        <>
          <Copy small muted>
            {results.length}{" "}
            {results.length === 1
              ? "serviço encontrado"
              : "serviços encontrados"}
          </Copy>
          {results.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
          {!results.length && (
            <EmptyState
              title="Nenhum serviço encontrado"
              description="Busque pelo nome do serviço ou tente outra palavra."
              action="Limpar busca"
              onPress={() => setQuery("")}
            />
          )}
        </>
      ) : (
        <>
          <View
            style={{
              padding: 24,
              gap: 14,
              backgroundColor: colors.primaryDark,
              borderRadius: 16,
            }}
          >
            <Icon name="edit-3" size={27} color={colors.lime} />
            <Text
              accessibilityRole="header"
              style={{ color: "white", fontSize: 25, fontWeight: "700" }}
            >
              Requerimento Online
            </Text>
            <Copy style={{ color: "#DFEBDD" }}>
              Faça uma nova solicitação à ETR. Preencha os dados, envie
              documentos e revise seu pedido.
            </Copy>
            <Button
              title={
                data.draft ? "Continuar requerimento" : "Iniciar requerimento"
              }
              variant="secondary"
              icon="arrow-right"
              onPress={() => go("/requerimento")}
            />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {services
              .filter((item) => item.primary && item.href !== "/requerimento")
              .map((item) => (
                <Pressable
                  key={item.href}
                  accessibilityRole="button"
                  accessibilityLabel={item.title}
                  onPress={() => go(item.href)}
                  style={({ pressed }) => ({
                    flexBasis: "45%",
                    flexGrow: 1,
                    padding: 18,
                    gap: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: "white",
                    borderRadius: 12,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Icon name={item.icon} size={26} />
                  <Title>{item.title}</Title>
                  <Copy small muted>
                    {item.description}
                  </Copy>
                  <Icon name="arrow-up-right" size={18} />
                </Pressable>
              ))}
          </View>
          <SectionHeader
            title="Outros serviços"
            action="Ver todos"
            onPress={() => go("/servicos")}
          />
          <View>
            {services
              .filter((item) =>
                ["/editais", "/monitora", "/noticias", "/geo"].includes(
                  item.href,
                ),
              )
              .map((item) => (
                <MenuItem key={item.href} {...item} />
              ))}
          </View>
          <MenuItem
            title="Meus requerimentos"
            description="Consulte protocolos e acompanhe seus pedidos."
            icon="layers"
            href="/processos"
          />
          <RecentNews />
          <MenuItem
            title="Precisa de ajuda?"
            description="Converse com a equipe da ETR."
            icon="help-circle"
            href="/atendimento"
          />
        </>
      )}
    </Screen>
  );
}
