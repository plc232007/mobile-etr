# Protótipos Navegáveis — Aplicativo ETR

## 1. Contexto do Projeto

Todos os protótipos deste projeto têm como base o sistema da **ETR — Empresa de Regularização de Terras Rurais**, disponível em:

https://www.etr.df.gov.br/

O objetivo não é criar apenas variações visuais do mesmo sistema, mas propostas diferentes de experiência do usuário, mantendo a identidade institucional da ETR e respeitando o escopo funcional definido pelo cliente.

A modernização deve priorizar:

- melhoria da usabilidade;
- melhoria da experiência do usuário;
- melhoria de performance;
- facilidade de acesso aos serviços;
- clareza na navegação;
- acessibilidade;
- responsividade;
- experiência mobile first;
- redução de cliques e esforço cognitivo.

O sistema deve manter aparência institucional, confiável, moderna e simples, evitando estética genérica de SaaS, fintech, e-commerce ou dashboard corporativo.

---

## 2. Descrição do Cliente

> Solicita-se a realização de análise, desenvolvimento e evolução do Aplicativo ETR, com foco na melhoria da usabilidade, experiência do usuário e performance das soluções disponibilizadas.

### Itens contemplados no escopo inicial

- Emissão de Boletos
- Requerimento Online
- Editais
- Certidão Negativa
- ETR GEO
- ETR MONITORA
- Notícias

### Observação sobre o ETR GEO

A inclusão do **ETR GEO** no aplicativo ainda precisa ser avaliada, considerando que a Terracap possui uma empresa responsável pelo georreferenciamento.

Por isso:

- o módulo deve ser tratado como opcional;
- ele não deve ser o centro da arquitetura do aplicativo;
- a interface deve continuar funcionando normalmente caso o módulo seja removido;
- caso já exista no protótipo, ele pode permanecer preparado visualmente.

---

# 3. Estratégia dos Três Protótipos

Os três modelos devem representar propostas diferentes de experiência.

## Modelo 1 — Tradicional

O Modelo 1 permanece como a alternativa mais próxima da estrutura atual.

Objetivo:

- modernizar a interface;
- melhorar espaçamentos;
- melhorar hierarquia visual;
- modernizar componentes;
- manter uma navegação mais tradicional;
- não alterar significativamente a arquitetura de interação.

Ele funciona como referência para comparação com os outros modelos.

---

# 4. Modelo 2 — Central de Serviços ETR

## Conceito

O Modelo 2 deve seguir o conceito:

**CENTRAL DE SERVIÇOS ETR**

O usuário deve abrir o aplicativo e responder rapidamente à pergunta:

> O que você deseja fazer?

A interface deve ser orientada a serviços e não a indicadores administrativos.

Não criar um dashboard corporativo tradicional.

Não priorizar gráficos, métricas internas ou estatísticas.

---

## 4.1 Home

Criar uma home simples, moderna e orientada a ações.

Estrutura conceitual:

```text
Olá, [Nome]

O que você precisa?

[ Buscar serviço... ]
```

Abaixo, apresentar os principais serviços disponíveis.

### Serviços principais

- Emitir Boleto
- Requerimento Online
- Certidão Negativa

### Serviços secundários

- Editais
- ETR Monitora
- Notícias
- ETR GEO, quando aplicável

Os serviços não precisam aparecer todos com o mesmo tamanho ou destaque.

Criar hierarquia visual.

Exemplo:

```text
┌──────────────────────────────────────┐
│ Requerimento Online                 │
│ Faça uma nova solicitação à ETR.    │
│                              Iniciar│
└──────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────┐
│ Emitir boleto    │ │ Certidão Negativa│
│ Consultar        │ │ Solicitar        │
└──────────────────┘ └──────────────────┘
```

Evitar transformar todos os elementos em cards grandes e idênticos.

---

## 4.2 Navegação

Evitar sidebar grande.

### Desktop

```text
[ETR]  Início | Serviços | Meus Requerimentos | Notícias | Ajuda | Perfil
```

### Mobile

Utilizar navegação inferior quando adequado:

```text
[Início] [Serviços] [Solicitações] [Notícias] [Perfil]
```

Os serviços menos utilizados podem ficar agrupados dentro de **Serviços**.

---

## 4.3 Emissão de Boletos

A experiência deve ser direta e fácil de compreender.

Exibir apenas informações realmente existentes no sistema.

Exemplo:

```text
Boleto 09/2026

Vencimento: 30/09/2026
Status: Disponível

[Visualizar]
[Emitir boleto]
```

Priorizar:

- referência;
- situação;
- vencimento;
- valor, caso exista;
- ação disponível.

Evitar tabelas complexas principalmente no celular.

