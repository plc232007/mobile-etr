import { Tabs } from "expo-router";
import { useWindowDimensions } from "react-native";
import { Icon } from "@/components/ui";
import { mobileNavigation } from "@/components/navigation";
import { colors } from "@/theme";
import { useData } from "@/hooks/useCitizen";
import { usePrototype } from "@/hooks/usePrototype";

export default function TabLayout() {
  const data = useData();
  const { model } = usePrototype();
  const wide = useWindowDimensions().width >= 1000 && model !== "original";
  const tabs = mobileNavigation(model);
  const hidden = [
    "index",
    "processos",
    "servicos",
    "alertas",
    "noticias",
    "perfil",
  ].filter((name) => !tabs.some((tab) => tab.name === name));
  const unread = data.alerts.filter((item) => !item.read).length;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          display: wide ? "none" : "flex",
          backgroundColor: colors.surface,
          width: "100%",
          maxWidth: model === "original" ? 640 : 1100,
          alignSelf: "center",
          borderTopColor: colors.border,
          minHeight: 78,
          paddingTop: 9,
          paddingBottom: 15,
        },
        tabBarItemStyle: { minHeight: 52 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 3 },
        tabBarHideOnKeyboard: true,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Icon name={tab.icon} color={color} size={21} />
            ),
            tabBarBadge: tab.name === "alertas" && unread ? unread : undefined,
            tabBarBadgeStyle: { backgroundColor: colors.primary, fontSize: 10 },
          }}
        />
      ))}
      {hidden.map((name) => (
        <Tabs.Screen key={name} name={name} options={{ href: null }} />
      ))}
    </Tabs>
  );
}
