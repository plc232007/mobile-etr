import { test, expect } from "@playwright/test";
import { presentationPassword, unlockPresentation } from "./helpers";

test("a entrada geral bloqueia links diretos mesmo com sessão de cidadão salva", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("etr:session:v1", "active");
    localStorage.setItem("etr:prototype", "caminho");
  });
  for (const route of [
    "/",
    "/prototipos",
    "/login",
    "/processo/regularizacao",
    "/inexistente",
  ]) {
    await page.goto(route);
    await expect(
      page.getByRole("heading", { name: "Acesse os protótipos ETR" }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/acesso$/);
    await expect(page.getByLabel("CPF ou CNPJ", { exact: true })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("button", { name: "Trocar protótipo" }),
    ).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Explorar/ })).toHaveCount(0);
  }
  await page.getByRole("button", { name: "Acessar protótipos" }).click();
  await expect(
    page.getByText("A senha deve ter pelo menos 8 caracteres."),
  ).toBeVisible();
  await page
    .getByLabel("Senha de acesso", { exact: true })
    .fill("senha-incorreta");
  await page.getByRole("button", { name: "Acessar protótipos" }).click();
  await expect(page.getByText("Senha de acesso inválida.")).toBeVisible();
  await page
    .getByLabel("Senha de acesso", { exact: true })
    .fill(presentationPassword);
  await page.getByRole("button", { name: "Acessar protótipos" }).click();
  await expect(page).toHaveURL(/\/prototipos$/);
  await page.getByRole("button", { name: "Explorar Minha ETR" }).click();
  await expect(
    page.getByRole("heading", { name: "Sua atenção agora" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Sua atenção agora" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Trocar protótipo" }).click();
  await page.getByRole("button", { name: "Sair da apresentação" }).click();
  await expect(
    page.getByRole("heading", { name: "Acesse os protótipos ETR" }),
  ).toBeVisible();
  await page.goto("/prototipos");
  await expect(page).toHaveURL(/\/acesso$/);
});

test("entrada independente dos protótipos, responsiva e sem persistir a senha", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(
      page.getByRole("heading", { name: "Acesse os protótipos ETR" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/presentation-access-${width}.png`,
      fullPage: true,
    });
  }
  await unlockPresentation(page);
  const stored = await page.evaluate(() =>
    JSON.stringify([localStorage, sessionStorage]),
  );
  expect(stored).not.toContain(presentationPassword);
  await page.getByRole("button", { name: "Explorar Tradicional" }).click();
  await page.getByLabel("CPF ou CNPJ", { exact: true }).fill("000.000.000-00");
  await page
    .getByLabel("Senha", { exact: true })
    .fill("qualquer-senha-ficticia");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  await page.goto("/perfil");
  await page
    .getByRole("button", { name: "Sair da conta", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirmar saída" }).click();
  await expect(page.getByLabel("CPF ou CNPJ", { exact: true })).toBeVisible();
  await page.goto("/prototipos");
  await expect(
    page.getByRole("button", { name: "Explorar Minha ETR" }),
  ).toBeVisible();
});
