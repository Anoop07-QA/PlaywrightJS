const {test,expect,request} = require('@playwright/test');
const loginPayload = {email: "userAnoop1@gmail.com", password: "Anoop@18"};
const bookingPayload = {customerName: "Anoop", customerEmail: "userAnoop1@gmail.com", customerPhone: "9999999999", eventId: "3", quantity: "1" };
let token;
let bookingRefs;
let bookingId;

test.beforeAll(async({})=>{
    const context = await request.newContext();
    const response = await context.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",{
        data:loginPayload
    });
    const responseJson = await response.json();
    token = await responseJson.token;

    const bookingResponse = await context.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",{
        data: bookingPayload,
        headers: {
          'authorization' : `Bearer ${token}`,
        }
    });
    const bookingResponseJson = await bookingResponse.json();
    bookingRefs = await bookingResponseJson.data.bookingRef;
    bookingId = await bookingResponseJson.data.id;
});

test("Assignment2", async({page})=>
{
   await page.goto("https://eventhub.rahulshettyacademy.com/login");
   await page.locator('#email').fill("userAnoop2@gmail.com");
   await page.locator('#password').fill("Anoop@18");
   await page.locator('#login-btn').click();
   await page.waitForLoadState('networkidle');
   await page.goto("https://eventhub.rahulshettyacademy.com/bookings/" + bookingId);
   await expect(page.locator("h3:has-text('Access Denied')")).toBeVisible();
});