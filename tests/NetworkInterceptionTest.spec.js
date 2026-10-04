const { test, expect, request } = require('@playwright/test');
const fakePayload = { "data": [], "message": "No Orders" }


test('Network interception test 1', async ({ page }) => {
    const email = "anoop1521@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Anoop@18');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.fetch(route.request());
        const body = JSON.stringify(fakePayload);
        route.fulfill({
            response,
            body,
        })
    });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());
})

test('Network interception test 2', async ({ page }) => {
    const email = "anoop1521@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Anoop@18');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route =>
        route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})