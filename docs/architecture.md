# Fundação do protótipo ETR

## Decisões anteriores à implementação das telas

- Expo + React Native + TypeScript estrito; Expo Router para Android, iOS e web.
- `src/app`: somente rotas e layouts. Grupo autenticado com abas Início, Processos, Serviços, Alertas, Perfil; detalhes em uma pilha acima das abas.
- `src/theme`: tokens de cor, espaçamento, borda e tipografia. Verde floresta e sálvia, branco quente, âmbar para atenção. Toques de pelo menos 48 px, texto escalável, ícones acompanhados de rótulos.
- `src/components`: cabeçalhos, botões, cards semânticos, filtros, timeline, etapas, estados e mapa ilustrado em SVG.
- `src/types`: contratos de usuário, imóvel, processo, pendência, documento, boleto, edital, alerta, requerimento e agendamento.
- `src/mocks`: base fictícia com data de referência 15/09/2026. Não depende do relógio para a demonstração.
- `src/services`: contrato de repositório assíncrono; implementação local com persistência. Nenhuma integração governamental ou pagamento.
- `src/hooks`: provider da sessão e estado de domínio; carregamento, falhas, conexão e feedback compartilhados.
- `src/features`: telas agrupadas por domínio; interfaces não leem diretamente os mocks.

## Rotas

`/prototipos` é uma galeria pública dos modelos 01 (Minha terra), 02 (Área do Cliente) e 03 (Meu caminho). `PrototypeProvider` persiste somente a escolha visual em `etr:prototype`, separada da sessão e dos dados de domínio. Login e início adaptam a apresentação; o modelo 03 também tem um catálogo próprio de serviços. Os fluxos de detalhe são compartilhados. A faixa de troca fica disponível no componente `Screen`.

O modelo 03 concentra suas telas e estilos em `src/features/path`: início por tarefas / processos / imóveis, login e serviços pesquisáveis por intenção. O shell usa até 1100 px e fundo areia, com duas colunas no início e login a partir de 850 px. Os cinco destinos da navegação principal são preservados. Busca ignora acentos e combina com filtros; listas e contagens derivam do estado de domínio, incluindo estados vazios.

No modelo 02, o imóvel selecionado determina processo, pendências, parcela, mapa e monitoramento. `/pendencias?propertyId=...` restringe os envios ao imóvel correspondente; sem esse parâmetro, mantém a central geral. A seleção de imóvel vale enquanto a tela inicial estiver montada.

`/login`, `/`, `/processos`, `/servicos`, `/alertas`, `/perfil`.
Detalhes: `/processo/[id]`, `/pendencias`, `/requerimento`, `/boletos`, `/boleto/[id]`, `/editais`, `/edital/[id]`, `/imoveis`, `/imovel/[id]`, `/documentos`, `/documento/[id]`, `/certidao`, `/mapa/[id]`, `/monitoramento/[id]`, `/jornada`, `/atendimento`, `/agendamento`, `/noticias`, `/noticia/[id]`, `/configuracoes`.

## Comportamentos

Enviar CAR registra documento como recebido, resolve a pendência de envio e acrescenta movimentação/alerta; não simula aprovação automática pela ETR. Requerimentos têm cinco etapas, rascunho persistido, revisão e protocolo exclusivo local. Acompanhar edital gera alerta mockado. Boletos e PDFs levam identificação de demonstração e não têm validade. A sessão e preferências são locais; não há senha nem autenticação real. Dados carregados continuam disponíveis sem conexão; não há sincronização offline com servidor.

## Evolução

Substituir o repositório local por adaptador de API, adicionar autenticação real e armazenamento seguro, validação no servidor, upload autenticado e sincronização. O armazenamento local atual contém somente dados fictícios e não deve receber dados pessoais reais.
