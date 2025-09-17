import * as fs from "fs";
import * as path from "path";

const SPRITE_SOURCE_DIR: string = ""; // all dumped sprites from the game with the name@m_PathID format
const TOOL_DATA_FILE: string = "../data/crests.json";
const ICON_DEST_DIR: string = "../data/assets/crest-icons";
const MANIFEST_PATH: string = "../data/assets/crest-manifest.json";

interface ToolData {
  [toolName: string]: {
    inventorySprite?: {
      m_PathID: number;
    };
    [key: string]: any;
  };
}

interface ManifestEntry {
  pathId: number;
  toolName: string;
  filename: string;
}

function convertToUnsigned64(signedValue: number): string {
  if (signedValue < 0) {
    const unsigned = (BigInt(signedValue) + BigInt(2n ** 64n)).toString();
    return unsigned;
  }
  return signedValue.toString();
}

function collectToolAssets(): void {
  if (!fs.existsSync(SPRITE_SOURCE_DIR)) {
    console.error(`Sprite source directory not found: ${SPRITE_SOURCE_DIR}`);
    return;
  }

  if (!fs.existsSync(TOOL_DATA_FILE)) {
    console.error(`Tool data file not found: ${TOOL_DATA_FILE}`);
    return;
  }

  if (!fs.existsSync(ICON_DEST_DIR)) {
    fs.mkdirSync(ICON_DEST_DIR, { recursive: true });
    console.log(`Created destination directory: ${ICON_DEST_DIR}`);
  }

  console.log("Loading tool data...");
  const toolDataContent = fs.readFileSync(TOOL_DATA_FILE, "utf-8");
  const toolData: ToolData = JSON.parse(toolDataContent);

  console.log("Scanning sprite files...");
  const spriteFiles = fs
    .readdirSync(SPRITE_SOURCE_DIR)
    .filter((file) => file.endsWith(".png"))
    .filter((file) => file.includes("@"));

  console.log(`Found ${spriteFiles.length} sprite files`);

  const pathIdMaps = {
    signed: new Map<string, string>(),
    unsigned: new Map<string, string>(),
    original: new Map<string, string>(),
  };

  for (const filename of spriteFiles) {
    const match = filename.match(/^(.+)@(.+)\.png$/);
    if (match) {
      const [, assetName, pathIdStr] = match;

      pathIdMaps.original.set(pathIdStr, filename);

      try {
        const pathIdNum = Number.parseInt(pathIdStr, 10);
        pathIdMaps.signed.set(pathIdNum.toString(), filename);

        if (pathIdNum < 0) {
          const unsignedStr = convertToUnsigned64(pathIdNum);
          pathIdMaps.unsigned.set(unsignedStr, filename);
        }
      } catch (e) { }
    }
  }

  console.log(`Indexed ${pathIdMaps.original.size} sprites by PathID`);

  const manifest: ManifestEntry[] = [];
  let matchedCount = 0;
  let totalTools = 0;

  for (const [toolName, toolInfo] of Object.entries(toolData)) {
    totalTools++;

    if (!toolInfo.inventorySprite?.m_PathID) {
      console.log(`Tool "${toolName}" has no inventory sprite PathID`);
      continue;
    }

    const pathId = toolInfo.inventorySprite.m_PathID;
    const pathIdStr = pathId.toString();

    let spriteFile: string | undefined;

    spriteFile = pathIdMaps.signed.get(pathIdStr);

    if (!spriteFile && pathId < 0) {
      const unsignedStr = convertToUnsigned64(pathId);
      spriteFile = pathIdMaps.unsigned.get(unsignedStr);
      if (spriteFile) {
        console.log(
          `Found using unsigned conversion: ${pathId} -> ${unsignedStr}`,
        );
      }
    }

    if (!spriteFile) {
      spriteFile = pathIdMaps.original.get(pathIdStr);
    }

    if (!spriteFile) {
      console.log(`No sprite found for tool "${toolName}" (PathID: ${pathId})`);
      continue;
    }

    const sourcePath = path.join(SPRITE_SOURCE_DIR, spriteFile);

    const cleanToolName = toolName.replace(/[^a-zA-Z0-9\-_]/g, "_");
    const destFilename = `${cleanToolName}_${Math.abs(pathId)}.png`;
    const destPath = path.join(ICON_DEST_DIR, destFilename);

    try {
      fs.copyFileSync(sourcePath, destPath);

      manifest.push({
        pathId,
        toolName,
        filename: destFilename,
      });

      matchedCount++;
      console.log(`Copied: ${toolName} -> ${destFilename}`);
    } catch (error) {
      console.error(
        `Failed to copy ${spriteFile} for tool "${toolName}":`,
        error,
      );
    }
  }

  try {
    const manifestDir = path.dirname(MANIFEST_PATH);
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }

    const manifestContent = JSON.stringify(manifest, null, 2);
    fs.writeFileSync(MANIFEST_PATH, manifestContent, "utf-8");
    console.log(`Manifest saved to: ${MANIFEST_PATH}`);
  } catch (error) {
    console.error("Failed to save manifest:", error);
    return;
  }

  console.log(`Total tools: ${totalTools}`);
  console.log(
    `Tools with inventory sprites: ${Object.values(toolData).filter((t) => t.inventorySprite?.m_PathID).length}`,
  );
  console.log(`Successfully matched: ${matchedCount}`);
}

if (import.meta.main) {
  collectToolAssets();
}
