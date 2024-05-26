const CAPABILITY_WALKTHROUGH_MODE = process.env.CAPABILITY_WALKTHROUGH_MODE;

const delay_max = 100;
const delay_min = 10;

function getRandomInt(min, max) {
  // Ensure min <= max
  if (min > max) {
    [min, max] = [max, min]; // Swap values if min is greater than max
  }

  // Utilize Math.floor and Math.random to get a random integer within the range
  if (CAPABILITY_WALKTHROUGH_MODE == "on") {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 0;
  }
}

async function typeWithDelay(page, selector, text) {
  for (const char of text) {
    await page.type(selector, char);
    if (CAPABILITY_WALKTHROUGH_MODE == "on") {
      await new Promise((resolve) =>
        setTimeout(resolve, getRandomInt(delay_min, delay_max))
      );
    }
  }
}

export { getRandomInt, typeWithDelay };
