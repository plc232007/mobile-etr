import { test, expect } from "@playwright/test";
import { unlockPresentation } from "./helpers";

test.beforeEach(async ({ page }) => {
  await unlockPresentation(page);
});

test("central de serviços: busca, navegação responsiva e troca persistida", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/prototipos");
  await page
    .getByRole("button", { name: "Explorar Central de Serviços" })
    .click();
  await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute(
    "type",
    "password",
  );
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page.getByLabel("Senha", { exact: true }).fill("senha-ficticia");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "O que você precisa?" }),
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: /Notícias/ })).toBeVisible();
  await expect(
    page.getByRole("tab", { name: /Alertas|Notificações/ }),
  ).toHaveCount(0);
  await page.getByLabel("Buscar serviço...").fill("certidao");
  await expect(
    page.getByText("1 serviço encontrado", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button")
    .filter({ hasText: "Certidão Negativa" })
    .click();
  await expect(page).toHaveURL(/certidao/);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Emitir boleto", exact: true })
    .click();
  await expect(page).toHaveURL(/boletos/);
  await page.goto("/");
  await page.getByRole("button", { name: "Iniciar requerimento" }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByText("Selecione o tipo de requerimento para continuar."),
  ).toBeVisible();
  await page.goto("/");
  for (const width of [320, 390, 1000, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await expect(
      page.getByRole("heading", { name: "O que você precisa?" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width >= 1000)
      await expect(
        page.getByRole("menuitem", { name: "Meus requerimentos", exact: true }),
      ).toBeVisible();
    await page.screenshot({
      path: `test-results/services-home-${width}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("menuitem", { name: "Notícias", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Notícias da ETR" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Trocar protótipo" }),
  ).toContainText("Central de Serviços");
  await page.getByRole("button", { name: "Trocar protótipo" }).click();
  await page.getByRole("button", { name: "Explorar Tradicional" }).click();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  expect(errors).toEqual([]);
});

test("ETR GEO aparece como serviço e não interfere no Monitora", async ({
  page,
}) => {
  await page.goto("/prototipos");
  await page
    .getByRole("button", { name: "Explorar Central de Serviços" })
    .click();
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page.getByLabel("Senha", { exact: true }).fill("senha-ficticia");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.goto("/servicos");
  await expect(
    page.getByRole("heading", { name: "Serviços ETR" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: "ETR GEO" }),
  ).toBeVisible();
  await page.getByRole("button").filter({ hasText: "ETR Monitora" }).click();
  await page
    .getByRole("button")
    .filter({ hasText: "Fazenda São José" })
    .click();
  await expect(
    page.getByText("Uma atualização para conferir", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Visualizar no mapa" }),
  ).toBeVisible();
  await page.goto("/mapa/sao-jose");
  await expect(
    page.getByText("Localização ilustrativa", { exact: true }),
  ).toBeVisible();
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Minha ETR" }).click();
  await page.goto("/servicos");
  await page.getByRole("button").filter({ hasText: "ETR GEO" }).click();
  await page
    .getByRole("button")
    .filter({ hasText: "Fazenda São José" })
    .click();
  await expect(page).toHaveURL(/mapa\/sao-jose/);
  await expect(
    page.getByText("Localização ilustrativa", { exact: true }),
  ).toBeVisible();
});
