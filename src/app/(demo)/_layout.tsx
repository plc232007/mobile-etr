import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CitizenProvider, useCitizen } from "@/hooks/useCitizen";
import { Copy, ErrorState, LoadingState } from "@/components/ui";
import { colors } from "@/theme";
import { PrototypeProvider } from "@/hooks/usePrototype";
import { KeyboardFocus } from "@/components/KeyboardFocus";
function Root() {
  const { loading, error, feedback, reload, reset } = useCitizen();
  if (loading) return <LoadingState />;
  if (error)
    return (
      <ErrorState retry={() => void reload()} reset={() => void reset()} />
    );
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      <KeyboardFocus />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      />
      {feedback ? (
        <View
          accessibilityLiveRegion="polite"
          role="status"
          style={{
            position: "absolute",
            bottom: 100,
            alignSelf: "center",
            maxWidth: 550,
            width: "90%",
            backgroundColor: colors.primaryDark,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <Copy style={{ color: "white", textAlign: "center" }}>
            {feedback}
          </Copy>
        </View>
      ) : null}
    </View>
  );
}
export default function RootLayout() {
  return (
    <CitizenProvider>
      <PrototypeProvider>
        <Root />
      </PrototypeProvider>
    </CitizenProvider>
  );
}
