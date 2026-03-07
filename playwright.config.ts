import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	reporter: process.env.CI ? "line" : "html",
	use: {
		baseURL: "http://127.0.0.1:3000",
	},
	webServer: {
		command:
			"pnpm build && pnpm exec next start --hostname 127.0.0.1 --port 3000",
		timeout: 180_000,
		url: "http://127.0.0.1:3000/api/health",
		reuseExistingServer: !process.env.CI,
		env: {
			NODE_ENV: "production",
		},
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
