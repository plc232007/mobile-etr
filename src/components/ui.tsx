import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router, Href } from "expo-router";
import { colors, radius } from "@/theme";
import { Tone } from "@/types";
export type IconName = React.ComponentProps<typeof Feather>["name"];
export const go = (href: string) => router.push(href as Href);
export function Icon({
  name,
  size = 21,
  color = colors.primary,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  return (
    <Feather
      name={name}
      size={size}
      color={color}
      accessible={false}
      aria-hidden={true}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
export function Copy({
  children,
  muted = false,
  small = false,
  style,
}: React.PropsWithChildren<{
  muted?: boolean;
  small?: boolean;
  style?: React.ComponentProps<typeof Text>["style"];
}>) {
  return (
    <Text
      style={[
        {
          color: muted ? colors.muted : colors.text,
          fontSize: small ? 13 : 15,
          lineHeight: small ? 20 : 23,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Title({
  children,
  large = false,
}: React.PropsWithChildren<{ large?: boolean }>) {
  return (
    <Text
      accessibilityRole="header"
      style={{
        fontSize: large ? 29 : 20,
        fontWeight: "700",
        color: colors.text,
        lineHeight: large ? 36 : 27,
        letterSpacing: -0.5,
      }}
    >
      {children}
    </Text>
  );
}
export function Eyebrow({
  children,
  light = false,
}: React.PropsWithChildren<{ light?: boolean }>) {
  return (
    <Text
      style={{
        color: light ? colors.lime : colors.muted,
        fontSize: 11,
        letterSpacing: 1.8,
        fontWeight: "700",
      }}
    >
      {children}
    </Text>
  );
}
export function Row({
  children,
  style,
}: React.PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[s.row, style]}>{children}</View>;
}
export function Card({
  children,
  style,
  onPress,
  label,
}: React.PropsWithChildren<{
  style?: ViewStyle;
  onPress?: () => void;
  label?: string;
}>) {
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [s.card, style, pressed && { opacity: 0.75 }]}
    >
      {children}
    </Pressable>
  ) : (
    <View style={[s.card, style]}>{children}</View>
  );
}
export function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
}) {
  const color = variant === "primary" ? colors.white : colors.primary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        {
          backgroundColor:
            variant === "primary"
              ? colors.primary
              : variant === "secondary"
                ? colors.primarySoft
                : "transparent",
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : icon ? (
        <Icon name={icon} size={18} color={color} />
      ) : null}
      <Text style={{ color, fontSize: 15, fontWeight: "600" }}>{title}</Text>
    </Pressable>
  );
}
export function SectionHeader({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Row style={{ justifyContent: "space-between", marginTop: 8 }}>
      <View style={{ flex: 1 }}>
        <Title>{title}</Title>
      </View>
      {!!action && (
        <Pressable accessibilityRole="button" onPress={onPress} style={s.link}>
          <Text style={s.linkText}>{action}</Text>
          <Icon name="arrow-up-right" size={16} />
        </Pressable>
      )}
    </Row>
  );
}
const tones = {
  success: [colors.primarySoft, colors.primary],
  warning: [colors.warningSoft, colors.warning],
  neutral: ["#F0F2EF", colors.muted],
  info: [colors.blueSoft, colors.blue],
  danger: [colors.dangerSoft, colors.danger],
};
export function StatusBadge({
  label,
  tone = "success",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <View style={[s.badge, { backgroundColor: tones[tone][0] }]}>
      <Icon
        name={
          tone === "warning"
            ? "alert-circle"
            : tone === "success"
              ? "check-circle"
              : tone === "danger"
                ? "x-circle"
                : "clock"
        }
        size={13}
        color={tones[tone][1]}
      />
      <Text
        style={{
          color: tones[tone][1],
          fontSize: 12,
          fontWeight: "600",
          flexShrink: 1,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
export function InfoCard({
  title,
  description,
  tone = "info",
  icon = "info",
}: {
  title: string;
  description?: string;
  tone?: Tone;
  icon?: IconName;
}) {
  return (
    <Card
      style={{ backgroundColor: tones[tone][0], borderColor: "transparent" }}
    >
      <Row style={{ alignItems: "flex-start" }}>
        <Icon name={icon} color={tones[tone][1]} />
        <View style={{ flex: 1, gap: 4 }}>
          <Copy style={{ fontWeight: "700", color: tones[tone][1] }}>
            {title}
          </Copy>
          {!!description && (
            <Copy small style={{ color: tones[tone][1] }}>
              {description}
            </Copy>
          )}
        </View>
      </Row>
    </Card>
  );
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ gap: 8 }}>
      <Copy style={{ fontWeight: "600" }}>{label}</Copy>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[
          s.input,
          props.multiline && { minHeight: 110, textAlignVertical: "top" },
        ]}
        {...props}
      />
    </View>
  );
}
export function SearchBar({
  value,
  onChangeText,
  placeholder = "Buscar",
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Row style={s.search}>
      <Icon name="search" color={colors.muted} />
      <TextInput
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, minHeight: 48, color: colors.text, fontSize: 15 }}
      />
    </Row>
  );
}
export function Filters({
  values,
  value,
  onChange,
}: {
  values: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
    >
      {values.map((item) => (
        <Pressable
          key={item}
          accessibilityRole="button"
          accessibilityState={{ selected: value === item }}
          onPress={() => onChange(item)}
          style={[
            s.chip,
            value === item && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          ]}
        >
          <Text
            style={{
              color: value === item ? colors.white : colors.muted,
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
export function EmptyState({
  title = "Tudo certo por aqui",
  description,
  icon = "check-circle",
  action,
  onPress,
}: {
  title?: string;
  description: string;
  icon?: IconName;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={s.empty}>
      <View style={s.iconCircle}>
        <Icon name={icon} size={30} />
      </View>
      <Title>{title}</Title>
      <Copy muted style={{ textAlign: "center" }}>
        {description}
      </Copy>
      {!!action && onPress && (
        <Button title={action} onPress={onPress} variant="secondary" />
      )}
    </View>
  );
}
export function LoadingState() {
  return (
    <View
      style={[
        s.empty,
        {
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        },
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Title>Preparando seu espaço</Title>
      <Copy muted>Seus dados estão sendo carregados.</Copy>
    </View>
  );
}
export function ErrorState({
  retry,
  reset,
}: {
  retry: () => void;
  reset?: () => void;
}) {
  return (
    <View style={[s.empty, { flex: 1, justifyContent: "center" }]}>
      <Icon name="cloud-off" size={36} />
      <Title>Não conseguimos carregar</Title>
      <Copy muted>Tente novamente para acessar seus dados.</Copy>
      <Button title="Tentar novamente" onPress={retry} />
      {reset && (
        <Button
          title="Restaurar dados de demonstração"
          variant="ghost"
          onPress={reset}
        />
      )}
    </View>
  );
}
export function MenuItem({
  title,
  description,
  icon,
  href,
  onPress,
}: {
  title: string;
  description?: string;
  icon: IconName;
  href?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress ?? (() => href && go(href))}
      style={({ pressed }) => [
        s.menu,
        pressed && { backgroundColor: colors.primarySoft },
      ]}
    >
      <View style={s.menuIcon}>
        <Icon name={icon} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Copy style={{ fontWeight: "600" }}>{title}</Copy>
        {!!description && (
          <Copy small muted>
            {description}
          </Copy>
        )}
      </View>
      <Icon name="chevron-right" size={18} color={colors.muted} />
    </Pressable>
  );
}
export function Choice({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Card
      onPress={onPress}
      label={`${title}${selected ? ", selecionado" : ""}`}
      style={{
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primarySoft : colors.surface,
      }}
    >
      <Row>
        <Icon name={selected ? "check-circle" : "circle"} />
        <View style={{ flex: 1 }}>
          <Copy style={{ fontWeight: "600" }}>{title}</Copy>
          {!!description && (
            <Copy muted small>
              {description}
            </Copy>
          )}
        </View>
      </Row>
    </Card>
  );
}
export const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  card: {
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  button: {
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  link: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 8,
  },
  linkText: { fontSize: 13, color: colors.primary, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    minHeight: 52,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },
  chip: {
    paddingHorizontal: 16,
    minHeight: 48,
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  empty: { alignItems: "center", padding: 28, gap: 14 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    minHeight: 64,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
});
