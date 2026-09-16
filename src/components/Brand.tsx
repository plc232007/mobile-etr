import { Image, StyleSheet, View } from "react-native";
import { colors } from "@/theme";

const logo = require("../../Logo-ETR.webp");
const widths = { compact: 144, header: 196, hero: 260 };

export function Brand({
  variant = "header",
}: {
  variant?: keyof typeof widths;
}) {
  return (
    <View style={[styles.container, { width: widths[variant] }]}>
      <Image
        source={logo}
        accessibilityLabel="ETR — Empresa de Regularização de Terras Rurais"
        accessibilityRole="image"
        resizeMode="contain"
        style={[styles.logo, { height: ((widths[variant] - 20) * 355) / 1000 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
  },
  logo: {
    width: "100%",
  },
});
