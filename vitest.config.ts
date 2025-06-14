import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["json-summary", "json", "html"],
			reportOnFailure: true,
			thresholds: {
				lines: 100,
				branches: 100,
				functions: 100,
				statements: 100,
			},
			exclude: ["./benchmark.mjs", "./vitest.config.ts", "./dist"],
		},
		globals: true,
		passWithNoTests: true,
	},
});
