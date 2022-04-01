import puppeteer from 'puppeteer';

export default async function getUpdateUrl(serial: string) {
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
      '--ignore-certificate-errors',
    ],
  });
  const page = await browser.newPage();
  const BASE_URL = `https://a0.ww.np.dl.playstation.net/tpl/np/${serial}/${serial}-ver.xml`;

  await page.goto(BASE_URL);

  const check_page = await page.$('pre');

  if (check_page) return { error: 'Not found' };

  const updatesLinks = await page.$$eval('package', (updates) =>
    updates.map((update) => ({
      version: update.getAttribute('version'),
      url: update.getAttribute('url'),
      size: update.getAttribute('size'),
    }))
  );

  return updatesLinks;
}
