import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: ["../.."],
		},
	},
	optimizeDeps: {
		exclude: ["@save-manager/decrypt-wasm"],
	},
	assetsInclude: ["**/*.wasm"],
	build: {
		target: "esnext", // Required for top-level await with wasm
		rollupOptions: {
			output: {
				manualChunks: {
					wasm: ["@save-manager/decrypt-wasm"],
				},
			},
		},
	},
});