---

## 4.4 Requerimento Online

Este deve ser um dos serviços de maior destaque.

Criar fluxo claro para abertura de requerimento.

Exemplo conceitual:

```text
Nova solicitação

1. Tipo de requerimento
2. Dados
3. Documentos
4. Revisão
5. Envio
```

Utilizar stepper somente se o formulário realmente possuir etapas.

Durante o preenchimento:

- mostrar campos obrigatórios;
- validar dados;
- permitir avançar e voltar;
- apresentar erros próximos aos campos;
- evitar perda de dados;
- mostrar resumo antes do envio.

Após o envio:

```text
Requerimento enviado com sucesso.

Protocolo:
XXXXXX

[Acompanhar requerimento]
```

---

## 4.5 Certidão Negativa

A experiência deve ser simples e direta.

Exemplo:

```text
Certidão Negativa

Consulte ou solicite sua certidão.

[Solicitar certidão]
```

Caso exista uma certidão disponível:

```text
Certidão emitida em XX/XX/XXXX

[Visualizar]
[Baixar]
```

Caso exista alguma pendência ou impedimento, apresentar mensagem clara.

---

## 4.6 Editais

Criar uma listagem moderna.

Permitir, quando aplicável:

- busca;
- filtros;
- ordenação por data.

Exemplo:

```text
Edital nº 123/2026

Publicado em 15/09/2026

Descrição resumida do edital.

[Ver edital]
```

Evitar excesso de informações na listagem.

---

## 4.7 Notícias

Criar uma seção editorial simples.

Cada notícia pode conter:

- imagem;
- título;
- data;
- resumo curto.

Na home, mostrar somente as notícias mais recentes.

Exemplo:

```text
Últimas notícias

[Imagem]
Título da notícia
Resumo breve...

[Leia mais]

[Ver todas as notícias]
```

As notícias não devem competir visualmente com os serviços principais.

---

## 4.8 ETR Monitora

Criar uma área específica utilizando somente informações realmente existentes no projeto.

Priorizar:

- consulta;
- acompanhamento;
- situação;
- histórico;
- detalhes relevantes.

Não inventar indicadores ou funcionalidades.

---

## 4.9 ETR GEO

Tratar como módulo opcional.

### Quando habilitado

O item aparece normalmente na área de serviços.

### Quando desabilitado

A interface deve continuar equilibrada, sem espaços vazios ou dependências estruturais.

Não construir a arquitetura do aplicativo ao redor desse módulo.

---

## 4.10 Identidade Visual

Preservar:

- logotipo;
- cores institucionais;
- referências oficiais;
- identidade relacionada à ETR e ao Governo do Distrito Federal quando aplicável.

A modernização deve parecer uma evolução natural do sistema.

Podem existir referências visuais sutis relacionadas a:

- território;
- campo;
- propriedades rurais;
- mapas;
- regularização fundiária.

Evitar temática rural exagerada.

---

## 4.11 Estilo Visual

A interface deve ser:

- clara;
- institucional;
- moderna;
- acessível;
- amigável;
- simples de aprender.

Utilizar:

- boa tipografia;
- espaços bem definidos;
- bordas sutis;
- ícones simples;
- hierarquia visual forte;
- contraste adequado.

Evitar:

- excesso de cards;
- glassmorphism;
- gradientes excessivos;
- sombras fortes;
- gráficos desnecessários;
- aparência de sistema financeiro;
- aparência de SaaS genérico.

---

## 4.12 Responsividade

O sistema deve ser pensado como **mobile first**.

Não desenvolver o desktop para depois simplesmente reduzir tudo.

No celular:

- priorizar serviços;
- aumentar áreas clicáveis;
- apresentar conteúdo em coluna;
- evitar tabelas horizontais;
- facilitar formulários;
- utilizar botões claros;
- fornecer feedback após ações.

---

## 4.13 Acessibilidade

Considerar:

- contraste adequado;
- foco visível;
- labels;
- áreas de toque confortáveis;
- textos legíveis;
- botões com nomes claros;
- mensagens compreensíveis;
- não depender apenas de cor para representar status.

---

## 4.14 Diferencial do Modelo 2

O Modelo 2 deve ser reconhecido imediatamente como:

**um aplicativo orientado a serviços.**

A home deve funcionar como uma central de funcionalidades.

O cidadão não precisa entender a estrutura interna da ETR.

Ele deve conseguir rapidamente:

- emitir boleto;
- realizar requerimento;
- solicitar certidão;
- consultar edital;
- acessar o ETR Monitora;
- consultar notícias.

---

# 5. Modelo 3 — Minha ETR

## Conceito

O Modelo 3 deve seguir o conceito:

