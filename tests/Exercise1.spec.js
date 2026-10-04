const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const {CartPage} = require('../pageObjects/CartPage');
const {OrderConfirmationPage} = require('../pageObjects/OrderConfirmationPage');

test('Demo Site Test', async({page})=>{
    const productTitles = page.locator('.card-body b');
    
    await expect(page).toHaveTitle("Let's Shop");
    await page.waitForLoadState('networkidle');
    const allProducts = await productTitles.allTextContents();
    console.log(allProducts);
});

test.only("E2E testing of an app", async({page})=>{
    const productName = 'ZARA COAT 3';
    const email = "anoop1521@gmail.com";
    const password = "Anoop@18"
    //Login
    const loginPage = new LoginPage(page);
    await loginPage.LoginIntoApplication(email, password);
    //Product search
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.SearchAndAddToCardProduct(productName);
    await dashboardPage.NavigateToCart();
    //Cart
    const cartPage = new CartPage(page);
    await cartPage.VerifyTheProductIsVisible();
    await cartPage.ClickOnBuyNowButton();
    await cartPage.EnterPaymentDetails(" India");
    //Order confirmation
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await  orderConfirmationPage.VerifyOrderConfirmation(" Thankyou for the order. ")
    const orderId = await orderConfirmationPage.GetOrderId();
    await orderConfirmationPage.ClickOnOrderHistoryButton();
    //Order History
    const allOrders = page.locator("tbody tr");
    await page.waitForLoadState('networkidle');
    await allOrders.nth(0).waitFor();
    const allOrdersCount = await allOrders.count();
    await console.log(allOrdersCount);
    for(let i=0; i<allOrdersCount; i++)
    {
        const rowOrderId = await allOrders.nth(i).locator("th").textContent();
        if(await orderId.includes(rowOrderId))
        {
            await allOrders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }
    await expect(page.locator(".email-title")).toHaveText(" order summary ");
    await expect(orderId.includes(page.locator(".col-text").textContent()));
});