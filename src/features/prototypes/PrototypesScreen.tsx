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
import { usePresentationAccess } from "@/hooks/usePresentationAccess";

export default function PrototypesScreen() {
  const { model, select } = usePrototype();
  const { authenticated } = useCitizen();
  const { lock } = usePresentationAccess();
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
            title: "Minha ETR",
            description:
              "O que está acontecendo comigo? Pendências, requerimentos, boletos, certidões e atualizações em uma central pessoal.",
            detail: "Situação pessoal • Acompanhamento • Atualizações",
          },
          {
            id: "cliente",
            number: "02",
            title: "Central de Serviços",
            description:
              "O que quero fazer agora? Busca e acesso direto a requerimentos, boletos, certidões e aos demais serviços da ETR.",
            detail: "Busca de serviços • Ações diretas • Notícias",
          },
          {
            id: "original",
            number: "01",
            title: "Tradicional",
            description:
              "Onde encontro a funcionalidade? A proposta original, com navegação tradicional, preservada como referência para comparação.",
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
                  ? colors.primarySoft
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
                <Copy>Minha situação junto à ETR</Copy>
              </Row>
            ) : item.id === "cliente" ? (
              <Row>
                <Icon name="map-pin" color={colors.lime} />
                <Copy style={{ color: "white" }}>O que você deseja fazer?</Copy>
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
      <Button
        title="Sair da apresentação"
        variant="ghost"
        icon="log-out"
        onPress={lock}
      />
    </Screen>
  );
}
