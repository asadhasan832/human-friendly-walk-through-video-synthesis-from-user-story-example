// @ts-check
const { test, expect } = require("@playwright/test");

const type_delay = 20;

async function typeWithDelay(page, selector, text, delay) {
  for (const char of text) {
    await page.type(selector, char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3000/");
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "garnetthudson@funk.biz",
    type_delay
  );
  await typeWithDelay(
    page,
    'input[id="password"]',
    "RPBUK%KE{ fq9zq;er<H",
    type_delay
  );
  await page.click(`button[id="form-submit"]`);
  await page.waitForSelector('ul[role="list"]');
});

test("IC-2 Send Connection Request", async ({ page }) => {
  await page.click(`ul[role="list"] li:nth-child(2) a`);
  await page.waitForSelector(`main button[type="button"]`);
  await page.click(`main button[type="button"]`);
  await page.waitForSelector(`input[id="email-address"]`);
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "holliekris@ernser.name",
    type_delay
  );

  await page.click(`.text-right button[id="form-submit"]`);
  await page.waitForTimeout(5000);
});
