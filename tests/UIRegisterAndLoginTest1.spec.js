const { test, expect } = require('@playwright/test');

test('UI Register and Login Test', async ({ page }) => {

    //change email each time you run
    const userNameText = 'shubham6@yopmail.com';
    const passwordText = 'Shubham@123';

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    //Click on Register Here
    await page.locator('.text-reset').click();

    //Fill Register Form
    await page.locator('#firstName').fill('Shubham');
    await page.locator('#lastName').fill('Singh');
    await page.locator('#userEmail').fill(userNameText);
    await page.locator('#userMobile').fill('1234567890');
    await page.locator('#userPassword').fill(passwordText);
    await page.locator('#confirmPassword').fill(passwordText);
    await page.locator('[type="checkbox"]').check();

    //Click on Register
    await page.locator('#login').click();

    await page.locator('.headcolor').textContent('Account Created Successfully');
    await page.locator('button').click();
    //await expect(page.locator('#toast-container')).toContainText('User already exists');

    //Fill Login Form
    await page.locator('#userEmail').fill(userNameText);
    await page.locator('#userPassword').fill(passwordText);

    //Click on Login
    await page.locator('#login').click();

    const firstProductName = await page.locator('.card-body b').nth(0).textContent();
    await expect(firstProductName).toBe('ZARA COAT 3');
});