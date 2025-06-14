import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["json-summary", "json", "html"],
			reportOnFailure: true,
		},
		globals: true,
		passWithNoTests: true,
	},
});
