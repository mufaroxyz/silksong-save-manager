import * as fs from 'fs';
import * as path from 'path';

function copyAssetsToStatic(): void {
  const sourceDir = '../data/assets';
  const destDir = '../../../apps/web/static/assets/game';

  function copyRecursive(src: string, dest: string): void {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (fs.statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else if (item.endsWith('.png')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${item}`);
      }
    }
  }

  copyRecursive(sourceDir, destDir);
  console.log(`Copied image assets from ${sourceDir} to ${destDir}`);
}

if (import.meta.main) {
  copyAssetsToStatic();
}