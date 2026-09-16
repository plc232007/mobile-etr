# ETR MOBILE — PROTÓTIPO MOBILE PARA USUÁRIO FINAL

## 1. CONTEXTO DO PROJETO

Precisamos criar do zero um protótipo funcional e navegável de um aplicativo mobile para a **ETR — Empresa de Regularização de Terras Rurais do Distrito Federal**.

Referência institucional:

https://www.etr.df.gov.br/

O aplicativo será voltado principalmente ao **usuário final/cidadão**, especialmente produtores, ocupantes e responsáveis por imóveis rurais que utilizam os serviços da ETR.

O objetivo NÃO é simplesmente transformar o site atual em um aplicativo.

O app deve funcionar como uma:

> Central pessoal de relacionamento do cidadão com a ETR, permitindo acompanhar sua jornada de regularização rural, consultar processos, resolver pendências, emitir documentos, visualizar boletos, acompanhar editais e receber notificações importantes.

A experiência deve priorizar:

- simplicidade;
- clareza;
- acessibilidade;
- sensação de segurança;
- facilidade de acompanhamento;
- redução de burocracia;
- linguagem compreensível;
- navegação intuitiva;
- boa experiência para usuários pouco familiarizados com tecnologia.

---

# 2. OBJETIVO PRINCIPAL

Criar um MVP visualmente profissional e funcional que possa ser utilizado para:

- apresentação interna;
- validação de UX;
- demonstração para gestores;
- discussão com a ETR;
- evolução futura para um aplicativo real.

Neste momento, NÃO é necessário implementar integração real com APIs da ETR.

Utilizar dados mockados realistas.

Entretanto, a arquitetura do código deve permitir que futuramente os mocks sejam substituídos por APIs reais.

---

# 3. TECNOLOGIA

Caso o projeto esteja vazio, utilizar:

- React Native;
- Expo;
- TypeScript;
- Expo Router;
- componentes reutilizáveis;
- arquitetura organizada;
- dados mockados separados da interface.

Utilizar uma estrutura moderna e escalável.

Sugestão:

```text
src/
  components/
  screens/
  features/
  services/
  mocks/
  types/
  hooks/
  utils/
  constants/
  theme/
```

Se houver uma organização melhor para Expo Router, adapte a estrutura.

Não concentrar todo o código em poucos arquivos.

---

# 4. PRINCÍPIOS DE UX

O usuário não deve sentir que está utilizando um sistema administrativo governamental antigo.

Evitar:

- telas carregadas;
- tabelas complexas;
- excesso de texto;
- excesso de siglas;
- formulários gigantes;
- menus com dezenas de opções;
- aparência genérica de template;
- estética de dashboard empresarial;
- design parecido com aplicativo bancário genérico;
- aparência de site desktop comprimido em uma tela mobile.

Priorizar:

- cards;
- status visuais;
- timelines;
- checklists;
- etapas;
- feedback imediato;
- linguagem simples;
- ícones claros;
- botões grandes;
- hierarquia visual;
- informação contextual.

---

# 5. DIREÇÃO VISUAL

A interface deve transmitir:

- confiança;
- institucionalidade;
- modernidade;
- proximidade com o cidadão;
- campo;
- território;
- sustentabilidade;
- regularização fundiária.

Utilizar como inspiração as cores e identidade institucional da ETR, mas modernizar a aplicação para mobile.

Evitar copiar literalmente o website.

A interface deve parecer um aplicativo desenvolvido especificamente para a ETR.

Utilizar:

- fundos claros;
- bastante espaço em branco;
- tons de verde institucionais;
- tons neutros;
- destaque moderado em amarelo/laranja para alertas;
- vermelho apenas para erros ou situações críticas;
- bordas arredondadas moderadas;
- sombras sutis;
- tipografia legível.

Criar sistema visual consistente.

---

# 6. NAVEGAÇÃO PRINCIPAL

Utilizar uma bottom navigation com:

1. Início
2. Processos
3. Serviços
4. Alertas
5. Perfil

Não colocar Notícias como item principal da bottom navigation.

---

# 7. TELA INICIAL — HOME

A Home deve funcionar como um dashboard pessoal do cidadão.

Ela NÃO deve ser apenas uma grade de serviços.

Estrutura sugerida:

