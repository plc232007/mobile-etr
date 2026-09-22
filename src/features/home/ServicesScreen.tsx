import { Screen } from "@/components/Screen";
import { Card, Copy, MenuItem, SectionHeader, Title } from "@/components/ui";
import { usePrototype } from "@/hooks/usePrototype";
import ServiceCatalogScreen from "@/features/services/ServiceCatalogScreen";
export default function ServicesScreen() {
  const { model } = usePrototype();
  if (model !== "original") return <ServiceCatalogScreen />;
  return (
    <Screen
      title="Como podemos ajudar?"
      subtitle="Tudo o que você precisa para seguir em frente."
      back={false}
    >
      <Card>
        <Title>Seu próximo passo</Title>
        <Copy muted>
          Faça um pedido sem sair de casa. Vamos orientar você em cada etapa.
        </Copy>
        <MenuItem
          title="Novo requerimento"
          description="Solicite um serviço em 5 etapas"
          icon="edit-3"
          href="/requerimento"
        />
      </Card>
      <SectionHeader title="Sua regularização" />
      <Card>
        <MenuItem title="Meus imóveis" icon="map" href="/imoveis" />
        <MenuItem title="Meus documentos" icon="folder" href="/documentos" />
        <MenuItem title="Pendências" icon="alert-circle" href="/pendencias" />
        <MenuItem
          title="Jornada da regularização"
          icon="compass"
          href="/jornada"
        />
      </Card>
      <SectionHeader title="Documentos e pagamentos" />
      <Card>
        <MenuItem title="Boletos" icon="file-text" href="/boletos" />
        <MenuItem title="Certidão Negativa" icon="award" href="/certidao" />
        <MenuItem title="Editais" icon="clipboard" href="/editais" />
      </Card>
      <SectionHeader title="Conte com a ETR" />
      <Card>
        <MenuItem
          title="Atendimento"
          icon="message-circle"
          href="/atendimento"
        />
        <MenuItem
          title="Agendar atendimento"
          icon="calendar"
          href="/agendamento"
        />
        <MenuItem title="Notícias" icon="book-open" href="/noticias" />
      </Card>
    </Screen>
  );
}
