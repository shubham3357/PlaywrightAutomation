const {test, expect} = require('@playwright/test')

test('End-to-end test',  async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder("email@example.com").fill('shubham@test.com');
    await page.getByPlaceholder("enter your passsword").fill('shubham123');
    await page.getByRole("button", {name: "Login"}).click();

    await page.locator('.card-body b').first().waitFor();
    await page.locator('.card-body').filter({hasText: 'ADIDAS ORIGINAL'}).getByRole("button", {name: "Add to Cart"}).click();

    /*
    * completed in line 11
    const productCount = await productList.count();

    for (let i = 0; i < productCount; i++) {
        //console.log(await productList.nth(i).locator('b').textContent());
        if(await productList.nth(i).locator('b').textContent() === "ADIDAS ORIGINAL"){
            await productList.nth(i).locator("text= Add To Cart").click();
        }
    }*/

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    await page.getByRole("button", {name: 'Checkout'}).waitFor();
    await page.getByRole("button", {name: 'Checkout'}).click();

    const [selectMonth, selectDate] = await page.locator(".input.ddl").all();
    await selectMonth.waitFor();
    await selectMonth.selectOption("12");
    await selectDate.selectOption("31");

    await page.getByPlaceholder('Select Country').pressSequentially("ind", {delay: 150});
    await page.getByRole("button", {name: "India"}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})