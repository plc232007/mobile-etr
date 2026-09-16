import { Redirect, Stack } from "expo-router";
import { useCitizen } from "@/hooks/useCitizen";
export default function AppLayout() {
  const { authenticated } = useCitizen();
  if (!authenticated) return <Redirect href="/login" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
