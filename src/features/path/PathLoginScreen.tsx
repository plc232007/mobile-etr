import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Brand } from "@/components/Brand";
import { Button, Copy, Field, Icon, Row, Title } from "@/components/ui";
import { useCitizen } from "@/hooks/useCitizen";
import { pathColors as c, pathStyles as s } from "./pathStyles";

export default function PathLoginScreen() {
  const { login } = useCitizen();
  const wide = useWindowDimensions().width >= 850;
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [help, setHelp] = useState("");
  const enter = async (demo = false) => {
    if (!demo && ![11, 14].includes(identifier.replace(/\D/g, "").length)) {
      setError("Use 000.000.000-00 para testar o acesso da demonstração.");
      return;
    }
    setBusy(true);
    try {
      await login();
    } finally {
      setBusy(false);
    }
  };
  return (
    <Screen showHeader={false}>
      <Brand variant="compact" />
      <View
        style={{
          flexDirection: wide ? "row" : "column",
          gap: wide ? 60 : 28,
          paddingVertical: wide ? 50 : 16,
        }}
      >
        <View style={{ flex: wide ? 1 : undefined, gap: 24 }}>
          <Text style={s.label}>ETR / MEU CAMINHO</Text>
          <Text
            accessibilityRole="header"
            style={[s.headline, wide && { fontSize: 54, lineHeight: 60 }]}
          >
            Da sua terra.{"\n"}Para o seu futuro.
          </Text>
          <Copy style={{ color: c.muted }}>
            Um caminho mais claro para cuidar da sua regularização rural.
          </Copy>
          {[
            {
              title: "Saiba o que fazer",
              detail: "Documentos e parcelas em uma lista de ações.",
            },
            {
              title: "Acompanhe cada avanço",
              detail: "Seus pedidos e imóveis sempre por perto.",
            },
            {
              title: "Conte com orientação",
              detail: "Serviços organizados pela sua necessidade.",
            },
          ].map((item, index) => (
            <Row key={item.title} style={{ alignItems: "flex-start" }}>
              <Text style={s.number}>0{index + 1}</Text>
              <View style={{ flex: 1, gap: 4 }}>
                <Copy style={{ fontWeight: "700" }}>{item.title}</Copy>
                <Copy muted small>
                  {item.detail}
                </Copy>
              </View>
            </Row>
          ))}
        </View>
        <View
          style={[
            s.panel,
            {
              flex: wide ? 1 : undefined,
              alignSelf: wide ? "flex-start" : "stretch",
            },
          ]}
        >
          <Icon name="log-in" size={28} color={c.accent} />
          <Title>Entre no seu espaço</Title>
          <Copy muted>Vamos continuar de onde você está.</Copy>
          <Field
            label="CPF ou CNPJ"
            placeholder="000.000.000-00"
            value={identifier}
            onChangeText={(value) => {
              setIdentifier(value);
              setError("");
            }}
            keyboardType="number-pad"
            maxLength={18}
            autoComplete="off"
          />
          {!!error && <Copy style={{ color: c.accent }}>{error}</Copy>}
          <Button
            title="Continuar"
            loading={busy}
            onPress={() => void enter()}
          />
          <Button
            title="Entrar na demonstração"
            variant="secondary"
            disabled={busy}
            onPress={() => void enter(true)}
          />
          <Button
            title="Ajuda para acessar"
            variant="ghost"
            onPress={() =>
              setHelp(
                "Neste protótipo, não é necessário criar uma conta ou recuperar senha. Use Entrar na demonstração para acessar os dados fictícios de João da Silva.",
              )
            }
          />
          {!!help && <Copy small>{help}</Copy>}
          <Copy small muted>
            Demonstração com dados fictícios. Não informe dados pessoais reais.
          </Copy>
        </View>
      </View>
    </Screen>
  );
}
