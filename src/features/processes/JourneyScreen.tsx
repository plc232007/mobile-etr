import { useState } from "react";
import { View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  go,
  Icon,
  Row,
  StatusBadge,
  Title,
} from "@/components/ui";
import { useData } from "@/hooks/useCitizen";
import { colors } from "@/theme";
const stages = [
  {
    title: "Identificação do imóvel",
    meaning: "A ETR identifica a área e confere as informações do território.",
    owner: "Equipe da ETR, com suas informações",
    docs: "Identificação e localização do imóvel",
    next: "Confira se os dados do seu imóvel estão corretos.",
    href: "/imoveis",
  },
  {
    title: "Documentação",
    meaning: "Reunimos os documentos necessários para avaliar seu pedido.",
    owner: "Você e a equipe de conferência",
    docs: "Identificação, comprovante de ocupação e CAR",
    next: "Envie o documento solicitado e aguarde a conferência.",
    href: "/pendencias",
  },
  {
    title: "Análise da ETR",
    meaning:
      "As equipes técnica e jurídica avaliam seu pedido e os documentos.",
    owner: "Equipes técnica e jurídica da ETR",
    docs: "Documentos enviados no processo",
    next: "Acompanhe as mensagens. Avisaremos se precisar fazer algo.",
    href: "/processo/regularizacao",
  },
  {
    title: "Concessão de Direito de Uso",
    meaning:
      "Quando aprovado, o processo avança para a preparação do contrato de uso do imóvel.",
    owner: "ETR e titular do imóvel",
    docs: "Contrato e documentos atualizados",
    next: "Aguarde as orientações para conferir e assinar o contrato.",
    href: "/documentos",
  },
  {
    title: "Regularização concluída",
    meaning: "O processo foi finalizado conforme os critérios aplicáveis.",
    owner: "ETR",
    docs: "Instrumento de regularização",
    next: "Mantenha seu cadastro atualizado e guarde seus documentos.",
    href: "/perfil",
  },
];
export default function JourneyScreen() {
  const data = useData();
  const [open, setOpen] = useState<number | null>(2);
  const pending = data.pending.some((item) => !item.resolved);
  return (
    <Screen
      title="Sua jornada"
      subtitle="Entenda cada passo para regularizar sua terra."
    >
      {stages.map((stage, index) => (
        <Card key={stage.title}>
          <Row>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index === 0 ? (
                <Icon name="check" size={18} />
              ) : (
                <Copy style={{ fontWeight: "700" }}>{index + 1}</Copy>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Title>{stage.title}</Title>
            </View>
          </Row>
          <StatusBadge
            label={
              index === 0
                ? "Concluído"
                : index === 1
                  ? pending
                    ? "Aguardando o CAR"
                    : "Documentos recebidos"
                  : index === 2
                    ? "Em andamento"
                    : "Ainda não iniciado"
            }
            tone={
              index === 1 && pending
                ? "warning"
                : index > 2
                  ? "neutral"
                  : "success"
            }
          />
          <Button
            title={open === index ? "Recolher etapa" : "Entender esta etapa"}
            variant="ghost"
            icon={open === index ? "chevron-up" : "chevron-down"}
            onPress={() => setOpen(open === index ? null : index)}
          />
          {open === index && (
            <>
              <Copy>{stage.meaning}</Copy>
              <Copy small muted>
                Responsável: {stage.owner}
              </Copy>
              <Copy small muted>
                Documentos: {stage.docs}
              </Copy>
              <Copy>{stage.next}</Copy>
              <Button
                title="Ver próximo passo"
                variant="secondary"
                onPress={() => go(stage.href)}
              />
            </>
          )}
        </Card>
      ))}
    </Screen>
  );
}
