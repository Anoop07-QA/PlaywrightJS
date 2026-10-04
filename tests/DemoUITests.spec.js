const {test,expect} = require('@playwright/test');

test("Verify Login Test", async({page})=> {
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('ahulshettyacade');
    await page.locator('#password').fill('Learning@830$3mK2');
    await signIn.click();
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill('rahulshettyacademy');
    await signIn.click();
    const title = await page.title();
    console.log(title)
    await expect(page).toHaveTitle('ProtoCommerce');
    const nameOfFirstPhone = await page.locator(".card-body a").nth(0).textContent();
    console.log(nameOfFirstPhone);
});

test("Radio Checkbox and Dropdown Test", async({page})=>{
    const radioButton = page.locator("[value='user']");
    const checkBox = page.locator('#terms');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await radioButton.click();
    await page.locator("#okayBtn").click();
    await expect(radioButton).toBeChecked();
    expect(await page.locator("[value='admin']").isChecked()).toBeFalsy();
    await page.locator("select.form-control").selectOption('Consultant');
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
});

test("Multiple tab test", async({browser})=> {
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("[href*='documents-request']").click()
        ]
    );
    console.log(await newPage.title());
});