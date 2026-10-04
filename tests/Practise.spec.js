const {test,expect} = require('@playwright/test');

test.only('Sauce demo login test', async({page})=>{
         await page.goto('https://www.saucedemo.com/');
         await page.getByPlaceholder('Username').fill('standard_user');
         await page.getByPlaceholder('Password').fill('secret_sauce');
         await page.locator('#login-button').click();
         await page.locator('.inventory_item').first().waitFor();
         await page.locator('#add-to-cart-sauce-labs-backpack').click();
         await page.locator('.shopping_cart_link').click();
         await expect(page.locator('.cart_list .cart_item')).toHaveCount(1);
         await expect(page.locator('.cart_item').getByText('Sauce Labs Backpack')).toBeVisible();
});