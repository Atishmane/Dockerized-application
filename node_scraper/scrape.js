const fs = require('fs');
const puppeteer = require('puppeteer');

const url = process.env.SCRAPE_URL;

if (!url) {
  console.error("SCRAPE_URL is not defined!");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium' // for Debian-based slim image
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(() => {
    return {
      title: document.title,
      heading: document.querySelector('h1')?.innerText || 'No H1 tag found',
      description: document.querySelector('meta[name="description"]')?.content || 'No meta description'
    };
  });

  fs.writeFileSync('/scraped_data/scraped_data.json', JSON.stringify(result, null, 2));
  await browser.close();
})();
