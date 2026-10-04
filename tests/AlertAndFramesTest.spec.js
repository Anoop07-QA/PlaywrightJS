const {test, expect} = require('@playwright/test');

test("Hidden and Alert and frames test", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByPlaceholder('Hide/Show Example').isVisible();
    await page.locator("#hide-textbox").click();
    await page.getByPlaceholder('Hide/Show Example').isHidden();
    //alert
    page.on('dialog', dialog=>dialog.accept());
    await page.locator('#confirmbtn').click();
    //frames
    const frames = page.frameLocator("#courses-iframe");
    await frames.locator("li a[href*='lifetime-access']:visible").click();
    const heading = await frames.locator(".text h2").textContent();
    await console.log(heading.split(" ")[1]);
});