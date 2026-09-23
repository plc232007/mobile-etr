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
import { usePrototype } from "@/hooks/usePrototype";
import PathLoginScreen from "@/features/path/PathLoginScreen";
export default function LoginScreen() {
  const { authenticated, login } = useCitizen();
  const { model } = usePrototype();
  const client = model === "cliente";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "first" | "recover">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (authenticated) return <Redirect href="/" />;
  if (model === "caminho") return <PathLoginScreen />;
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
        {client ? (
          <View style={{ padding: 24, gap: 10 }}>
            <Copy small style={{ color: colors.lime, letterSpacing: 2 }}>
              CENTRAL DE SERVIÇOS ETR
            </Copy>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                lineHeight: 38,
                fontWeight: "700",
              }}
            >
              Os serviços da ETR.{"\n"}Mais perto de você.
            </Text>
            <Copy style={{ color: "#DFEBDD" }}>
              Serviços e acompanhamento da regularização rural em um só lugar.
            </Copy>
          </View>
        ) : (
          <Landscape height={110} />
        )}
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
          {client
            ? "O que você deseja fazer?"
            : "Sua terra. Seu futuro.\nA gente cuida junto."}
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
            ? "Um espaço protegido para você e para o seu imóvel."
            : "Este acesso é simulado. Use apenas dados fictícios."}
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
        <Field
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setError("");
          }}
          secureTextEntry={!showPassword}
          autoComplete="password"
          autoCapitalize="none"
          textContentType="password"
        />
        <Button
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          variant="ghost"
          icon={showPassword ? "eye-off" : "eye"}
          onPress={() => setShowPassword((current) => !current)}
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
          title="Entrar"
          variant="secondary"
          disabled={busy}
          onPress={() => void enter()}
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
        description="Use o CPF 000.000.000-00 e qualquer senha fictícia. Este login é uma simulação da conta do cidadão."
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
