import { test, expect } from "@playwright/test";

test("modelos acessíveis, escolha persistida e contexto do imóvel", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/prototipos");
  await page.getByRole("button", { name: "Explorar Área do Cliente" }).click();
  await expect(page.getByText("O próximo passo está aqui.")).toBeVisible();
  await page
    .getByRole("button", { name: "Entrar na demonstração", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Selecionar imóvel" }),
  ).toContainText("Chácara Boa Esperança");
  await page.getByRole("button", { name: "Enviar documento pendente" }).click();
  await expect(page).toHaveURL(/propertyId=boa-esperanca/);
  await expect(
    page.getByRole("heading", { name: "Cadastro Ambiental Rural — CAR" }),
  ).toBeVisible();
  await page.goto("/");
  await page.getByRole("button", { name: "Selecionar imóvel" }).click();
  await page
    .getByRole("button")
    .filter({ hasText: "Fazenda São José" })
    .click();
  await page.getByRole("button").filter({ hasText: "ETR GEO" }).click();
  await expect(page).toHaveURL(/mapa\/sao-jose/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Trocar protótipo" }),
  ).toContainText("Área do Cliente");
  await page.goto("/");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(
      page.getByRole("button", { name: "Selecionar imóvel" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Acompanhar meu processo" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/client-home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Trocar protótipo" }).click();
  await page.getByRole("button", { name: "Explorar Minha terra" }).click();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Vamos cuidar da sua terra?")).toBeVisible();
  expect(errors).toEqual([]);
});
