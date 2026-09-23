# Publicar o ETR Mobile na Vercel

## O que será publicado

A versão web do aplicativo Expo, exportada como uma aplicação estática de página única (SPA). A Vercel serve o conteúdo de `dist/`; o Expo Router controla as telas no navegador.

A configuração segue a [publicação web do Expo](https://docs.expo.dev/guides/publishing-websites/) e a [configuração de projetos da Vercel](https://vercel.com/docs/project-configuration/vercel-json).

## Publicação pelo painel

1. Envie o projeto para um repositório Git no GitHub, GitLab ou Bitbucket. Inclua `package-lock.json`, `vercel.json`, `app.json`, `package.json`, `tsconfig.json`, o código de `src/` e os arquivos de imagem referenciados pelo código.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. Use **Framework Preset: Other** e a pasta que contém `package.json` como **Root Directory** (a raiz, se este repositório contém somente o aplicativo).
4. Mantenha as configurações do `vercel.json`: instalação com `npm ci`, build com `npm run build` e saída `dist`. A versão Node.js está fixada em `22.x` no `package.json`.
5. Em **Settings → Environment Variables**, cadastre `EXPO_PUBLIC_ETR_DEMO_PASSWORD` com a senha da demonstração (pelo menos 8 caracteres), selecionando **Production** e **Preview**. O `.env.local` não é enviado ao Git e não configura a Vercel. Não é necessário conectar banco de dados.
6. Clique em **Deploy** e abra o endereço gerado. Na tela de acesso à apresentação, informe a senha cadastrada. Em seguida, escolha um protótipo. O login de cidadão dentro de cada modelo é simulado: use o CPF `000.000.000-00` e qualquer senha fictícia.

Se aparecer **“A senha da demonstração não foi configurada neste ambiente”**, confira a variável e o ambiente selecionado e faça um **Redeploy**. O Expo incorpora as variáveis `EXPO_PUBLIC_` durante o build; alterar a configuração não atualiza um deploy existente. Veja a [documentação de variáveis do Expo](https://docs.expo.dev/guides/environment-variables/) e a [documentação de variáveis da Vercel](https://vercel.com/docs/environment-variables).

A pasta `dist/` será recriada no build; não precisa ser adicionada ao Git. `node_modules/`, `.expo/`, `.vercel/` e resultados de testes também ficam fora do Git. O build executa a checagem TypeScript antes de exportar a web.

## Alternativa pela CLI

Execute na raiz do projeto, depois de verificar o build local:

```bash
npm ci
npm run build
npx vercel
```

A CLI solicita acesso à sua conta e o vínculo com um projeto. O primeiro comando de publicação cria uma prévia. Para publicar em produção:

```bash
npx vercel --prod
```

## Rotas e arquivos estáticos

`app.json` mantém `web.output: "single"`. O rewrite de `vercel.json` encaminha as rotas do aplicativo para `/index.html`. Arquivos existentes, como JavaScript e fontes, têm precedência sobre o rewrite. Assim, uma atualização de página em `/edital/03-2026` carrega o aplicativo sem erro 404 de hospedagem. Rotas desconhecidas são tratadas pela tela de página não encontrada do Expo Router.

Todas as rotas dos protótipos, incluindo sua seleção e seus logins, exigem primeiro o acesso à apresentação em `/acesso`. A sessão de acesso é independente da sessão fictícia do cidadão. Após liberar a apresentação, o visitante escolhe um modelo; as rotas pessoais continuam exigindo o login simulado desse modelo.

## Conferência depois da publicação

- Abra `/prototipos` em uma nova sessão de navegador e confirme que a tela de acesso à apresentação aparece primeiro.
- Informe a senha, escolha um modelo e entre pelo login simulado.
- Use **Sair da apresentação** na seleção de modelos e confirme que links diretos voltam a exigir a senha.
- Abra `/processo/regularizacao` diretamente e recarregue a página.
- Faça o mesmo em `/boletos`, `/requerimento` e `/edital/03-2026`.
- Confira se os ícones e imagens carregam.
- Salve um rascunho, recarregue e confirme que continua disponível.
- Teste o envio de um arquivo de demonstração e a abertura da janela de PDF.

## Dados da demonstração

Cada navegador mantém seus próprios dados, rascunhos e anexos. Eles não são enviados para a Vercel nem compartilhados entre usuários. Um domínio de prévia e o domínio de produção têm armazenamentos separados. Para reiniciar a apresentação no mesmo domínio, use **Perfil → Configurações → Restaurar dados de demonstração**.

A publicação não transforma os mocks em serviços reais: login, certidões, cobranças e agendamentos continuam fictícios. PDFs usam uma janela de impressão; permita sua abertura no navegador quando necessário.
