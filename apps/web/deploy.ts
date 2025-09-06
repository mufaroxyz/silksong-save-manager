#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { $ } from "bun";

console.log("Starting Cloudflare Workers deployment process...");

const isProduction = process.argv.includes("--production");
const skipWasm = process.argv.includes("--skip-wasm");

const projectRoot = resolve(import.meta.dir, "../..");
const wasmBuildScript = resolve(projectRoot, "packages/decrypt-wasm/build.ts");
const wasmPkgDir = resolve(projectRoot, "packages/decrypt-wasm/pkg");

if (!skipWasm) {
    console.log("Building WASM module...");
    try {
        await $`bun run ${wasmBuildScript}`.cwd(projectRoot);
        console.log("WASM build complete!");
    } catch (error) {
        console.error("WASM build failed:", error);
        process.exit(1);
    }

    const wasmFiles = [
        "silksong_decrypt_wasm.js",
        "silksong_decrypt_wasm_bg.wasm",
        "silksong_decrypt_wasm.d.ts"
    ];

    for (const fileName of wasmFiles) {
        const filePath = resolve(wasmPkgDir, fileName);
        if (!existsSync(filePath)) {
            console.error(`Required WASM file missing: ${filePath}`);
            process.exit(1);
        }
    }
    console.log("All WASM files verified!");
} else {
    console.log("Skipping WASM build (--skip-wasm flag)");
}

console.log("Running type checks...");
try {
    await $`bun run check`;
    console.log("Type checks passed!");
} catch (error) {
    console.error("Type check failed:", error);
    if (isProduction) {
        process.exit(1);
    } else {
        console.log("Continuing with type errors (development mode)");
    }
}

console.log("Building web application...");
try {
    await $`bun run build`;
    console.log("Web app build complete!");
} catch (error) {
    console.error("Web app build failed:", error);
    process.exit(1);
}

console.log("Deploying to Cloudflare Workers...");
try {
    const deployCommand = isProduction 
        ? $`bun x wrangler deploy --env production`
        : $`bun x wrangler deploy`;
    
    await deployCommand;
    console.log("Deployment successful!");

    console.log("\nCloudflare Workers Deployment Complete!");
} catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
}
