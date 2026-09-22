import { test, expect, Page } from "@playwright/test";
async function login(page: Page) {
  await page.goto("/");
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page.getByLabel("Senha", { exact: true }).fill("ETR-demo-2026!");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
}
test("login, imóvel, timeline, envio do CAR e processo atualizado", async ({
  page,
}) => {
  await login(page);
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Meu imóvel", exact: true }).click();
  await page
    .getByRole("button")
    .filter({ hasText: "Chácara Boa Esperança" })
    .first()
    .click();
  await page
    .getByRole("button")
    .filter({ hasText: "PROTOCOLO 2026.000123" })
    .click();
  await expect(
    page.getByText("Análise jurídica", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Resolver agora" }).click();
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("button", { name: "Escolher arquivo", exact: true })
    .click();
  await (
    await chooser
  ).setFiles({
    name: "car-teste.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4\nETR demo"),
  });
  await expect(page.getByText("car-teste.pdf", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Enviar documento", exact: true })
    .click();
  await expect(
    page.getByText("Recebido para conferência", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver processo atualizado" }).click();
  await expect(
    page.getByText("CAR recebido para conferência").filter({ visible: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("CAR recebido para conferência").filter({ visible: true }),
  ).toBeVisible();
  await page
    .getByRole("button")
    .filter({ hasText: "Cadastro Ambiental Rural — CAR" })
    .click();
  await page.reload();
  await expect(page.getByText("car-teste.pdf", { exact: true })).toBeVisible();
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Baixar documento", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("car-teste.pdf");
});
test("boleto e acompanhamento de edital persistem e chegam aos alertas", async ({
  page,
}) => {
  await login(page);
  await page.getByRole("button", { name: "Gerar boleto", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "R$ 1.245,70", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Boleto de demonstração", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Copiar código" }).click();
  await expect(page.getByText("Código de demonstração copiado.")).toBeVisible();
  await page.goto("/editais");
  await page
    .getByRole("button")
    .filter({ hasText: "Fazenda Contagem de São João" })
    .click();
  await page
    .getByRole("button", { name: "Acompanhar edital", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Deixar de acompanhar", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Deixar de acompanhar", exact: true }),
  ).toBeVisible();
  await page.goto("/alertas");
  await expect(
    page.getByText("Atualização no edital 03/2026", { exact: true }),
  ).toBeVisible();
});
test("requerimento com rascunho persistido, documento salvo, revisão e protocolo", async ({
  page,
}) => {
  await login(page);
  await page.goto("/requerimento");
  await page
    .getByRole("button", { name: "Atualização cadastral", exact: true })
    .click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page
    .getByRole("button", { name: "Fazenda São José", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Salvar rascunho e sair", exact: true })
    .click();
  await page.reload();
  await page.goto("/requerimento");
  await expect(page.getByText("Etapa 2 de 5", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page
    .getByRole("button", { name: "Usar documento salvo", exact: true })
    .click();
  await page
    .getByRole("button")
    .filter({ hasText: "Documento de identidade" })
    .click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page
    .getByLabel("Mensagem para a equipe", { exact: true })
    .fill("Atualizar o cadastro de demonstração.");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Conferi as informações do pedido",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Confirmar e enviar", exact: true })
    .click();
  await expect(
    page.getByText("Requerimento enviado!", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Ver requerimento", exact: true })
    .click();
  await expect(
    page.getByText("Protocolo 2026.000456", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Fazenda São José", { exact: true }),
  ).toBeVisible();
});
test("certidão, agendamento e estados vazios", async ({ page }) => {
  await login(page);
  await page.goto("/certidao");
  await page.getByRole("button", { name: "Consultar", exact: true }).click();
  await expect(page.getByText("Certidão disponível (simulação)")).toBeVisible();
  await page.goto("/agendamento");
  for (const label of [
    "Regularização do imóvel",
    "Unidade Sobradinho (fictícia)",
    "16/09/2026",
    "09:00",
  ]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
  }
  await page
    .getByRole("button", { name: "Confirmar agendamento", exact: true })
    .click();
  await expect(
    page.getByText("Atendimento agendado!", { exact: true }),
  ).toBeVisible();
  await page.goto("/editais");
  await page.getByLabel("Buscar edital ou região").fill("inexistente");
  await expect(page.getByText("Nenhum edital encontrado")).toBeVisible();
  await page.goto("/processos");
  await page.getByRole("button", { name: "Concluídos", exact: true }).click();
  await expect(page.getByText("Nenhum processo encontrado")).toBeVisible();
});
test("rotas secundárias, responsividade, preferências e saída", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await login(page);
  for (const route of [
    "/servicos",
    "/documentos",
    "/documento/identidade",
    "/mapa/boa-esperanca",
    "/monitoramento/sao-jose",
    "/jornada",
    "/atendimento",
    "/noticias",
    "/noticia/regularizacao-rural",
    "/perfil",
    "/configuracoes",
  ]) {
    await page.goto(route);
    await expect(
      page.getByText("Ambiente de demonstração • Dados fictícios"),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("switch", { name: "Simular falta de conexão" }).click();
  await expect(page.getByText(/Modo sem conexão/)).toBeVisible();
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/home-small.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.goto("/perfil");
  await page
    .getByRole("button", { name: "Sair da conta", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirmar saída", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Entrar", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("PDF apresenta o documento correto e recuperação do estado de erro", async ({
  page,
  context,
}) => {
  await context.addInitScript(() => {
    window.print = () => undefined;
  });
  await login(page);
  await page.goto("/boleto/setembro");
  const popupEvent = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Gerar PDF", exact: true }).click();
  const popup = await popupEvent;
  await expect(
    popup.getByRole("heading", { name: "Boleto ilustrativo" }),
  ).toBeVisible();
  await expect(popup.getByText(/SEM VALIDADE OFICIAL/)).toBeVisible();
  await popup.close();
  await page.evaluate(() =>
    localStorage.setItem("etr:demo:v1", "invalid-json"),
  );
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Não conseguimos carregar" }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Restaurar dados de demonstração",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Demonstração restaurada.", { exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
});
test("listas vazias, alerta de conexão real e estados de leitura", async ({
  page,
  context,
}) => {
  await login(page);
  await page.goto("/alertas");
  await page
    .getByRole("button", { name: "Marcar todos como lidos", exact: true })
    .click();
  await page.getByRole("button", { name: "Não lidos", exact: true }).click();
  await expect(
    page.getByText("Tudo em dia por aqui", { exact: true }),
  ).toBeVisible();
  await context.setOffline(true);
  await expect(page.getByText(/Modo sem conexão/)).toBeVisible();
  await context.setOffline(false);
  await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem("etr:demo:v1")!);
    data.payments = [];
    data.processes = [];
    data.pending = [];
    localStorage.setItem("etr:demo:v1", JSON.stringify(data));
  });
  await page.goto("/boletos");
  await expect(page.getByText("Nenhum boleto nesta categoria.")).toBeVisible();
  await page.goto("/processos");
  await expect(page.getByText("Nenhum processo encontrado")).toBeVisible();
  await page.goto("/pendencias");
  await expect(
    page.getByText("Tudo certo por aqui", { exact: true }),
  ).toBeVisible();
});
