import { expect, test } from "@playwright/test";

test("app boots and renders the starter UI", async ({ page, request }) => {
	const healthResponse = await request.get("/api/health");
	expect(healthResponse.ok()).toBeTruthy();
	expect(await healthResponse.json()).toEqual({ ok: true });

	await page.goto("/");

	await expect(
		page.getByRole("link", { name: "Next.js Supabase Starter" }),
	).toBeVisible();
	await expect(page.getByRole("heading", { name: "Next steps" })).toBeVisible();
});
