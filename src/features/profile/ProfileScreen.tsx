import { useState } from "react";
import { View } from "react-native";
import { Screen } from "@/components/Screen";
import {
  Button,
  Card,
  Copy,
  Field,
  Icon,
  MenuItem,
  Row,
  SectionHeader,
  Title,
} from "@/components/ui";
import { useCitizen, useData } from "@/hooks/useCitizen";
import { colors } from "@/theme";
export default function ProfileScreen() {
  const data = useData();
  const { update, logout, notify } = useCitizen();
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(data.user.email);
  const [phone, setPhone] = useState(data.user.phone);
  const [signout, setSignout] = useState(false);
  const save = () => {
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.replace(/\D/g, "").length < 10
    ) {
      notify("Confira o e-mail e o telefone com DDD.");
      return;
    }
    update((current) => ({
      ...current,
      user: { ...current.user, email, phone },
    }));
    setEditing(false);
    notify("Contato atualizado na demonstração.");
  };
  return (
    <Screen
      title="Meu perfil"
      subtitle="Seu espaço, do seu jeito."
      back={false}
    >
      <Card>
        <Row>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.primarySoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={30} />
          </View>
          <View style={{ flex: 1 }}>
            <Title>{data.user.name}</Title>
            <Copy muted>CPF {data.user.cpf}</Copy>
          </View>
        </Row>
      </Card>
      <SectionHeader title="Dados de contato" />
      {editing ? (
        <Card>
          <Field
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Button title="Salvar contato" onPress={save} />
          <Button
            title="Cancelar"
            variant="ghost"
            onPress={() => setEditing(false)}
          />
        </Card>
      ) : (
        <Card>
          <Copy>{data.user.email}</Copy>
          <Copy>{data.user.phone}</Copy>
          <Button
            title="Editar contato"
            icon="edit-2"
            variant="secondary"
            onPress={() => setEditing(true)}
          />
        </Card>
      )}
      <Card>
        <MenuItem
          title="Imóveis vinculados"
          description={`${data.properties.length} imóveis no seu cadastro`}
          icon="map"
          href="/imoveis"
        />
        <MenuItem title="Meus documentos" icon="folder" href="/documentos" />
        <MenuItem
          title="Configurações e notificações"
          icon="settings"
          href="/configuracoes"
        />
        <MenuItem
          title="Privacidade e segurança"
          icon="shield"
          href="/configuracoes?section=privacy"
        />
        <MenuItem title="Atendimento" icon="help-circle" href="/atendimento" />
      </Card>
      {signout ? (
        <Card>
          <Title>Sair da sua conta?</Title>
          <Copy muted>
            Seus dados de demonstração e rascunhos continuarão salvos neste
            aparelho.
          </Copy>
          <Button title="Confirmar saída" onPress={() => void logout()} />
          <Button
            title="Continuar no aplicativo"
            variant="ghost"
            onPress={() => setSignout(false)}
          />
        </Card>
      ) : (
        <Button
          title="Sair da conta"
          variant="ghost"
          icon="log-out"
          onPress={() => setSignout(true)}
        />
      )}
    </Screen>
  );
}
