const {test,expect} = require('@playwright/test');

test("E2E test for Greenkart", async({page})=>{
   await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
   await page.getByPlaceholder("Search for Vegetables and Fruits").fill("Berry");
   await page.waitForLoadState('networkidle');
   await page.locator("h4:has-text('berry')").nth(0).waitFor();
   const allBerries = page.locator("h4:has-text('berry')");
   for(let i=0; i<await allBerries.count(); i++)
   {
    if((await allBerries.nth(i).textContent()).includes("Strawberry"))
    {
        await page.locator(".product .product-image ~div .quantity").nth(i).click();
        await page.locator("button:has-text('ADD TO CART')").nth(i).click();
        break;
    }
   };
   await page.getByAltText("Cart").click();
   await page.getByRole('button', {name: 'PROCEED TO CHECKOUT'}).click();
   await page.getByRole('button', {name: 'Place Order'}).click();
   await page.locator("select").selectOption('India');
   await page.getByRole('button', {name: 'Proceed'}).click();
   await expect(page.locator(".errorAlert")).toBeVisible();
   await page.locator(".chkAgree").check();
   await page.getByRole('button', {name: 'Proceed'}).click();
   await expect(page.locator("span:has-text('Thank you')")).toBeVisible();
});