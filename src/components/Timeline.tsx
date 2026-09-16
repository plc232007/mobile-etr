import React from "react";
import { Text, View } from "react-native";
import { date } from "@/utils/format";
import { colors } from "@/theme";
import { Copy, Icon, Row } from "./ui";
export const processStages = [
  "Solicitação recebida",
  "Documentação conferida",
  "Análise técnica",
  "Análise jurídica",
  "Aprovação",
  "Emissão do contrato",
  "Regularização concluída",
];
export function Timeline({
  current,
  dates = [],
}: {
  current: number;
  dates?: (string | undefined)[];
}) {
  return (
    <View>
      {processStages.map((stage, index) => (
        <Row key={stage} style={{ alignItems: "stretch", gap: 15 }}>
          <View style={{ alignItems: "center", width: 28 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor:
                  index <= current ? colors.primary : colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index < current ? (
                <Icon name="check" color="white" size={15} />
              ) : (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      index === current ? colors.lime : "#ADB9AF",
                  }}
                />
              )}
            </View>
            {index < processStages.length - 1 && (
              <View
                style={{
                  width: 2,
                  flex: 1,
                  minHeight: 27,
                  backgroundColor:
                    index < current ? colors.primary : colors.border,
                }}
              />
            )}
          </View>
          <View style={{ flex: 1, paddingBottom: 23, gap: 3 }}>
            <Copy
              style={{
                fontWeight: index === current ? "700" : "500",
                color: index > current ? colors.muted : colors.text,
              }}
            >
              {stage}
            </Copy>
            <Copy small muted>
              {index < current
                ? "Concluído"
                : index === current
                  ? "Em andamento"
                  : "Próxima etapa"}
              {dates[index] ? ` • ${date(dates[index]!)}` : ""}
            </Copy>
          </View>
        </Row>
      ))}
    </View>
  );
}
export function ProgressSteps({
  current,
  total = 5,
}: {
  current: number;
  total?: number;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Copy small muted>
          Etapa {current} de {total}
        </Copy>
        <Text
          style={{ color: colors.primary, fontWeight: "600", fontSize: 12 }}
        >
          {Math.round((current / total) * 100)}%
        </Text>
      </Row>
      <Row style={{ gap: 6 }}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              backgroundColor: index < current ? colors.primary : colors.border,
            }}
          />
        ))}
      </Row>
    </View>
  );
}
