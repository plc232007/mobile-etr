import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { Brand } from "@/components/Brand";
import { Button, Card, Copy, Eyebrow, Field, Title } from "@/components/ui";
import { KeyboardFocus } from "@/components/KeyboardFocus";
import { usePresentationAccess } from "@/hooks/usePresentationAccess";
import { colors } from "@/theme";

export default function PresentationAccessScreen() {
  const { granted, unlock } = usePresentationAccess();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  if (granted) return <Redirect href="/prototipos" />;
  const enter = () => setError(unlock(password));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardFocus />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
        }}
      >
        <View
          style={{ width: "100%", maxWidth: 460, alignSelf: "center", gap: 24 }}
        >
          <Brand />
          <View style={{ gap: 12 }}>
            <Eyebrow>APRESENTAÇÃO DOS PROTÓTIPOS</Eyebrow>
            <Title large>Acesse os protótipos ETR</Title>
            <Copy muted>
              Informe a senha de acesso para conhecer e comparar as propostas.
            </Copy>
          </View>
          <Card>
            <Field
              label="Senha de acesso"
              placeholder="Digite a senha de acesso"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              secureTextEntry={!visible}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={enter}
            />
            <Button
              title={visible ? "Ocultar senha" : "Mostrar senha"}
              variant="ghost"
              icon={visible ? "eye-off" : "eye"}
              onPress={() => setVisible(!visible)}
            />
            {!!error && (
              <View accessibilityLiveRegion="polite" role="alert">
                <Copy style={{ color: colors.danger }}>{error}</Copy>
              </View>
            )}
            <Button
              title="Acessar protótipos"
              icon="arrow-right"
              onPress={enter}
            />
          </Card>
          <Copy small muted>
            Use a senha recebida com o convite para esta apresentação.
          </Copy>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
