#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { $ } from "bun";

const isCloudflare = process.env.CF_PAGES === "1" || process.env.CLOUDFLARE_ENV;

if (isCloudflare) {
	console.log("Running in Cloudflare Pages - using pre-built WASM");

	if (
		!existsSync("pkg/silksong_decrypt_wasm.js") ||
		!existsSync("pkg/silksong_decrypt_wasm_bg.wasm")
	) {
		console.error("Pre-built WASM files not found in pkg/");
		console.error("Please ensure WASM files are committed to the repository");
		process.exit(1);
	}

	console.log("Optimizing WASM bindings with Bun...");
	await Bun.build({
		entrypoints: ["pkg/silksong_decrypt_wasm.js"],
		outdir: "pkg",
		minify: true,
		target: "browser",
		format: "esm",
	});

	console.log("WASM optimization complete for Cloudflare!");
} else {
	console.log("Building WASM module locally with Bun optimizations...");

	try {
		await $`bun run build:direct`;
	} catch (error) {
		console.error("WASM build failed:", error);
		process.exit(1);
	}

	if (existsSync("pkg/silksong_decrypt_wasm.js")) {
		console.log("Optimizing WASM bindings with Bun...");
		await Bun.build({
			entrypoints: ["pkg/silksong_decrypt_wasm.js"],
			outdir: "pkg",
			minify: true,
			target: "browser",
			format: "esm",
		});
	}

	console.log("WASM build complete!");
}
