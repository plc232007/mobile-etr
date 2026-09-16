import React, { useState } from "react";
import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import { Screen } from "@/components/Screen";
import { Brand } from "@/components/Brand";
import { Landscape } from "@/components/Landscape";
import {
  Button,
  Card,
  Copy,
  Field,
  Icon,
  InfoCard,
  Row,
} from "@/components/ui";
import { useCitizen } from "@/hooks/useCitizen";
import { colors } from "@/theme";
export default function LoginScreen() {
  const { authenticated, login } = useCitizen();
  const [identifier, setIdentifier] = useState("");
  const [mode, setMode] = useState<"login" | "first" | "recover">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (authenticated) return <Redirect href="/" />;
  const enter = async () => {
    const digits = identifier.replace(/\D/g, "");
    if (digits.length !== 11 && digits.length !== 14) {
      setError(
        "Informe 11 dígitos para CPF ou 14 para CNPJ. Use 000.000.000-00 para testar.",
      );
      return;
    }
    setBusy(true);
    await login();
    setBusy(false);
  };
  return (
    <Screen showHeader={false}>
      <View
        style={{
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: colors.primaryDark,
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 16,
          }}
        >
          <Brand variant="hero" />
        </View>
        <Landscape height={110} />
      </View>
      <View style={{ gap: 12 }}>
        <Text
          accessibilityRole="header"
          style={{
            fontSize: 28,
            lineHeight: 35,
            fontWeight: "700",
            letterSpacing: -0.8,
            color: colors.primary,
          }}
        >
          Sua terra. Seu futuro.{"\n"}A gente cuida junto.
        </Text>
        <Copy muted>
          Acompanhe sua regularização e resolva o que precisa, de onde você
          estiver.
        </Copy>
      </View>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>
          {mode === "first"
            ? "Seu primeiro acesso"
            : mode === "recover"
              ? "Recuperar acesso"
              : "Acesse sua conta"}
        </Text>
        <Copy muted small>
          {mode === "login"
            ? "Um espaço para você e para o seu imóvel."
            : "Neste protótipo, você acessa a conta fictícia de João da Silva, sem senha."}
        </Copy>
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
        {!!error && (
          <Copy small style={{ color: colors.danger }}>
            {error}
          </Copy>
        )}
        <Button
          title="Continuar"
          icon="arrow-right"
          loading={busy}
          onPress={() => void enter()}
        />
        <Button
          title="Entrar na demonstração"
          variant="secondary"
          onPress={() => void login()}
        />
        <Row
          style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 0 }}
        >
          <Button
            title="Esqueci minha senha"
            variant="ghost"
            onPress={() => setMode("recover")}
          />
          <Button
            title="Primeiro acesso"
            variant="ghost"
            onPress={() => setMode("first")}
          />
        </Row>
        {mode !== "login" && (
          <Button
            title="Voltar ao acesso"
            variant="ghost"
            onPress={() => setMode("login")}
          />
        )}
      </Card>
      <InfoCard
        title="Você está em uma demonstração"
        description="Use os dados de exemplo. Não informe dados pessoais reais. Nenhum acesso a sistemas do governo é realizado."
        icon="shield"
      />
      <Row style={{ justifyContent: "center" }}>
        <Icon name="map-pin" size={15} />
        <Copy small muted>
          Distrito Federal • Regularização rural
        </Copy>
      </Row>
    </Screen>
  );
}
