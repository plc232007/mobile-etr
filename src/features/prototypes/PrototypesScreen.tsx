import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { Brand } from "@/components/Brand";
import { Landscape } from "@/components/Landscape";
import {
  Button,
  Card,
  Copy,
  Eyebrow,
  Icon,
  Row,
  StatusBadge,
  Title,
} from "@/components/ui";
import { Prototype, usePrototype } from "@/hooks/usePrototype";
import { useCitizen } from "@/hooks/useCitizen";
import { colors } from "@/theme";

export default function PrototypesScreen() {
  const { model, select } = usePrototype();
  const { authenticated } = useCitizen();
  const [busy, setBusy] = useState<Prototype | null>(null);
  const [error, setError] = useState("");
  const open = async (next: Prototype) => {
    setBusy(next);
    setError("");
    try {
      await select(next);
      router.dismissTo(authenticated ? "/" : "/login");
    } catch {
      setError("Não foi possível salvar a escolha. Tente novamente.");
    } finally {
      setBusy(null);
    }
  };
  return (
    <Screen showHeader={false}>
      <Brand />
      <Eyebrow>PROTÓTIPOS ETR</Eyebrow>
      <Title large>Três formas de estar perto do cidadão.</Title>
      <Copy muted>
        Escolha uma experiência para navegar. Você pode trocar de modelo a
        qualquer momento, sem perder seus dados de demonstração.
      </Copy>
      {(
        [
          {
            id: "caminho",
            number: "03",
            title: "Meu caminho",
            description:
              "Uma experiência organizada pelo que você precisa fazer: tarefas, acompanhamento e imóveis. Layout editorial e serviços por necessidade.",
            detail:
              "Agenda de tarefas • Navegação por contexto • Busca de serviços",
          },
          {
            id: "cliente",
            number: "02",
            title: "Área do Cliente",
            description:
              "Sua regularização em primeiro lugar. Escolha o imóvel, veja o que precisa fazer e acesse os serviços da ETR.",
            detail: "Visão por imóvel • Próximo passo • Serviços online",
          },
          {
            id: "original",
            number: "01",
            title: "Minha terra",
            description:
              "A primeira proposta: uma visão geral da sua relação com a ETR, com resumo de processos, pendências e pagamentos.",
            detail: "Resumo pessoal • Acessos rápidos • Atualizações",
          },
        ] as const
      ).map((item) => (
        <Card
          key={item.id}
          style={{
            padding: 0,
            overflow: "hidden",
            borderColor: model === item.id ? colors.primary : colors.border,
          }}
        >
          <View
            style={{
              backgroundColor:
                item.id === "caminho"
                  ? "#E8E1D3"
                  : item.id === "cliente"
                    ? colors.primaryDark
                    : colors.primarySoft,
              padding: 22,
              gap: 12,
            }}
          >
            <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <Eyebrow light={item.id === "cliente"}>
                MODELO {item.number}
              </Eyebrow>
              {model === item.id && <StatusBadge label="Selecionado" />}
            </Row>
            <Copy
              style={{
                color: item.id === "cliente" ? "white" : colors.primary,
                fontSize: 27,
                lineHeight: 34,
                fontWeight: "700",
              }}
            >
              {item.title}
            </Copy>
            {item.id === "caminho" ? (
              <Row>
                <Icon name="navigation" />
                <Copy>01 Resolver · 02 Acompanhar · 03 Avançar</Copy>
              </Row>
            ) : item.id === "cliente" ? (
              <Row>
                <Icon name="map-pin" color={colors.lime} />
                <Copy style={{ color: "white" }}>
                  Seu imóvel. Seu próximo passo.
                </Copy>
              </Row>
            ) : (
              <Landscape height={65} />
            )}
          </View>
          <View style={{ padding: 22, gap: 16 }}>
            <Copy>{item.description}</Copy>
            <Copy muted small>
              {item.detail}
            </Copy>
            <Button
              title={`Explorar ${item.title}`}
              icon="arrow-right"
              loading={busy === item.id}
              disabled={busy !== null}
              onPress={() => void open(item.id)}
            />
          </View>
        </Card>
      ))}
      {!!error && <Copy style={{ color: colors.danger }}>{error}</Copy>}
      <Copy small muted>
        Os três modelos usam os mesmos dados fictícios e fluxos de demonstração.
        A escolha fica salva neste aparelho.
      </Copy>
    </Screen>
  );
}
