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

`/prototipos` compara Tradicional, Central de Serviços e Minha ETR. `PrototypeProvider` mantém os identificadores internos `original`, `cliente` e `caminho`, persistidos em `etr:prototype`, para preservar escolhas anteriores. `etr:geo-enabled` controla somente a disponibilidade dos mapas, sem alterar imóveis ou regras de negócio.

O modelo 01 preserva a experiência original. O modelo 02 usa `ClientHomeScreen` como central de serviços. O modelo 03 usa `PathHomeScreen` como central pessoal. Os dois compartilham `ServiceCatalogScreen`, com catálogo em `src/features/services/catalog.ts`, busca sem acentos e filtros. As informações do painel pessoal derivam de pendências, processos, documentos, pagamentos e alertas existentes.

`components/navigation.ts` define as diferenças de navegação. O shell dos modelos 2 e 3 aceita até 1100 px; a partir de 1000 px, usa menu superior e oculta a barra inferior. `/noticias` passa a integrar o grupo de abas, mantendo a URL. Rotas ocultas da barra seguem acessíveis por serviços e links. O GEO é filtrado no catálogo e protegido em `/geo` e `/mapa/[id]`; o Monitora tem acesso próprio em `/monitora` e funciona sem mapas.

`/pendencias?propertyId=...` restringe os envios ao imóvel correspondente; sem esse parâmetro, mantém a central geral. As etapas dos requerimentos, transições e dados fictícios foram preservados.

`/login`, `/`, `/processos`, `/servicos`, `/alertas`, `/perfil`.
Detalhes: `/geo`, `/monitora`, `/processo/[id]`, `/pendencias`, `/requerimento`, `/boletos`, `/boleto/[id]`, `/editais`, `/edital/[id]`, `/imoveis`, `/imovel/[id]`, `/documentos`, `/documento/[id]`, `/certidao`, `/mapa/[id]`, `/monitoramento/[id]`, `/jornada`, `/atendimento`, `/agendamento`, `/noticias`, `/noticia/[id]`, `/configuracoes`.

## Comportamentos

Enviar CAR registra documento como recebido, resolve a pendência de envio e acrescenta movimentação/alerta; não simula aprovação automática pela ETR. Requerimentos têm cinco etapas, rascunho persistido, revisão e protocolo exclusivo local. Acompanhar edital gera alerta mockado. Boletos e PDFs levam identificação de demonstração e não têm validade. A sessão e preferências são locais; não há senha nem autenticação real. Dados carregados continuam disponíveis sem conexão; não há sincronização offline com servidor.

## Evolução

Substituir o repositório local por adaptador de API, adicionar autenticação real e armazenamento seguro, validação no servidor, upload autenticado e sincronização. O armazenamento local atual contém somente dados fictícios e não deve receber dados pessoais reais.
