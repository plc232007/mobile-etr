import { useState } from "react";
import { Switch, View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  InfoCard,
  Row,
  SectionHeader,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { colors } from "@/theme";
import { Preferences } from "@/types";
export default function SettingsScreen() {
  const data = useData();
  const { update, reset } = useCitizen();
  const [confirmReset, setConfirmReset] = useState(false);
  const toggle = (key: keyof Preferences) =>
    update((current) => ({
      ...current,
      preferences: { ...current.preferences, [key]: !current.preferences[key] },
    }));
  return (
    <Screen
      title="Configurações"
      subtitle="Escolha como acompanhar suas informações."
    >
      <SectionHeader title="Preferências de notificação" />
      <Card>
        {(
          [
            { key: "process", label: "Processos e documentos" },
            { key: "payments", label: "Lembretes de boletos" },
            { key: "notices", label: "Editais acompanhados" },
          ] as const
        ).map((item) => (
          <Row
            key={item.key}
            style={{ justifyContent: "space-between", minHeight: 48 }}
          >
            <Copy style={{ flex: 1 }}>{item.label}</Copy>
            <Switch
              accessibilityLabel={item.label}
              value={data.preferences[item.key]}
              onValueChange={() => toggle(item.key)}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </Row>
        ))}
        <Copy muted small>
          Preferências salvas para a futura integração de notificações. Neste
          protótipo os alertas são locais e não há envio de push.
        </Copy>
      </Card>
      <SectionHeader title="Privacidade e segurança" />
      <InfoCard
        title="Seus dados nesta demonstração"
        description="A conta é fictícia e fica salva somente neste navegador ou aparelho. Não há autenticação real nem envio para a ETR. Use apenas arquivos de teste."
        icon="shield"
      />
      <Card>
        <Title>Como protegemos seu espaço</Title>
        <Copy>
          Na versão de produção, o acesso deverá ter autenticação segura,
          controle de permissões e política de privacidade oficial.
        </Copy>
        <Copy muted small>
          Arquivos anexados podem ficar no cache do dispositivo. O protótipo não
          é um cofre de documentos.
        </Copy>
      </Card>
      <SectionHeader title="Opções de demonstração" />
      <Card>
        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Copy>Simular falta de conexão</Copy>
            <Copy small muted>
              Veja a mensagem com os dados já carregados.
            </Copy>
          </View>
          <Switch
            accessibilityLabel="Simular falta de conexão"
            value={data.preferences.offline}
            onValueChange={() => toggle("offline")}
            trackColor={{ true: colors.primary }}
          />
        </Row>
        <Copy small muted>
          Data de referência: 15/09/2026
        </Copy>
      </Card>
      {confirmReset ? (
        <Card>
          <Title>Restaurar a demonstração?</Title>
          <Copy>
            Isso apaga as ações, documentos adicionados, contatos editados,
            agendamentos e rascunhos locais do protótipo.
          </Copy>
          <Button
            title="Confirmar restauração"
            onPress={() => {
              void reset();
              setConfirmReset(false);
            }}
          />
          <Button
            title="Cancelar"
            variant="ghost"
            onPress={() => setConfirmReset(false)}
          />
        </Card>
      ) : (
        <Button
          title="Restaurar dados de demonstração"
          variant="secondary"
          icon="refresh-cw"
          onPress={() => setConfirmReset(true)}
        />
      )}
    </Screen>
  );
}
