// @ts-check
import fs from "fs/promises";
import { getRandomInt, typeWithDelay } from "../config/delay-config";
const { test, expect } = require("@playwright/test");
const WALKTHROUGH_MODE = process.env.WALKTHROUGH_MODE;

test.beforeEach(async ({ page }) => {
  //Add click visual effects for walkthrough mode
  if (WALKTHROUGH_MODE == "on") {
    const func = (
      await fs.readFile(`${__dirname}/../injectables/function.js`)
    ).toString("utf8");

    const style = (
      await fs.readFile(`${__dirname}/../injectables/style.css`)
    ).toString("utf8");

    page.on("domcontentloaded", () => {
      // Inject CSS and JS whenever a new page loads
      page.addStyleTag({
        content: style,
      });
      page.addScriptTag({
        content: func,
      });
    });
  }

  //Set view port to match the dimensions of the video being generated
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("https://ca.idempotence.io/");
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "summerrutherford@nikolaus.name"
  );
  await typeWithDelay(page, 'input[id="password"]', "tryme");
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
    "carissakunze@lindgren.info"
  );

  await page.click(`.text-right button[id="form-submit"]`, {
    delay: getRandomInt(1000, 3000),
  });
  if (WALKTHROUGH_MODE == "on") {
    await page.waitForTimeout(5000);
  }
});
