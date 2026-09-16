# Validação da entrega

Data: 15/09/2026. Ambiente: Node 22, Expo SDK 55, React Native 0.83.10, Chromium via Playwright.

## Verificações realizadas

| Verificação                                                  | Resultado                                |
| ------------------------------------------------------------ | ---------------------------------------- |
| TypeScript estrito (`npm run typecheck`)                     | Sem erros                                |
| ESLint (`npm run lint`)                                      | Sem erros ou avisos                      |
| Formatação Prettier                                          | Arquivos formatados                      |
| Compatibilidade de dependências (`expo install --check`)     | Alinhadas ao mapa local do SDK 55        |
| Testes de domínio                                            | 4 aprovados                              |
| Testes de navegador                                          | 7 cenários aprovados                     |
| Exportação web, Android e iOS (`expo export --platform all`) | Bundles gerados em `dist/`               |
| Inspeção visual da Home                                      | Capturas revisadas em 320, 390 e 1440 px |

## Percursos exercitados

- Login fictício → imóveis → processo → timeline → upload real de arquivo de teste → resolução da pendência de envio → movimentação atualizada → recarga → download do mesmo anexo.
- Boleto → código copiado → edital → acompanhar → persistência → alerta gerado.
- Requerimento em cinco etapas → salvar rascunho → recarga → reutilizar documento → mensagem → revisão → confirmação → novo protocolo e processo.
- Consulta de certidão → agendamento com data/horário → confirmação → filtros sem resultados.
- Documentos, mapa, monitoramento, jornada, atendimento, notícias, perfil, configurações, modo offline simulado e logout; sem exceções JavaScript nessas rotas.
- Janela de PDF com título e marcação de documento fictício corretos → dados locais inválidos → tela de erro → restauração funcional.
- Marcar alertas como lidos → lista vazia → desconexão real do navegador → aviso sem bloquear conteúdo → estados sem processos, sem boletos e sem pendências.

## Limites da validação

- Bundles Android/iOS foram exportados; não foram executados em aparelho ou emulador. Câmera, seletores nativos, compartilhamento e áreas seguras precisam de validação em dispositivos.
- PDF web validado pela janela de impressão do documento. O usuário conclui “Salvar como PDF” no diálogo do navegador. A impressão física não foi testada.
- Acessibilidade inclui rótulos, ícones decorativos ocultos, toques de pelo menos 48 px, texto escalável e estados com texto/ícone; não substitui uma auditoria com VoiceOver/TalkBack.
- A instalação npm indicou 13 vulnerabilidades moderadas na árvore de dependências. Não foi aplicada atualização forçada que alterasse a matriz do Expo; revisar dependências antes de uma distribuição de produção.
- O site institucional respondeu HTTP 403. Identidade e conteúdo seguem o `codex.md`; não houve validação institucional dos dados fictícios.
