const {expect} = require('@playwright/test');

class OrderConfirmationPage{
    constructor(page){
        this.page = page;
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
        this.orderHistoryButton = page.locator("[routerlink*='myorders']:has-text('Orders History Page')");
    }

    async VerifyOrderConfirmation(successMessage){
        await expect(this.orderConfirmation).toHaveText(successMessage);
    }

    async GetOrderId(){
        return await this.orderId.textContent();
    }

    async ClickOnOrderHistoryButton(){
        await this.orderHistoryButton.click();
    }
}

module.exports = {OrderConfirmationPage};