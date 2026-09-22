# Implementação do briefing de protótipos

Referência: `prototipos_etr.md`. A evolução altera a experiência, preservando as regras e os dados de demonstração.

## Inventário e decisões

| Área existente                | Reaproveitamento e evolução                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Login, perfil e configurações | Sessão local e dados de contato preservados; apresentações coerentes com cada proposta.                                                          |
| Processos e jornada           | Protocolos, status, movimentações e sete etapas existentes; resumo passa a mostrar última atualização e pendências nos modelos 2 e 3.            |
| Requerimento                  | Cinco etapas reais do protótipo, rascunho persistente, upload e documentos salvos; campos obrigatórios explicados e erros próximos ao avanço.    |
| Pendências e carteira         | Envio, substituição, visualização, download e reutilização mantidos. Envio não representa aprovação.                                             |
| Boletos                       | Referência, status, vencimento, valor e geração de PDF existentes; sem pagamento real ou indicadores novos.                                      |
| Certidão                      | Consulta simulada e histórico existentes; a home pessoal deriva a disponibilidade dos documentos, sem inventar impedimentos ou resultado fiscal. |
| Editais                       | Busca e filtros existentes; ordenação por prazo. Não há data de publicação no modelo de dados, portanto ela não foi criada.                      |
| Notícias                      | Conteúdo existente, ordenado por data, com resumo derivado do texto; abaixo dos serviços ou informações pessoais.                                |
| ETR Monitora                  | Entrada própria com seleção de imóvel; ocorrência e situação existentes. Funciona sem GEO.                                                       |
| ETR GEO                       | Módulo secundário dentro dos serviços; não ocupa o centro da arquitetura e não é necessário para o funcionamento do ETR Monitora.                |
| Atendimento e agendamento     | Fluxos, mensagens e agendamentos locais mantidos.                                                                                                |
| Alertas                       | Feed pessoal derivado dos alertas locais. Não foi implementado push nem integração externa.                                                      |

## Comparação para validação

- **Tradicional:** referência original; localizar funções na estrutura familiar.
- **Central de Serviços:** localizar e iniciar rapidamente requerimento, boleto e certidão pela home; buscar os demais serviços. Notícias têm destino na navegação mobile.
- **Minha ETR:** reconhecer pendências e atualizações antes de escolher uma ação. A home mostra andamento, boletos e certidão sem esconder essas informações em abas internas.

No desktop, modelos 2 e 3 usam navegação superior compacta. No mobile, mantêm cinco destinos com prioridades diferentes. Ícones têm rótulos, estados usam texto, controles têm áreas de toque e o navegador recebe foco visível para teclado.

## Dados e limites

Não foram adicionados imóveis, valores, datas, documentos oficiais, indicadores ou etapas de negócio. As datas são as da base de demonstração, cuja referência é 15/09/2026. A certidão só aparece na home após existir na carteira. Os mapas permanecem ilustrativos; não há georreferenciamento real ou dependência de fornecedor externo.

As alterações não adicionam bibliotecas, imagens remotas ou chamadas a APIs. O catálogo é estático, a pesquisa é local e as telas compartilham os fluxos existentes.

## Percursos de validação

1. Central de Serviços → busca por “certidao” → Certidão Negativa; início → boleto; início → requerimento com validação e rascunho.
2. Minha ETR → documento pendente → envio → retorno ao início e processo atualizado; consulta de certidão → retorno → visualização da certidão disponível.
3. Serviços → ETR GEO → selecionar imóvel; ETR Monitora continua acessível como serviço independente.
4. Alternar modelos e recarregar, preservando sessão, escolha e dados. Conferir 320, 390, 1000 e 1440 px e estados sem dados.

Os testes E2E em `tests/e2e` cobrem esses percursos e os fluxos originais.

Validação desta entrega: TypeScript, ESLint e build web aprovados; os 11 cenários de navegador passaram (10 na execução geral e o cenário de GEO confirmado na repetição direcionada, após corrigir um seletor ambíguo do teste). Layouts inspecionados em capturas mobile e desktop. A validação automatizada é web; não substitui testes em aparelhos Android/iOS.
