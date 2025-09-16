import { readdirSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';
import crypto from 'crypto';

function decryptLocalizationFileNode(encryptedContent: string, key: string): string | null {
  try {
    const encryptedBytes = Buffer.from(encryptedContent, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
    decipher.setAutoPadding(true);

    let decrypted = decipher.update(encryptedBytes);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf-8');
  } catch (error) {
    console.error('Error decrypting content:', error);
    return null;
  }
}

function parseXmlToObject(xmlContent: string, filename: string): Record<string, string> {
  const result: Record<string, string> = {};

  try {
    // Parse the <entry name="KEY">VALUE</entry> format
    const entryRegex = /<entry\s+name="([^"]+)">([^<]*)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xmlContent)) !== null) {
      const [, key, value] = match;
      // Decode HTML entities like &#8217; and &lt;
      const decodedValue = value
        .replace(/&#8217;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');

      result[key] = decodedValue;
    }

    console.log(`  Parsed ${Object.keys(result).length} entries from ${filename}`);
  } catch (error) {
    console.error(`Error parsing XML from ${filename}:`, error);
  }

  return result;
}

function processLocalizationFiles(): void {
  const key = "UKu52ePUBwetZ9wNX88o54dnfKRu0T1l";

  const inputDir = "../raw/locales";
  const outputDir = "../data";
  const outputFile = "localization.json";

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  if (!existsSync(inputDir)) {
    console.error(`Input directory ${inputDir} does not exist`);
    return;
  }

  const files = readdirSync(inputDir);
  const txtFiles = files.filter(file => extname(file).toLowerCase() === '.txt');

  if (txtFiles.length === 0) {
    console.log(`No txt files found in ${inputDir}`);
    return;
  }

  console.log(`Found ${txtFiles.length} localization files to decrypt and merge`);

  const mergedData: Record<string, string> = {};
  let totalEntries = 0;

  for (const txtFile of txtFiles) {
    try {
      const inputPath = join(inputDir, txtFile);

      console.log(`Processing ${txtFile}...`);

      const encryptedContent = readFileSync(inputPath, 'utf-8').trim();
      const decryptedContent = decryptLocalizationFileNode(encryptedContent, key);

      if (decryptedContent !== null) {
        const parsedData = parseXmlToObject(decryptedContent, txtFile);

        if (Object.keys(parsedData).length > 0) {
          Object.assign(mergedData, parsedData);
          totalEntries += Object.keys(parsedData).length;
          console.log(`Processed: ${txtFile} (${Object.keys(parsedData).length} entries)`);
        } else {
          console.log(`No entries found in: ${txtFile}`);
        }
      } else {
        console.log(`Failed to decrypt: ${txtFile}`);
      }
    } catch (error) {
      console.log(`Error processing ${txtFile}:`, error);
    }
  }

  try {
    const outputPath = join(outputDir, outputFile);
    const jsonOutput = JSON.stringify(mergedData, null, 2);
    writeFileSync(outputPath, jsonOutput, 'utf-8');

    console.log(`\nSuccessfully merged ${txtFiles.length} files with ${totalEntries} total entries`);
    console.log(`Output saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error writing JSON output:', error);
  }
}

if (import.meta.main) {
  processLocalizationFiles();
}