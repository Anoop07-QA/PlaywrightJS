class LoginPage{

    constructor(page){
        this.page = page;
        this.userNameTf = page.locator('#userEmail');
        this.passwordTf = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async LoginIntoApplication(userName, password){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await this.userNameTf.fill(userName);
        await this.passwordTf.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};