```text
ETR

Olá, João 👋

Minha regularização
Chácara Boa Esperança

● Em análise documental

[ Ver andamento ]


ATENÇÃO

Você possui 1 pendência

Cadastro Ambiental Rural — CAR
Documento ainda não enviado.

[ Resolver agora ]


PRÓXIMO VENCIMENTO

Parcela CDU
20/09/2026

R$ 1.245,70

[ Gerar boleto ]


ACESSO RÁPIDO

Requerimento
Certidão
Editais
Meu imóvel


ÚLTIMAS ATUALIZAÇÕES

Hoje
Seu documento foi recebido.

12 SET
Seu processo entrou em análise técnica.
```

A Home deve priorizar informações pessoais antes de serviços institucionais genéricos.

---

# 8. MEUS PROCESSOS / MINHA REGULARIZAÇÃO

Essa é uma das áreas mais importantes do aplicativo.

Criar:

## Lista de processos

Exemplo:

```text
Regularização fundiária

Protocolo
2026.000123

Chácara Boa Esperança

Status:
Em análise técnica
```

---

## Detalhe do processo

Criar uma timeline visual.

Exemplo:

```text
Regularização fundiária

Protocolo 2026.000123


✓ Solicitação recebida
03/08/2026

✓ Documentação conferida
08/08/2026

● Análise técnica
Em andamento

○ Análise jurídica

○ Aprovação

○ Emissão do contrato

○ Regularização concluída
```

Incluir:

- situação atual;
- protocolo;
- imóvel relacionado;
- data de abertura;
- últimas movimentações;
- documentos;
- pendências;
- mensagens relacionadas.

---

# 9. CENTRAL DE PENDÊNCIAS

Criar uma seção específica de pendências.

Exemplo:

```text
Pendências

Você possui 2 itens para resolver.


Cadastro Ambiental Rural — CAR

Necessário para continuar
a análise do processo.

[ Enviar documento ]


Documento de identificação

Documento expirado.

[ Atualizar ]
```

Cada pendência deve explicar:

- o que é;
- por que está sendo solicitada;
- como resolver;
- prazo, se existir.

---

# 10. DOCUMENTOS

Criar uma carteira digital de documentos.

Categorias:

- documentos pessoais;
- documentos do imóvel;
- documentos de regularização;
- certidões;
- contratos;
- comprovantes;
- documentos enviados em requerimentos.

Exemplo:

```text
Meus documentos

Cadastro Ambiental Rural
CAR

✓ Válido

Emitido em
03/02/2026

[ Visualizar ]


Documento de identidade

⚠ Atualização necessária

[ Atualizar ]
```

Permitir:

- visualizar;
- compartilhar;
- baixar;
- substituir;
- reutilizar em novos requerimentos.

---

# 11. MEUS IMÓVEIS

O usuário pode possuir mais de um imóvel.

Criar tela:

```text
Meus imóveis

Chácara Boa Esperança
Sobradinho — DF

12,4 ha

Regularização
Em análise

[ Ver imóvel ]
```

---

## Detalhe do imóvel

Mostrar:

- nome;
- localização;
- região administrativa;
- tamanho aproximado;
- número identificador;
- situação da regularização;
- processos;
- documentos;
- boletos;
- editais relacionados;
- mapa.

---

# 12. MAPA / ETR GEO

Não construir um sistema GIS complexo.

Criar uma experiência simplificada para o usuário final.

Mostrar:

- localização aproximada;
- polígono do imóvel;
- dados básicos;
- área;
- região;
- possíveis informações relacionadas à regularização.

Exemplo:

```text
Meu imóvel

[ MAPA ]

Chácara Boa Esperança

Área
12,4 ha

Região
Sobradinho — DF

Situação territorial
Identificado

[ Ver informações ]
```

Separar conceitualmente o app mobile das ferramentas técnicas de geoprocessamento utilizadas internamente.

---

# 13. REQUERIMENTO ONLINE

Transformar requerimentos em um fluxo guiado.

NÃO utilizar um formulário único gigante.

Utilizar etapas.

Exemplo:

```text
Novo requerimento

Etapa 1 de 5

Qual serviço você deseja solicitar?

○ Regularização fundiária
○ Atualização cadastral
○ Solicitação de documento
○ Outros
```

Depois:

```text
Etapa 2 de 5

Selecione o imóvel

● Chácara Boa Esperança
○ Fazenda São José
```

