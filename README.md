# ETR • Minha terra

Protótipo mobile da central pessoal do cidadão, implementado a partir das 39 seções de `codex.md`. React Native, Expo SDK 55, TypeScript e Expo Router. Interface em português, com cinco abas e dados fictícios de 15/09/2026.

## Iniciar

Requer Node.js 22 e npm. A versão está definida em `.nvmrc` e `package.json`.

```bash
npm install
npm run web
```

Abra a URL exibida pelo Expo e escolha **Entrar na demonstração**. Não é necessário informar dados pessoais. Para testar o campo de login, use `000.000.000-00`.

```bash
npm start       # QR code / servidor Expo
npm run android # emulador Android ou dispositivo configurado
npm run ios     # simulador iOS, requer macOS e Xcode
```

Use um cliente Expo compatível com SDK 55. Câmera e compartilhamento nativo dependem das permissões e recursos do aparelho.

## Publicar na Vercel

O projeto está configurado para publicação web estática. Importe o repositório na Vercel, selecione **Other** como framework e mantenha a raiz do projeto como **Root Directory**. O `vercel.json` define automaticamente:

| Configuração          | Valor                               |
| --------------------- | ----------------------------------- |
| Node.js               | `22.x` (definido no `package.json`) |
| Install Command       | `npm ci`                            |
| Build Command         | `npm run build`                     |
| Output Directory      | `dist`                              |
| Variáveis de ambiente | Nenhuma necessária                  |

Clique em **Deploy**. As rotas internas têm fallback para `index.html`, permitindo abrir links e recarregar telas como `/boletos` e `/processo/regularizacao`.

Passo a passo, alternativa por CLI e verificação após publicar em [docs/deploy-vercel.md](docs/deploy-vercel.md).

## Percursos para apresentação

1. **Início → Meu imóvel → Chácara Boa Esperança → Processo → Resolver agora → Escolher arquivo → Enviar documento → Ver processo atualizado.** Anexe um PDF ou imagem de teste. O envio resolve a pendência, registra movimentação e alerta; a análise técnica continua em andamento.
2. **Início → Gerar boleto.** Consulte o valor, copie o código fictício, compartilhe ou gere PDF. No navegador, use “Salvar como PDF” na janela de impressão.
3. **Início → Editais → Edital 03/2026 → Acompanhar edital.** Veja a atualização simulada em Alertas. O PDF é demonstrativo, sem validade oficial.
4. **Serviços → Novo requerimento.** Selecione serviço e imóvel, anexe arquivo/foto ou reutilize um documento da carteira, acrescente uma mensagem e revise antes de enviar. O protocolo gerado abre um novo processo. “Salvar rascunho e sair” permite continuar após recarregar.
5. **Serviços → Certidão Negativa / Agendar atendimento.** Resultado de certidão e reserva de horário simulados.
6. **Perfil → Configurações.** Simule falta de conexão ou restaure a base inicial para outra apresentação.

Também disponíveis: carteira de documentos com visualização/substituição/download, imóveis, mapa ilustrado, monitoramento com e sem ocorrência, jornada educativa expansível, notícias, atendimento com solicitações locais, edição de contato e logout.

## Organização

- `src/app`: layouts e rotas do Expo Router.
- `src/features`: telas agrupadas por domínio.
- `src/components` e `src/theme`: componentes acessíveis, ilustrações SVG locais e tokens visuais.
- `src/types` e `src/mocks`: modelos e base fictícia.
- `src/services`: contrato de repositório, persistência, transições de domínio e operações com arquivos.
- `src/hooks`: sessão, estado compartilhado e feedback.
- `tests`: testes de domínio e percursos Playwright.

Decisões e rotas em [docs/architecture.md](docs/architecture.md).

## Verificações

```bash
npm run typecheck
npm run lint
npm test
npx playwright install chromium # uma vez por ambiente
npm run test:e2e
npm run build:web
```

`npm run format` formata o código. Os testes de navegador usam porta 8081, viewport de smartphone e verificações em 320 e 1440 px. Relatório de validação: [docs/validation.md](docs/validation.md).

## Escopo do protótipo

- Sem API ETR, autenticação governamental, pagamento real ou notificações push.
- Documentos oficiais, boletos, certidões, notícias, contatos e mapas são ilustrativos. PDFs exibem marcação de demonstração.
- Sessão, preferências, rascunhos e ações ficam no armazenamento local. Anexos são mantidos em IndexedDB no navegador e no diretório de documentos do app nos dispositivos. Restaurar a demonstração remove os anexos do protótipo.
- Sem sincronização offline com servidor. Dados já carregados continuam acessíveis; há aviso de perda de conexão e opção de simulação. A versão web precisa carregar inicialmente antes de ficar sem internet.
- A câmera exige permissão e, no navegador, contexto seguro e suporte do dispositivo. Há alternativa de upload de arquivos.
- A interface e a arquitetura são compartilhadas entre web, Android e iOS. A validação automatizada desta entrega é web; recursos nativos devem ser conferidos em aparelhos antes da distribuição.
- Para produção: implementar autenticação segura, validação no servidor, armazenamento protegido, upload autenticado, contratos de APIs e política de privacidade oficial.

As dependências são alinhadas pelo `expo install` conforme a [documentação do Expo](https://docs.expo.dev/versions/latest/). O site institucional de referência retornou HTTP 403 na inspeção; a direção visual foi baseada no documento do projeto.