**MINHA ETR / CENTRAL PESSOAL**

Enquanto o Modelo 2 responde:

> O que você quer fazer?

O Modelo 3 responde:

> O que está acontecendo comigo dentro da ETR?

A interface deve ser orientada à situação atual do usuário.

---

## 5.1 Perguntas que a Home deve responder

Ao abrir o aplicativo, o cidadão deve rapidamente entender:

- tenho alguma pendência?
- meu requerimento avançou?
- tenho boleto disponível?
- preciso enviar algum documento?
- minha certidão está disponível?
- aconteceu alguma atualização importante?

A home não deve ser simplesmente uma grade de serviços.

---

## 5.2 Estrutura da Home

Exemplo conceitual:

```text
Olá, [Nome]

Veja o que precisa da sua atenção.

------------------------------------------

PENDÊNCIAS

⚠ Documento necessário

Existe uma pendência no requerimento XXXXX.

[Resolver]

------------------------------------------

REQUERIMENTO EM ANDAMENTO

Regularização XXXXX

✓ Enviado
✓ Documentação
● Em análise
○ Concluído

[Ver detalhes]

------------------------------------------

BOLETOS

1 boleto disponível

[Consultar]

------------------------------------------

CERTIDÃO

Certidão negativa disponível

[Visualizar]

------------------------------------------

AÇÕES RÁPIDAS

+ Novo requerimento
Emitir boleto
Solicitar certidão
```

---

## 5.3 Ordem de Prioridade

A home deve mostrar primeiro aquilo que exige atenção.

Ordem sugerida:

1. pendências;
2. ações obrigatórias;
3. requerimentos em andamento;
4. boletos;
5. certidões;
6. serviços rápidos;
7. editais;
8. notícias.

Assim, conteúdo institucional não compete com ações importantes.

---

## 5.4 Central de Atividades

Criar uma seção de atualizações recentes.

Exemplo:

```text
Hoje

Seu requerimento nº XXXXX avançou para análise.

Ontem

Documento recebido pela ETR.

15/09/2026

Boleto disponibilizado.

10/09/2026

Requerimento enviado.
```

Utilizar timeline ou feed de atividades.

Evitar linguagem técnica.

---

## 5.5 Requerimentos

Criar uma experiência voltada para acompanhamento.

Cada requerimento deve mostrar:

- assunto;
- protocolo;
- status;
- última atualização;
- existência de pendência.

Exemplo:

```text
Regularização de imóvel rural

Protocolo: 2026-001254
Status: Em análise
Atualizado em 12/09/2026
```

Ao abrir:

```text
Regularização XXXXX

Protocolo XXXXX

Status
Em análise

Última atualização
XX/XX/XXXX
```

---

## 5.6 Linha do Tempo do Requerimento

Utilizar uma representação visual clara.

Exemplo:

```text
✓ Solicitação enviada
      │
✓ Documentação recebida
      │
● Em análise
      │
○ Resultado
```

Não inventar etapas.

Utilizar somente dados realmente existentes no sistema.

---

## 5.7 Pendências

Pendências devem receber alta prioridade visual.

Exemplo:

```text
AÇÃO NECESSÁRIA

Envie o documento XXXX para dar continuidade ao seu requerimento.

Prazo:
XX/XX/XXXX

[Enviar documento]
```

Quando resolvida:

```text
✓ Pendência resolvida
```

---

## 5.8 Boletos

Na home:

```text
Boletos

2 disponíveis

[Ver boletos]
```

Na tela específica:

```text
Boleto XXXX

Vencimento:
XX/XX/XXXX

Status:
Disponível

[Visualizar]
[Emitir]
```

---

## 5.9 Certidão Negativa

Exemplo quando disponível:

```text
Certidão

Status:
Disponível

[Visualizar]
```

Exemplo quando não disponível:

```text
Certidão

Nenhuma certidão disponível.

[Solicitar]
```

---

## 5.10 Editais

Não devem ocupar área principal da home.

Exemplo:

```text
Últimos editais

Edital XXXX
Publicado em XX/XX/XXXX

[Ver]

[Ver todos]
```

---

## 5.11 Notícias

As notícias devem aparecer como conteúdo secundário.

Exemplo:

```text
Notícias da ETR

[Imagem]

Título da notícia

Resumo curto...

[Leia mais]
```

---

## 5.12 ETR Monitora

Caso existam informações relacionadas ao usuário:

```text
ETR Monitora

Última atualização:
XX/XX/XXXX

[Consultar]
```

O conteúdo completo deve ficar em tela específica.

---

## 5.13 ETR GEO

Manter como funcionalidade opcional.

Quando habilitado:

- incluir dentro da área de serviços;
- evitar destaque principal.