Depois:

```text
Etapa 3 de 5

Documentos

✓ Identificação
✓ Comprovante de ocupação
○ CAR

[ Adicionar documento ]
```

Permitir:

- anexar arquivo;
- tirar foto pela câmera;
- escolher documento já salvo;
- salvar rascunho.

Criar tela final de revisão.

Depois da confirmação:

```text
Requerimento enviado!

Protocolo:
2026.000456

Você será notificado
quando houver atualizações.

[ Ver requerimento ]
```

---

# 14. BOLETOS / FINANCEIRO

Criar uma área chamada:

"Boletos"

ou

"Financeiro"

Mostrar:

- em aberto;
- vencidos;
- pagos.

Exemplo:

```text
Boletos

EM ABERTO

Parcela CDU

Vencimento
20 SET 2026

R$ 1.245,70

[ Gerar boleto ]


PAGOS

Parcela CDU
20 AGO 2026

R$ 1.245,70

✓ Pago
```

Detalhe do boleto:

- valor;
- vencimento;
- descrição;
- situação;
- linha digitável mockada;
- botão copiar código;
- botão compartilhar;
- gerar PDF.

Caso seja apropriado, preparar visualmente espaço para PIX futuro.

Não implementar pagamento real.

---

# 15. CERTIDÃO NEGATIVA

Criar fluxo extremamente simples.

```text
Certidão Negativa

Consulte ou emita sua
certidão relacionada à ETR.

CPF
***.***.***-**

[ Consultar ]
```

Resultado:

```text
Situação

✓ Certidão disponível

Emitida em
15/09/2026

Válida até
15/10/2026

[ Visualizar ]
[ Compartilhar ]
```

Criar histórico de certidões.

---

# 16. EDITAIS

Criar uma experiência muito melhor do que simplesmente disponibilizar PDFs.

Tela:

```text
Editais

[ Buscar edital ]

Filtros:
Todos
Em andamento
Encerrados
Minha região
```

Card:

```text
EDITAL 03/2026

Fazenda Contagem de São João
Sobradinho II

INSCRIÇÕES ABERTAS

18 dias restantes

Seu imóvel pode estar
relacionado a este edital.

[ Ver detalhes ]
```

---

## Detalhes do edital

Mostrar:

- número;
- região;
- prazo;
- situação;
- descrição simplificada;
- documentos necessários;
- etapas;
- botão para acompanhar;
- botão para ver PDF oficial.

Exemplo:

```text
Documentos necessários

✓ Identificação
✓ Comprovante de ocupação
○ CAR
○ PU ou DIU
○ ART
```

Adicionar:

[ Acompanhar edital ]

Ao acompanhar, o usuário deverá receber notificações mockadas sobre alterações.

---

# 17. ETR MONITORA

Criar conceito simplificado para o cidadão.

Não expor informações técnicas internas.

Exemplo:

```text
Monitoramento do imóvel

Chácara Boa Esperança

Última atualização
08/09/2026

✓ Imóvel identificado

✓ Limites cadastrados

✓ Nenhuma ocorrência
exibida no momento


[ Visualizar no mapa ]
```

Criar também um estado com ocorrência:

```text
Atenção

Foi identificada uma atualização
relacionada ao seu imóvel.

[ Ver informações ]
```

Evitar utilizar linguagem acusatória ou conclusões automáticas.

---

# 18. JORNADA DA REGULARIZAÇÃO

Criar uma tela educativa e contextual.

Exemplo:

```text
Sua jornada

1
Identificação do imóvel
✓ Concluído

2
Documentação
8 de 9 documentos

3
Análise da ETR
Em andamento

4
Concessão de Direito de Uso
Ainda não iniciado

5
Regularização concluída
```

Cada etapa deve poder ser aberta.

Mostrar:

- o que significa;
- quem é responsável;
- documentos necessários;
- o que o usuário precisa fazer;
- possíveis próximos passos.

---

# 19. NOTIFICAÇÕES / ALERTAS

Criar central de alertas.

Tipos:

### Processo

```text
Seu processo avançou

O processo 2026.000123
entrou em análise técnica.

Hoje, 10:32
```

### Pendência

```text
Documento necessário

Precisamos do seu CAR
para continuar a análise.

[ Resolver agora ]
```

