import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { useNetworkState } from "expo-network";
import { colors } from "@/theme";
import { useCitizen } from "@/hooks/useCitizen";
import { Copy, go, Icon, Row, Title } from "./ui";
import { Brand } from "./Brand";
import { prototypeLabels, usePrototype } from "@/hooks/usePrototype";
export function Screen({
  title,
  subtitle,
  children,
  home = false,
  back = true,
  showHeader = true,
}: React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  home?: boolean;
  back?: boolean;
  showHeader?: boolean;
}>) {
  const { data } = useCitizen();
  const { model } = usePrototype();
  const pathname = usePathname();
  const journey = model === "caminho" && pathname !== "/prototipos";
  const network = useNetworkState();
  const unread = data?.alerts.filter((item) => !item.read).length ?? 0;
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safe, journey && { backgroundColor: "#F5F1E8" }]}
    >
      <View style={[styles.shell, journey && { maxWidth: 1100 }]}>
        {pathname !== "/prototipos" && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Trocar protótipo"
            onPress={() => go("/prototipos")}
            style={{
              minHeight: 44,
              paddingHorizontal: 24,
              paddingVertical: 8,
              backgroundColor: journey ? "#E8E1D3" : colors.primarySoft,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Copy small style={{ flexShrink: 1 }}>
              Modelo {prototypeLabels[model]}
            </Copy>
            <Row style={{ gap: 5 }}>
              <Copy small style={{ fontWeight: "700" }}>
                Trocar
              </Copy>
              <Icon name="repeat" size={14} />
            </Row>
          </Pressable>
        )}
        {showHeader && (
          <View style={styles.header}>
            {home ? (
              <>
                <Brand />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Alertas, ${unread} não lidos`}
                  onPress={() => go("/alertas")}
                  style={styles.headerButton}
                >
                  <Icon name="bell" />
                  {unread > 0 && <View style={styles.dot} />}
                </Pressable>
              </>
            ) : (
              <>
                <Row style={{ flex: 1 }}>
                  {back && (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Voltar"
                      onPress={() =>
                        router.canGoBack() ? router.back() : router.replace("/")
                      }
                      style={styles.headerButton}
                    >
                      <Icon name="arrow-left" />
                    </Pressable>
                  )}
                  <Brand variant="compact" />
                </Row>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Ajuda"
                  onPress={() => go("/atendimento")}
                  style={styles.headerButton}
                >
                  <Icon name="help-circle" size={21} />
                </Pressable>
              </>
            )}
          </View>
        )}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {(data?.preferences.offline || network.isConnected === false) && (
            <View style={styles.offline}>
              <Icon name="wifi-off" size={17} />
              <Copy small style={{ flex: 1 }}>
                Modo sem conexão: exibindo dados salvos neste aparelho.
              </Copy>
            </View>
          )}
          {!!title && (
            <View style={{ gap: 6, marginBottom: 4 }}>
              <Title large>{title}</Title>
              {!!subtitle && <Copy muted>{subtitle}</Copy>}
            </View>
          )}
          {children}
          <Row style={{ justifyContent: "center", marginTop: 20 }}>
            <Icon name="shield" size={12} color={colors.muted} />
            <Copy small muted style={{ flexShrink: 1, textAlign: "center" }}>
              Ambiente de demonstração • Dados fictícios
            </Copy>
          </Row>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  shell: { width: "100%", maxWidth: 640, alignSelf: "center", flex: 1 },
  header: {
    minHeight: 83,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: { padding: 24, paddingBottom: 32, gap: 18 },
  headerButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: colors.surface,
  },
  dot: {
    position: "absolute",
    right: 12,
    top: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.warning,
  },
  offline: {
    padding: 12,
    backgroundColor: colors.warningSoft,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
