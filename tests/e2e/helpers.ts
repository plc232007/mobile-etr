import { expect, Page } from "@playwright/test";
import { load } from "@expo/env";

load(process.cwd());
export const presentationPassword =
  process.env.EXPO_PUBLIC_ETR_DEMO_PASSWORD ?? "";

export async function unlockPresentation(page: Page) {
  await page.goto("/");
  await page
    .getByLabel("Senha de acesso", { exact: true })
    .fill(presentationPassword);
  await page.getByRole("button", { name: "Acessar protótipos" }).click();
  await expect(page).toHaveURL(/\/prototipos$/);
}
