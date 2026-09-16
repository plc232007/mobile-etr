import { Tabs } from "expo-router";
import { Icon, IconName } from "@/components/ui";
import { colors } from "@/theme";
import { useData } from "@/hooks/useCitizen";
const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: "index", title: "Início", icon: "home" },
  { name: "processos", title: "Processos", icon: "layers" },
  { name: "servicos", title: "Serviços", icon: "grid" },
  { name: "alertas", title: "Alertas", icon: "bell" },
  { name: "perfil", title: "Perfil", icon: "user" },
];
export default function TabLayout() {
  const data = useData();
  const unread = data.alerts.filter((item) => !item.read).length;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          width: "100%",
          maxWidth: 640,
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
    </Tabs>
  );
}
