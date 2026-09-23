import { Screen } from "@/components/Screen";
import { EmptyState, go } from "@/components/ui";
export default function NotFound() {
  return (
    <Screen title="Página não encontrada">
      <EmptyState
        icon="compass"
        description="Este caminho não está disponível. Volte ao início para continuar."
        action="Ir para o início"
        onPress={() => go("/")}
      />
    </Screen>
  );
}
