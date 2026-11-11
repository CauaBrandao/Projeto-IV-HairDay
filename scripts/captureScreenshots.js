import { chromium } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Servidor estático simples para servir o dist de produção
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PORT = 4173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function run() {
  server.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    const screenshotsDir = path.resolve(process.cwd(), 'docs/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const browser = await chromium.launch({ channel: 'chrome' });

    // 1. Desktop Screenshot (1280x800)
    console.log('Capturing Desktop screenshot...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`http://localhost:${PORT}`);
    await desktopPage.waitForTimeout(1000);
    const desktopPath = path.join(screenshotsDir, 'desktop.png');
    await desktopPage.screenshot({ path: desktopPath, fullPage: true });
    console.log(`Desktop screenshot saved to ${desktopPath}`);
    await desktopContext.close();

    // 2. Mobile Screenshot (iPhone 14 / Pixel: 390x844)
    console.log('Capturing Mobile screenshot...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://localhost:${PORT}`);
    await mobilePage.waitForTimeout(1000);
    const mobilePath = path.join(screenshotsDir, 'mobile.png');
    await mobilePage.screenshot({ path: mobilePath, fullPage: true });
    console.log(`Mobile screenshot saved to ${mobilePath}`);
    await mobileContext.close();

    await browser.close();
    server.close();
    console.log('Screenshots generated successfully!');
    process.exit(0);
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
