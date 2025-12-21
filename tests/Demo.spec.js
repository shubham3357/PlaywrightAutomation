import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://login.salesforce.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('shubhamsingh3357240@agentforce.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Salesforce1');
    await page.getByRole('checkbox', { name: 'Remember me' }).check();
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Verification Code' }).click();
    await page.getByRole('textbox', { name: 'Verification Code' }).fill('488892');
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.getByRole('link', { name: 'Accounts' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByRole('textbox', { name: 'Account Name' }).fill('Shubham1');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('menuitem', { name: 'Setup Opens in a new tab Setup for current app' }).click();
    const page1 = await page1Promise;
});