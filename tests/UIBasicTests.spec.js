// {test} is a function provided by Playwright to create a test case
const { test, expect } = require('@playwright/test');

//{browser} is a fixture provided by Playwright to create a browser instance
test('First Testcase', async ({ browser }) => {
    console.log('First Testcase');

    //newContext() is a method provided by Playwright to create a new browser context 
    const context = await browser.newContext();

    //newPage() is a method provided by Playwright to create a new browser page
    const page = await context.newPage();

    //goto() is a method provided by Playwright to navigate to a URL
    await page.goto('https://www.google.com');
});

//{page} is a fixture provided by Playwright to create a browser page 
//(If cookies are not required to be passed in browser)
test('Second Testcase', async ({ page }) => {
    await page.goto('https://www.youtube.com');
    console.log('Page title is: ' + await page.title());
    await expect(page).toHaveTitle('YouTube');
});


test.only('Login Testcase', async ({ page }) => {

    //Locators
    const usernameLocator = page.locator('#username');
    const passwordLocator = page.locator('[type="password"]');
    const signInBtnLocator = page.locator('#signInBtn');
    const productTitleCardLocator = page.locator('.card-title a');  

    //Navigation
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await usernameLocator.fill('username');
    await passwordLocator.fill('password');
    await signInBtnLocator.click();

    //Assertions
    await expect(page.locator('.alert-danger')).toContainText('Incorrect');

    await usernameLocator.fill('');
    await usernameLocator.fill('rahulshettyacademy');
    await passwordLocator.fill('learning');
    await signInBtnLocator.click();

    //const firstProductName = await productTitleCardLocator.nth(0).textContent();
    //expect(firstProductName).toBe('iphone X');

    /*
    Note: below will not work, because playwright does not wait for allTextContents() to be loaded
    expect(await productTitleCardLocator.allTextContents()).toContain('iphone X');
    */

    expect(await productTitleCardLocator.allTextContents()).toContain('iphone X');

});