### Boleto

```text
Seu boleto vence em 5 dias

R$ 1.245,70

[ Ver boleto ]
```

### Edital

```text
Atualização em edital

O edital 03/2026 teve
uma nova publicação.

[ Ver edital ]
```

Criar estados lido/não lido.

---

# 20. NOTÍCIAS

Criar feed institucional simples.

Não dar prioridade maior às notícias do que às informações pessoais do usuário.

Card:

```text
ETR inicia nova etapa de
regularização em região rural

12 SET 2026

[ Ler notícia ]
```

Criar tela de detalhes.

---

# 21. ATENDIMENTO

Criar uma central de ajuda.

Opções:

- conversar com atendimento;
- dúvidas frequentes;
- agendar atendimento;
- telefone;
- endereço;
- acompanhar solicitação.

Exemplo:

```text
Como podemos ajudar?

[ Conversar com a ETR ]

[ Agendar atendimento ]

[ Dúvidas frequentes ]

[ Telefones e endereço ]
```

---

# 22. AGENDAMENTO

Criar fluxo de:

1. motivo do atendimento;
2. escolha de unidade;
3. calendário;
4. horário;
5. confirmação.

Utilizar dados fictícios.

---

# 23. PERFIL

Criar:

- dados pessoais;
- CPF/CNPJ;
- telefone;
- e-mail;
- dados de contato;
- imóveis vinculados;
- documentos;
- configurações;
- notificações;
- privacidade;
- segurança;
- sair.

---

# 24. LOGIN

Criar login simples.

```text
Acesse sua conta

CPF ou CNPJ

[ Continuar ]

Esqueci minha senha

Primeiro acesso
```

Não implementar autenticação real.

Criar usuário mockado.

Exemplo:

Nome:
João da Silva

CPF:
**_._**.**\*-**

---

# 25. DADOS MOCKADOS

Criar pelo menos:

## Usuário

João da Silva

## Imóveis

### Chácara Boa Esperança

Região:
Sobradinho — DF

Área:
12,4 ha

Situação:
Regularização em andamento

---

### Fazenda São José

Região:
Planaltina — DF

Área:
28,7 ha

Situação:
Documentação pendente

---

## Processo

Protocolo:

2026.000123

Tipo:

Regularização fundiária

Status:

Análise técnica

---

## Pendência

Cadastro Ambiental Rural — CAR

---

## Boleto

Valor:

R$ 1.245,70

Vencimento:

20/09/2026

---

## Edital

Edital 03/2026

Fazenda Contagem de São João

Status:

Inscrições abertas

---

# 26. COMPONENTES REUTILIZÁVEIS

Criar componentes como:

- AppHeader;
- BottomNavigation;
- StatusBadge;
- ProcessCard;
- PropertyCard;
- AlertCard;
- PendingCard;
- DocumentCard;
- PaymentCard;
- NoticeCard;
- NewsCard;
- Timeline;
- ProgressSteps;
- EmptyState;
- ErrorState;
- LoadingState;
- SectionHeader;
- PrimaryButton;
- SecondaryButton;
- InfoCard;
- SearchBar;
- FilterChip.

Evitar duplicação de código.

---

# 27. ESTADOS DE INTERFACE

Criar estados adequados para:

- loading;
- erro;
- lista vazia;
- sucesso;
- sem internet;
- nenhum processo;
- nenhum boleto;
- nenhuma pendência;
- nenhum edital encontrado.

Exemplo:

```text
Tudo certo por aqui

Você não possui nenhuma
pendência no momento.
```

---

# 28. CONECTIVIDADE

Considerar que parte dos usuários pode acessar o sistema em áreas rurais com conexão limitada.

Projetar a UX levando isso em consideração.

Exemplos:

- mensagens claras em caso de conexão ruim;
- evitar dependência excessiva de imagens pesadas;
- permitir visualizar informações já carregadas;
- evitar bloquear toda a experiência por perda momentânea de internet.

Não é necessário implementar offline completo nesta versão.

---

# 29. ACESSIBILIDADE

Dar atenção especial a:

- tamanho mínimo de toque;
- legibilidade;
- contraste;
- fontes;
- textos claros;
- suporte a leitores de tela onde possível;
- evitar depender somente de cores para indicar status.

---

# 30. MICROCOPY

