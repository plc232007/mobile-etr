import { StyleSheet } from "react-native";

export const pathColors = {
  paper: "#F5F1E8",
  ink: "#203E36",
  muted: "#59675D",
  line: "#D8D2C5",
  accent: "#9B482A",
  peach: "#F1DCC9",
};

export const pathStyles = StyleSheet.create({
  headline: {
    fontSize: 38,
    lineHeight: 43,
    letterSpacing: -1.7,
    fontWeight: "600",
    color: pathColors.ink,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "700",
    color: pathColors.accent,
  },
  section: { gap: 20 },
  row: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: pathColors.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  number: {
    fontSize: 15,
    fontWeight: "600",
    color: pathColors.accent,
    width: 28,
  },
  panel: { backgroundColor: "#FFFFFF", padding: 24, borderRadius: 4, gap: 18 },
});
