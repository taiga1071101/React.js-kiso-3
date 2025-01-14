// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('email password isEmpty', async ({ page }) => {
    await page.click("#login-button");
    const emailError = await page.locator('p').nth(0);
    await expect(emailError).toHaveText('メールアドレスが空欄です');
    const passwordError = await page.locator('p').nth(1);
    await expect(passwordError).toHaveText('パスワードが空欄です');
  });

  test('email includes @', async ({ page }) => {
    await page.fill('input[type="email"]', 'testest');
    await page.fill('input[type="password"]', 'Pass1234');
    await page.click("#login-button");
  
    const emailError = await page.locator('p').nth(0);
    await expect(emailError).toHaveText('メールアドレスには「@」を含んでください');
  });

  test('passoword type error', async ({ page }) => {
    await page.fill('input[type="password"]', 'abcdefgh');
    await page.click("#login-button");
    let passwordError = await page.locator('p').nth(1);
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください');

    await page.fill('input[type="password"]', 'Abcd1234');
    await page.click("#login-button");
    passwordError = await page.locator('p').nth(1);
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください');

    await page.fill('input[type="password"]', '12345678');
    await page.click("#login-button");
    passwordError = await page.locator('p').nth(1);
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください');

    await page.fill('input[type="password"]', 'A#ua78');
    await page.click("#login-button");
    passwordError = await page.locator('p').nth(1);
    await expect(passwordError).toHaveText('パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください');
  });

  test('post OK', async ({ page }) => {
    await page.fill('input[type="email"]', 'testest@test.com');
    await page.fill('input[type="password"]', '#Pass741');
    await page.click("#login-button");
  
    const emailError = await page.locator('p').nth(0);
    const passwordError = await page.locator('p').nth(1);
    await expect(emailError).toHaveText('');
    await expect(passwordError).toHaveText('');
  });
});
