const {expect} = require('@playwright/test');

class CartPage{
    constructor(page){
        this.page = page;
        this.productElement = page.locator("h3:has-text('ZARA COAT 3')");
        this.buyNowButton = page.locator("button:has-text('Buy Now')");
        this.CvvTf = page.locator("div[class='title']:has-text('CVV Code ') + input");
        this.nameOnCard = page.locator("div[class='title']:has-text('Name on Card') + input")
        this.countryDd = page.locator("input[placeholder='Select Country']");
        this.dropdown = page.locator('.ta-results');
        this.submitButton = page.locator("a[class='btnn action__submit ng-star-inserted']");
    }

    async VerifyTheProductIsVisible(){
        await expect(this.productElement).toBeVisible();
    }

    async ClickOnBuyNowButton()
    {
        await this.buyNowButton.click();
    }

    async EnterPaymentDetails(country)
    {
        await this.CvvTf.fill('456');
        await this.nameOnCard.fill('Anoop');
        await this.countryDd.pressSequentially('Ind');
        await this.dropdown.waitFor();
        const allCountriesCount = await this.dropdown.locator("button").count();
        for(let i=0; i<allCountriesCount; i++)
        {
           if(await this.dropdown.locator("button").nth(i).textContent() === country)
           {
              await this.dropdown.locator("button").nth(i).click();
              break;
            }
        }
    await this.submitButton.click();
    }
}

module.exports = {CartPage};