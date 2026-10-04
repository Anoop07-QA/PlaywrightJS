const {test,expect} = require('@playwright/test');

test("Test with latest locators", async({page})=>{
    //const newExpect = expect.configure({timeout:7000});
    //test.setTimeout(60 * 1000)
    //page.setDefaultTimeout(8 * 1000);
    const productName = "ZARA COAT 3"
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("anoop1521@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Anoop@18");
    await page.getByRole("button", {name: 'Login'}).click();
    await page.locator(".card-body").filter({hasText:productName}).getByRole("button", {name:'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole('button', {name:'Cart'}).click();
    await page.locator(".infoWrap").filter({hasText:productName}).getByText("Buy Now").click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.locator(".ta-results").nth(0).waitFor();
    await page.locator(".ta-results button").filter({hasText:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId =await page.locator("label.ng-star-inserted").textContent();
    const realOrderId= orderId.replace("| ","").replace(" |","");
    await console.log(realOrderId);
    await page.locator("label[routerlink*='myorders']").click();
    await page.locator('.table').waitFor();
    await page.locator("tr.ng-star-inserted").filter({hasText:realOrderId.trim()}).first().getByRole("button", {name:'View'}).click();
    await expect(page.locator('.col-text')).toHaveText(realOrderId.trim());
});