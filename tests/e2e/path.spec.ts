import { test, expect } from "@playwright/test";
import { initialData } from "../../src/mocks/data";

test("modelo 3: tarefas, acompanhamento, imóveis, serviços e troca persistida", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Meu caminho" }).click();
  await expect(
    page.getByRole("heading", { name: "Entre no seu espaço" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByText("Use 000.000.000-00 para testar o acesso da demonstração."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Entrar na demonstração", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Enviar documento: Cadastro Ambiental Rural — CAR",
    })
    .click();
  await expect(page).toHaveURL(/pendencias\?propertyId=boa-esperanca/);
  await page.goto("/");
  await page.getByRole("tab", { name: "Em andamento", exact: true }).click();
  await page.getByRole("button", { name: "Acompanhar 2026.000098" }).click();
  await expect(page).toHaveURL(/processo\/cadastro/);
  await page.goto("/");
  await page.getByRole("tab", { name: "Meus imóveis", exact: true }).click();
  await page.getByRole("button", { name: "Abrir Fazenda São José" }).click();
  await expect(page).toHaveURL(/imovel\/sao-jose/);
  await page.goto("/");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await expect(
      page.getByRole("tab", { name: "Para resolver", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/path-home-${width}.png`,
      fullPage: true,
    });
  }
  await page
    .getByRole("button", { name: "Encontrar um serviço", exact: true })
    .click();
  await page.getByLabel("Buscar serviço: boleto, documento…").fill("certidao");
  await expect(
    page.getByText("1 serviço encontrado", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button")
    .filter({ hasText: "Preciso de uma certidão" })
    .click();
  await expect(page).toHaveURL(/certidao/);
  await page.goto("/servicos");
  await page.getByRole("button", { name: "Resolver", exact: true }).click();
  await page
    .getByLabel("Buscar serviço: boleto, documento…")
    .fill("inexistente");
  await expect(page.getByText("Vamos tentar de outro jeito?")).toBeVisible();
  await page.getByRole("button", { name: "Limpar busca e filtros" }).click();
  await expect(page.getByText("12 serviços encontrados")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Trocar protótipo" }),
  ).toContainText("03 · Meu caminho");
  await page.getByRole("button", { name: "Trocar protótipo" }).click();
  await page.getByRole("button", { name: "Explorar Minha terra" }).click();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  expect(errors).toEqual([]);
});

test("modelo 3: sem tarefas ou imóveis", async ({ page }) => {
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Meu caminho" }).click();
  await page
    .getByRole("button", { name: "Entrar na demonstração", exact: true })
    .click();
  await expect(
    page.getByRole("tab", { name: "Para resolver", exact: true }),
  ).toBeVisible();
  await page.evaluate((seed) => {
    const data = JSON.parse(
      localStorage.getItem("etr:demo:v1") ?? JSON.stringify(seed),
    );
    data.pending = [];
    data.payments = [];
    data.processes = [];
    data.properties = [];
    localStorage.setItem("etr:demo:v1", JSON.stringify(data));
  }, initialData);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tudo em dia", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Em andamento", exact: true }).click();
  await expect(page.getByText("Nenhum pedido em andamento")).toBeVisible();
  await page.getByRole("tab", { name: "Meus imóveis", exact: true }).click();
  await expect(page.getByText("Nenhum imóvel vinculado")).toBeVisible();
});
