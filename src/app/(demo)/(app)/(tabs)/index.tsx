import HomeScreen from "@/features/home/HomeScreen";
import ClientHomeScreen from "@/features/home/ClientHomeScreen";
import { usePrototype } from "@/hooks/usePrototype";
import PathHomeScreen from "@/features/path/PathHomeScreen";

export default function Home() {
  const { model } = usePrototype();
  return model === "caminho" ? (
    <PathHomeScreen />
  ) : model === "cliente" ? (
    <ClientHomeScreen />
  ) : (
    <HomeScreen />
  );
}