Quando desabilitado:

- nenhuma parte importante do aplicativo deve depender dele.

---

## 5.14 Navegação

### Desktop

Utilizar navegação global compacta.

Exemplo:

```text
[ETR]  Início | Solicitações | Serviços | Notícias | Ajuda | Perfil
```

### Mobile

Utilizar navegação inferior.

Exemplo:

```text
[Início] [Solicitações] [Serviços] [Notificações] [Perfil]
```

Não colocar todos os módulos diretamente na navegação inferior.

Dentro de **Serviços** podem ficar:

- Boletos;
- Certidão Negativa;
- Editais;
- ETR Monitora;
- ETR GEO;
- Notícias.

---

## 5.15 Notificações

As notificações podem ser parte importante desta proposta.

Exemplos:

- Seu requerimento foi atualizado.
- Existe uma nova pendência.
- Seu boleto está disponível.
- Sua certidão está pronta.

Não inventar essa funcionalidade caso ela não exista tecnicamente.

Se necessário, deixar apenas a interface preparada para futura evolução.

---

## 5.16 Estilo Visual

A interface deve transmitir:

- confiança;
- clareza;
- organização;
- serviço público moderno.

Utilizar:

- tipografia legível;
- cores institucionais;
- ícones simples;
- bons espaçamentos;
- status claros;
- poucos elementos decorativos.

Evitar:

- dashboard empresarial;
- gráficos desnecessários;
- excesso de cards;
- caixas dentro de caixas;
- sombras fortes;
- gradientes exagerados.

---

## 5.17 Diferencial do Modelo 3

O Modelo 3 deve comunicar:

> Esta é a minha situação junto à ETR.

E não:

> Estes são todos os serviços disponíveis.

Sua principal característica deve ser:

**central pessoal orientada a acompanhamento, pendências e atualizações.**

---

# 6. Comparação Final dos Modelos

| Modelo | Conceito | Principal pergunta respondida |
|---|---|---|
| Modelo 1 | Tradicional | Onde encontro a funcionalidade? |
| Modelo 2 | Central de Serviços | O que quero fazer agora? |
| Modelo 3 | Minha ETR | O que está acontecendo comigo? |

## Modelo 1

Evolução mais conservadora.

Mantém estrutura próxima do sistema atual.

## Modelo 2

Orientado à descoberta e execução de serviços.

Prioriza:

- Boletos;
- Requerimento Online;
- Certidão Negativa;
- Editais;
- ETR Monitora;
- Notícias;
- ETR GEO, quando aplicável.

## Modelo 3

Orientado ao relacionamento do cidadão com a ETR.

Prioriza:

- pendências;
- andamento de requerimentos;
- documentos;
- boletos;
- certidões;
- notificações;
- atualizações.

---

# 7. Regras Gerais de Implementação

Antes de modificar qualquer modelo:

1. analisar todas as páginas existentes;
2. analisar as rotas;
3. identificar funcionalidades existentes;
4. identificar componentes reutilizáveis;
5. identificar informações realmente disponíveis;
6. preservar regras de negócio;
7. preservar integrações;
8. preservar fluxos funcionais;
9. evitar remoção de funcionalidades;
10. não inventar serviços;
11. não inventar dados;
12. não inventar etapas de negócio;
13. priorizar mudanças na experiência e interface;
14. priorizar performance;
15. priorizar acessibilidade;
16. priorizar responsividade;
17. priorizar experiência mobile;
18. reduzir quantidade de cliques;
19. reduzir excesso de informação;
20. manter identidade institucional.

---

# 8. Diretrizes de UX

Em todos os modelos:

- a ação principal da tela deve ser clara;
- o usuário deve entender onde está;
- o usuário deve entender o que precisa fazer;
- mensagens de erro devem ser compreensíveis;
- estados de loading devem existir quando necessário;
- estados vazios devem ser tratados;
- formulários devem possuir labels claras;
- status devem utilizar texto e não apenas cor;
- ações perigosas devem ser claramente diferenciadas;
- informações técnicas internas devem ser traduzidas para linguagem compreensível ao cidadão.

---

# 9. Objetivo dos Protótipos

Os três protótipos não devem representar apenas três estilos visuais.

Eles devem representar três propostas distintas de experiência do usuário.

A apresentação ao cliente deve permitir comparar:

- arquitetura de informação;
- navegação;
- hierarquia;
- facilidade de acesso;
- acompanhamento;
- uso em dispositivos móveis;
- clareza das ações;
- relação entre serviços e informações pessoais.

O objetivo final é identificar qual abordagem oferece a melhor experiência para o cidadão sem comprometer as funcionalidades reais da ETR.
