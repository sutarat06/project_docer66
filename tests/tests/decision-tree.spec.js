import { test, expect } from '@playwright/test';

const url = "https://computer.surin.rmuti.ac.th/aprdt/DT/ระบบแนะนำรายวิชาชีพเลือกด้วยต้นไม้ตัดสินใจ/";

async function startTest(page){

  await page.goto(url);
  await page.waitForLoadState('networkidle');

  // กดเริ่มต้นระบบ
  await page.getByText('รับคำแนะนำทันที').click();

  // รอ popup login ปรากฏ
  await page.waitForSelector('.modal-content');

  // กดปุ่มปิด X
const closeBtn = page.locator('.modal-header button');

  if(await closeBtn.isVisible()){
  await closeBtn.click({ force: true });
}

  // รอระบบโหลดคำถาม
  await page.waitForTimeout(2000);

  // ตรวจสอบว่ามี radio
  await page.waitForSelector('input[type="radio"]');

}
// TC01 เปิดเว็บไซต์
test('TC01 - open website', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
});

// TC02 ตรวจสอบ title
test('TC02 - check page title', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(/ระบบแนะนำรายวิชาชีพเลือก/);
});

// TC03 ตรวจสอบ body
test('TC03 - check body visible', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('body')).toBeVisible();
});

// TC04 ปุ่มเริ่มต้น
test('TC04 - click start button', async ({ page }) => {
  await page.goto(url);
  await page.getByText('รับคำแนะนำทันที').click();
});

// TC05 แสดงคำถามแรก
test('TC05 - show first question', async ({ page }) => {
  await startTest(page);
  await expect(page.locator('input[type="radio"]').first()).toBeVisible();
});

// TC06 มีตัวเลือกคำตอบ
test('TC06 - check answer options', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await expect(radios.first()).toBeVisible();
});

// TC07 เลือกตัวเลือกแรก
test('TC07 - select first option', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await radios.first().click();
});

// TC08 เลือกตัวเลือกที่สอง
test('TC08 - select second option', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await radios.nth(1).click();
});

// TC09 เลือกตัวเลือกที่สาม
test('TC09 - select third option', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await radios.nth(2).click();
});

// TC10 กดปุ่มถัดไป
test('TC10 - click next button', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await radios.first().click();
  await page.getByRole('button', { name: /ถัดไป|next/i }).click();
});

// TC11 แสดงคำถามถัดไป
test('TC11 - show next question', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await radios.first().click();
  await page.getByRole('button', { name: /ถัดไป|next/i }).click();
  await expect(page.locator('body')).toBeVisible();
});

// TC12 radio button มีอยู่จริง
test('TC12 - radio exists', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');
  await expect(radios.first()).toBeVisible();
});

// TC13 radio button มากกว่า 1
test('TC13 - radio count', async ({ page }) => {
  await startTest(page);
  const radios = page.locator('input[type="radio"]');

  const count = await radios.count();
  expect(count).toBeGreaterThan(1);
});

// TC14 ปุ่ม next แสดง
test('TC14 - next button visible', async ({ page }) => {
  await startTest(page);

  await expect(page.getByRole('button', { name: /ถัดไป|next/i })).toBeVisible();
});

// TC15 เลือกคำตอบแล้วกด next
test('TC15 - answer and next', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');

  await radios.first().click();
  await page.getByRole('button', { name: /ถัดไป|next/i }).click();
});

// TC16 ตรวจ body หลังตอบ
test('TC16 - body after answer', async ({ page }) => {
  await startTest(page);

  const radios = page.locator('input[type="radio"]');

  await radios.first().click();
  await page.getByRole('button', { name: /ถัดไป|next/i }).click();
  await expect(page.locator('body')).toBeVisible();
});

// TC17 ตรวจ title ยังอยู่
test('TC17 - title still exists', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(/ระบบ/);
});

// TC18 ตรวจ container
test('TC18 - container exists', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('div').first()).toBeVisible();
});

// TC19 ตรวจ input element
test('TC19 - input elements exist', async ({ page }) => {
  await startTest(page);
  await expect(page.locator('input').first()).toBeVisible();
});

// TC20 ตรวจ container
test('TC20 - container visible', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('div').first()).toBeVisible();
});

// TC21 แสดงผลหลังตอบ
test('TC21 - show result after answering', async ({ page }) => {
  await startTest(page);
  await page.locator('input[type="radio"]').first().click();
  await page.getByRole('button').last().click();
  await expect(page.locator('body')).toBeVisible();
});

// TC22 ปุ่ม start ยังมี
test('TC22 - start button visible', async ({ page }) => {
  await page.goto(url);
  await expect(page.getByText('รับคำแนะนำทันที')).toBeVisible();
});

// TC23 ตรวจ header
test('TC23 - header exists', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('h1').first()).toBeVisible();
});

// TC24 ตรวจ paragraph
test('TC24 - paragraph exists', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('p').first()).toBeVisible();
});

// TC25 ตรวจ link
test('TC25 - check link elements', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('a').first()).toBeVisible();
});

// TC26 ตรวจ script
test('TC26 - check script elements', async ({ page }) => {
  await page.goto(url);
  const scripts = page.locator('script');
  await expect(scripts.first()).toBeAttached();
});

// TC27 ตรวจ css
test('TC27 - check css loaded', async ({ page }) => {
  await page.goto(url);
  const css = page.locator('link[rel="stylesheet"]');
  await expect(css.first()).toBeAttached();
});

// TC28 title exists
test('TC28 - title exists', async ({ page }) => {
  await page.goto(url);
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});

// TC29 ตรวจ page url
test('TC29 - check page url', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveURL(url);
});