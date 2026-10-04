const {test,expect} = require('@playwright/test');

test("Event Booking", async({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("anoop1521@gmail.com");
    await page.getByLabel("Password").fill("Anoop@18");
    await page.locator("#login-btn").click();
    await expect(page.locator("a span").filter({hasText:'Browse Events →'})).toBeVisible();
    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    const eventName = "EventName" + Date.UTC.now();
    await page.locator("#event-title-input").fill(eventName);
    await page.locator("#admin-event-form textarea").fill("Event Desc");
    await page.getByLabel("City").fill("Kerala");
    await page.locator("#venue").fill("TVM");
    await page.locator("event-date-&-time").fill('2030-10-23T12:00');
    await page.getByLabel("Price ($)").fill("99");
    await page.locator("Total Seats").fill("50");
    await page.getByRole("button", {name: 'submit'}).click();
    await expect(page.locator("p:has-text('Event created!')")).toBeVisible();
    await page.locator("#nav-events").click();
    const eventNames = await page.locator("#event-card");
    await eventNames.nth(0).waitFor();
    await page.getByPlaceholder("Search events, venues…").fill(eventName);
    const allEvents = await eventNames.allTextContents();
    await expect(page.locator("#event-card")).toHaveText(eventName);
    const seatsBeforeBooking = (await page.locator("#event-card span:has-text('seats')").textContent()).split(" ")[0];
    for(let i=0; i<eventNames.count(); i++)
    {
        if(await eventNames.nth(i).locator("h3") === eventName)
        {
            await eventName.nth(i).locator("#book-now-btn").click();
        }
    }
});