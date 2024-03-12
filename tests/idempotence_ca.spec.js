// @ts-check
const { test, expect } = require("@playwright/test");

const delay_max = 100;
const delay_min = 10;

function getRandomInt(min, max) {
  // Ensure min <= max
  if (min > max) {
    [min, max] = [max, min]; // Swap values if min is greater than max
  }

  // Utilize Math.floor and Math.random to get a random integer within the range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function typeWithDelay(page, selector, text) {
  for (const char of text) {
    await page.type(selector, char);
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomInt(delay_min, delay_max))
    );
  }
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3000/");
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "garnetthudson@funk.biz"
  );
  await typeWithDelay(page, 'input[id="password"]', "RPBUK%KE{ fq9zq;er<H");
  await page.click(`button[id="form-submit"]`, {
    delay: getRandomInt(1000, 3000),
  });
  await page.waitForSelector('ul[role="list"]');
});

test("IC-2 Send Connection Request", async ({ page }) => {
  await page.click(`ul[role="list"] li:nth-child(2) a`, {
    delay: getRandomInt(1000, 3000),
  });
  await page.waitForSelector(`main button[type="button"]`);
  await page.click(`main button[type="button"]`, {
    delay: getRandomInt(1000, 3000),
  });
  await page.waitForSelector(`input[id="email-address"]`);
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "holliekris@ernser.name"
  );

  await page.click(`.text-right button[id="form-submit"]`, {
    delay: getRandomInt(1000, 3000),
  });
  await page.waitForTimeout(5000);
});