Evitar linguagem excessivamente burocrática.

Por exemplo, em vez de:

"Documentação encontra-se pendente de complementação."

Utilizar:

"Precisamos de mais um documento para continuar sua análise."

Em vez de:

"Processo protocolizado."

Utilizar:

"Seu pedido foi enviado com sucesso."

Manter termos oficiais quando necessários, mas sempre acompanhados de explicação.

---

# 31. ORDEM DE PRIORIDADE

Construir primeiro:

1. Design system básico;
2. Navegação;
3. Login;
4. Home;
5. Meus Processos;
6. Detalhe do Processo;
7. Pendências;
8. Requerimentos;
9. Boletos;
10. Editais;
11. Meus Imóveis;
12. Documentos.

Depois implementar:

13. Certidão Negativa;
14. GEO;
15. ETR Monitora;
16. Alertas;
17. Jornada da Regularização;
18. Atendimento;
19. Agendamento;
20. Notícias;
21. Perfil.

---

# 32. RESPONSIVIDADE

O foco principal é smartphone.

Projetar considerando principalmente:

- Android;
- iPhone.

Utilizar dimensões responsivas.

Não criar telas dependentes de largura específica.

---

# 33. ANIMAÇÕES

Utilizar animações sutis quando agregarem à experiência.

Exemplos:

- transição entre etapas;
- expansão de cards;
- feedback após envio;
- mudança de status;
- skeleton loading.

Não exagerar.

---

# 34. QUALIDADE VISUAL

Este projeto será apresentado para stakeholders.

Portanto:

Não entregar aparência de wireframe cru.

Criar uma interface próxima de um produto real.

Usar:

- ícones consistentes;
- espaçamentos bem definidos;
- boa hierarquia tipográfica;
- cards;
- estados;
- microinterações;
- conteúdo realista.

---

# 35. REGRA IMPORTANTE

Não inventar funcionalidades complexas sem necessidade.

Sempre pensar:

> Isso ajuda o cidadão a entender sua situação ou realizar alguma ação?

Se a resposta for não, provavelmente não deve ganhar destaque.

---

# 36. PRINCIPAL CONCEITO DO PRODUTO

O aplicativo não deve transmitir:

> "Aqui estão os serviços da ETR."

Ele deve transmitir:

> "Aqui está tudo o que você precisa saber e fazer em relação ao seu imóvel e à sua regularização."

Essa diferença deve orientar todas as decisões de UX.

---

# 37. RESULTADO ESPERADO

Ao finalizar, quero conseguir iniciar o projeto e navegar por uma experiência completa contendo:

```text
Login
 ↓
Home
 ↓
Meu imóvel
 ↓
Processo
 ↓
Timeline
 ↓
Pendência
 ↓
Enviar documento
 ↓
Processo atualizado
```

Também:

```text
Home
 ↓
Boletos
 ↓
Detalhe do boleto
```

Também:

```text
Home
 ↓
Editais
 ↓
Detalhes do edital
 ↓
Acompanhar edital
```

Também:

```text
Serviços
 ↓
Novo requerimento
 ↓
Etapas
 ↓
Documentos
 ↓
Revisão
 ↓
Protocolo
```

Todos os fluxos devem estar navegáveis usando dados mockados.

---

# 38. ANTES DE IMPLEMENTAR

Antes de começar a escrever muitas telas:

1. analise todo este documento;
2. analise o projeto atual;
3. defina a arquitetura;
4. defina o sistema visual;
5. defina os componentes reutilizáveis;
6. defina os modelos TypeScript;
7. defina os dados mockados;
8. defina as rotas.

Depois comece a implementação.

Se existir alguma decisão técnica pequena não especificada aqui, tome a decisão que resultar na melhor experiência mobile e em código mais sustentável.

Não pare o desenvolvimento para perguntar sobre decisões pequenas.

---

# 39. AO FINAL

Antes de considerar a tarefa concluída:

- execute o projeto;
- corrija erros de TypeScript;
- corrija erros de lint;
- verifique imports;
- verifique rotas quebradas;
- confira se todos os principais botões navegam corretamente;
- confira se as telas possuem dados mockados;
- confira estados vazios;
- confira estados de loading;
- confira a consistência visual;
- revise textos;
- remova componentes ou arquivos não utilizados.

O projeto deve ficar pronto para demonstração.
