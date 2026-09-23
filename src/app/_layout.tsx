import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  PresentationAccessProvider,
  usePresentationAccess,
} from "@/hooks/usePresentationAccess";
import { colors } from "@/theme";

function Navigation() {
  const { granted } = usePresentationAccess();
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="acesso" />
        <Stack.Protected guard={granted}>
          <Stack.Screen name="(demo)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PresentationAccessProvider>
        <Navigation />
      </PresentationAccessProvider>
    </SafeAreaProvider>
  );
}
