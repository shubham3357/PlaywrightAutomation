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


test('Login Testcase', async ({ page }) => {

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


test('UI Element controller test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const usernameLocator = page.locator('#username');
    const passwordLocator = page.locator('[type="password"]');
    const dropdownLocator = page.locator('select.form-control');

    await usernameLocator.fill('rahulshettyacademy');
    await passwordLocator.fill('learning');
    await dropdownLocator.selectOption('consult');
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());

    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    // pause the test in between to check if working correct or not
    // await page.pause();

    const blinkingDocumentLocator = page.locator('a[href*="documents-request"]');
    await expect(blinkingDocumentLocator).toHaveAttribute('class', 'blinkingText');

});

test.only('UI Child window handler', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameLocator = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkingDocumentLocator = page.locator('a[href*="documents-request"]');

    //Promise all will wait for all the promises inside it to be completed async
    //[newPage] is the retuning index of promise all
    // Note:
    // 1. as only index 0 of promise all is returning something i.e., we have given [newPage]
    // 2. if second index also return something then we will give [newPage, variable to store returning of index 1]
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            blinkingDocumentLocator.click()
        ]
    )

    const text = await newPage.locator('.red').textContent();
    const domainName = text.split('@')[1].split(' ')[0];
    //console.log(domainName);

    await usernameLocator.fill(domainName);

    //we use input value if the locator is not in dom, and we want to access what we have entered in the text
    console.log(await usernameLocator.inputValue());
});
