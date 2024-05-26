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
  page.on("domcontentloaded", () => {
    // Inject CSS and JS whenever a new page loads
    page.addStyleTag({
      content: `.click-animation {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: rgba(255, 0, 0, 0.3);
      opacity: 0;
      transition: all 1s ease-out;
    }`,
    });
    page.addScriptTag({
      content: `document.addEventListener('click', (event) => {
      console.log(event)
      // Create animation element
      const animationElement = document.createElement('div');
      animationElement.className = 'click-animation';
    
      // Set initial position based on click coordinates
      const clickX = event.clientX;
      const clickY = event.clientY;
      animationElement.style.top = clickY + 'px';
      animationElement.style.left = clickX + 'px';
      animationElement.style.width = 0 + 'px'
      animationElement.style.height = 0 + 'px'
      animationElement.style.opacity = 1;
      animationElement.style.zIndex = 9999999
    
      // Append animation element to the body
      document.body.appendChild(animationElement);
      setTimeout(() => {
        // Start the animation
        animationElement.style.opacity = 0;
        animationElement.style.width = '50px';
        animationElement.style.height = '50px';
        animationElement.style.top = clickY - 25 + 'px';
        animationElement.style.left = clickX -25 + 'px';
      }, 1);
      
      setTimeout(() => {
        animationElement.remove()
      }, 2000);
    });`,
    });
  });

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3001/");
  await typeWithDelay(
    page,
    'input[id="email-address"]',
    "porterhowell@parisian.com"
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
    "sandrineryan@hamill.biz"
  );

  await page.click(`.text-right button[id="form-submit"]`, {
    delay: getRandomInt(1000, 3000),
  });
  await page.waitForTimeout(5000);
});
