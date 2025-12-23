const {test, expect} = require("@playwright/test");

test("Calender Handler", async ({ page }) => {
    const monthNumber= "8";
    const dayNumber= "18";
    const yearNumber= "2043";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    let currentYearRange = await page.locator(".react-calendar__navigation__label").textContent();
    let startingYear = parseInt(currentYearRange.split(" ")[0].trim());
    let endingYear = parseInt(currentYearRange.split(" ")[2].trim());
    do {
        if(startingYear > parseInt(yearNumber)){
            await page.locator(".react-calendar__navigation__prev-button").click();
        }else if(endingYear < parseInt(yearNumber)){
            await page.locator(".react-calendar__navigation__next-button").click();
        }else if((startingYear <= parseInt(yearNumber) && parseInt(yearNumber) <= endingYear)){
            break;
        }
        currentYearRange = await page.locator(".react-calendar__navigation__label").textContent();
        startingYear = parseInt(currentYearRange.split(" ")[0].trim());
        endingYear = parseInt(currentYearRange.split(" ")[2].trim());
    } while (true);

    await page.getByRole("button", {name: yearNumber}).click();
    await page.locator('.react-calendar__year-view__months__month').nth(parseInt(monthNumber)-1).click();
    await page.locator('.react-calendar__month-view__days__day').filter({ hasText: dayNumber }).click();

    
})