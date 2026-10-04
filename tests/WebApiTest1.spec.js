const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "anoop1521@gmail.com", userPassword: "Anoop@18" };
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

const { ApiUtils } = require('../tests/Utils/ApiUtils');

test.beforeAll(async () => {
    const context = await request.newContext();
    const apiUtils = await new ApiUtils(context, loginPayload);
    response = await apiUtils.CreateOrder(orderPayload,loginPayload)
});

test("Web Api Test 1", async ({ page }) => {
    await console.log(response.token);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator('button[routerlink*="/dashboard/myorders"]').click();
    await page.locator("th[scope='row']").first().waitFor();
    const AllOrderIds = page.locator("th[scope='row']");
    for (let i = 0; i < await AllOrderIds.count(); i++) {
        if ((await AllOrderIds.nth(i).textContent()).includes(response.orderId)) {
            await page.locator("tr.ng-star-inserted").nth(i).locator("button:has-text('View')").click();
            break;
        }
    }
    await expect(page.locator(".col-text")).toContainText(response.orderId);
});