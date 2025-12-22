const {test, expect} = require('@playwright/test')

test('End-to-end test',  async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('shubham@test.com');
    await page.locator('#userPassword').fill('shubham123');
    await page.locator('#login').click();
    await page.locator('.card-body').first().waitFor();

    const productList= page.locator('.card-body');
    const productCount = await productList.count();
    for (let i = 0; i < productCount; i++) {
        //console.log(await productList.nth(i).locator('b').textContent());
        if(await productList.nth(i).locator('b').textContent() === "ADIDAS ORIGINAL"){
            await productList.nth(i).locator("text= Add To Cart").click();
        }
    }

    await page.locator("li button i.fa-shopping-cart").click();

    //has-text is a sudo code which means find all the button whose text value is Checkout
    await page.locator("button:has-text('Checkout')").waitFor();
    await page.locator("button:has-text('Checkout')").click();

    const [selectMonth, selectDate] = await page.locator(".input.ddl").all();
    await selectMonth.waitFor();
    await selectMonth.selectOption("12");
    await selectDate.selectOption("31");
    //await page.pause();

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", {delay: 150});
    const countryDropdown = page.locator("section.ta-results button");
    await page.locator("section.ta-results").waitFor();
    const countryCount = await countryDropdown.count();

    for (let i = 0; i < countryCount; i++) {
        if(await countryDropdown.nth(i).textContent() === " India"){
            await countryDropdown.nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText('shubham@test.com');
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    orderId = orderId.trim().split("|")[1].trim();
    console.log("Order id: "+orderId);

    await page.locator("button[routerLink='/dashboard/myorders']").click()
    const orderList = page.locator("tr.ng-star-inserted");
    await page.locator("tr.ng-star-inserted").first().waitFor();
    const orderCount = await orderList.count();
    for (let i = 0; i < orderCount; i++) {
        if(await orderList.nth(i).locator("th").textContent() === orderId){
            await orderList.nth(i).locator("button.btn-primary").click();
        }
    }

    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
})