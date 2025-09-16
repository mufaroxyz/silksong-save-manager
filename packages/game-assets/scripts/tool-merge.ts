import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

function mergeJsonFiles(): void {
  const inputDir = "../raw/tools";
  const outputFile = "../data/tools.json";

  if (!existsSync(inputDir)) {
    console.error(`Input directory ${inputDir} does not exist`);
    return;
  }

  const files = readdirSync(inputDir);
  const jsonFiles = files.filter(file => extname(file).toLowerCase() === '.json');

  if (jsonFiles.length === 0) {
    console.log(`No JSON files found in ${inputDir}`);
    return;
  }

  console.log(`Found ${jsonFiles.length} JSON files to merge`);

  const mergedData: Record<string, any> = {};
  let processedCount = 0;

  for (const jsonFile of jsonFiles) {
    try {
      const filePath = join(inputDir, jsonFile);

      console.log(`Processing ${jsonFile}...`);

      const fileContent = readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      if (jsonData.m_Name && typeof jsonData.m_Name === 'string') {
        const key = jsonData.m_Name;
        mergedData[key] = jsonData;
        processedCount++;
        console.log(`Added: "${key}"`);
      } else {
        console.log(`Skipped ${jsonFile}: No valid m_Name field found`);
      }

    } catch (error) {
      console.log(`Error processing ${jsonFile}:`, error);
    }
  }

  try {
    const jsonOutput = JSON.stringify(mergedData, null, 2);
    writeFileSync(outputFile, jsonOutput, 'utf-8');

    console.log(`\nSuccessfully merged ${processedCount} files`);
    console.log(`Output saved to: ${outputFile}`);

    const keys = Object.keys(mergedData);
    if (keys.length > 0) {
      console.log('\nMerged items:');
      keys.forEach(key => {
        console.log(`  - ${key}`);
      });
    }

  } catch (error) {
    console.error('Error writing merged JSON output:', error);
  }
}

if (import.meta.main) {
  mergeJsonFiles();
}