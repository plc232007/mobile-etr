import { test, expect } from "@playwright/test";
import { initialData } from "../../src/mocks/data";

test("Minha ETR: pendência resolvida, certidão, atividades e navegação", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Minha ETR" }).click();
  await expect(
    page.getByRole("heading", { name: "Entre no seu espaço" }),
  ).toBeVisible();
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page.getByLabel("Senha", { exact: true }).fill("ETR-demo-2026!");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.getByRole("tab", { name: /Solicitações/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Notificações/ })).toBeVisible();
  await page
    .getByRole("button", { name: "Enviar documento", exact: true })
    .click();
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("button", { name: "Escolher arquivo", exact: true })
    .click();
  await (
    await chooser
  ).setFiles({
    name: "car.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4\nETR demo"),
  });
  await page
    .getByRole("button", { name: "Enviar documento", exact: true })
    .click();
  await expect(
    page.getByText("Recebido para conferência", { exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Enviar documento", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByText(
      "Seus envios estão em dia. Os documentos recebidos serão conferidos pela equipe.",
    ),
  ).toBeVisible();
  await page
    .getByRole("button")
    .filter({ hasText: "PROTOCOLO 2026.000123" })
    .click();
  await expect(
    page.getByText("CAR recebido para conferência").filter({ visible: true }),
  ).toBeVisible();
  await page.goto("/certidao");
  await page.getByRole("button", { name: "Consultar", exact: true }).click();
  await expect(page.getByText("Certidão disponível (simulação)")).toBeVisible();
  await page.goto("/");
  await page
    .getByRole("button", { name: "Visualizar certidão", exact: true })
    .click();
  await expect(page).toHaveURL(/documento\/certidao-2026/);
  await page.goto("/");
  for (const width of [320, 390, 1000, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await expect(
      page.getByRole("heading", { name: "Sua atenção agora" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/personal-home-${width}.png`,
      fullPage: true,
    });
  }
  await expect(
    page.getByRole("menuitem", { name: "Solicitações", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Trocar protótipo" }),
  ).toContainText("Minha ETR");
  expect(errors).toEqual([]);
});

test("Minha ETR: estados vazios e catálogo pesquisável", async ({ page }) => {
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Minha ETR" }).click();
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page.getByLabel("Senha", { exact: true }).fill("ETR-demo-2026!");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Sua atenção agora" }),
  ).toBeVisible();
  await page.evaluate((seed) => {
    const data = JSON.parse(JSON.stringify(seed));
    data.pending = [];
    data.payments = [];
    data.processes = [];
    data.documents = [];
    data.properties = [];
    data.alerts = [];
    data.news = [];
    data.notices = [];
    localStorage.setItem("etr:demo:v1", JSON.stringify(data));
  }, initialData);
  await page.reload();
  await expect(
    page.getByText("Nenhuma pendência de envio", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Nenhum requerimento em andamento"),
  ).toBeVisible();
  await expect(page.getByText("Nenhum boleto em aberto.")).toBeVisible();
  await expect(page.getByText("Nenhuma certidão disponível.")).toBeVisible();
  await page.goto("/servicos");
  await page.getByLabel("Buscar serviço...").fill("inexistente");
  await expect(page.getByText("Nenhum serviço encontrado")).toBeVisible();
  await page.getByRole("button", { name: "Limpar busca e filtros" }).click();
  await page.getByRole("button", { name: "Acompanhar", exact: true }).click();
  await page.getByLabel("Buscar serviço...").fill("monitora");
  await expect(
    page.getByText("1 serviço encontrado", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button").filter({ hasText: "ETR Monitora" }).click();
  await expect(
    page.getByRole("heading", { name: "Nenhum imóvel vinculado" }),
  ).toBeVisible();
});
