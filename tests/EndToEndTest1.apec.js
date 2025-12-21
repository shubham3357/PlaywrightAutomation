const {test} = require('@playwright/test')

test('End-to-end test',  async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('shubham@test.com');
    await page.locator('#userPassword').fill('shubham123');
    await page.locator('#login').click()
})