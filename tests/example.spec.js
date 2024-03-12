// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .locator('input[id="email-address"]')
    .fill("garnetthudson@funk.biz");
  await page.locator('input[id="password"]').fill("RPBUK%KE{ fq9zq;er<H");
  await page.click(`button[id="form-submit"]`);
  await page.waitForSelector('ul[role="list"]');
});

test("IC-2 Send Connection Request", async ({ page }) => {
  await page.click(`ul[role="list"] li:nth-child(2) a`);
  await page.waitForSelector(`main button[type="button"]`);
  await page.click(`main button[type="button"]`);
  await page.waitForSelector(`input[id="email-address"]`);
  await page
    .locator('input[id="email-address"]')
    .fill("holliekris@ernser.name");
  await page.click(`.text-right button[id="form-submit"]`);
  //await page.waitForTimeout(5000);
});
