class DashboardPage{
    constructor(page){
        this.page = page;
        this.allProducts = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async SearchAndAddToCardProduct(productName){
         await this.allProducts.nth(0).waitFor();
         const numberOfProducts = await this.allProducts.count();
         for(let i=0; i<numberOfProducts; i++)
         {
            if(await this.allProducts.nth(i).locator("b").textContent() === productName)
            {
                await this.allProducts.nth(i).locator("text= Add To Cart").click();
                break;
            }
         };
    }

    async NavigateToCart()
    {
        await this.cart.click();
    }
}

module.exports = {DashboardPage};