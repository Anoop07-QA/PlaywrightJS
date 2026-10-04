class ApiUtils{
    
    constructor(context,loginPayload){
    this.context = context;
    this.loginPayload = loginPayload;
    }
    
async GetToken(){
    const apiResponse = await this.context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: this.loginPayload
    });
    const apiResponseJson = await apiResponse.json();
    return await apiResponseJson.token;
}

async CreateOrder(orderPayload){
    let response = {};
    response.token = await this.GetToken();
    const orderResponse = await this.context.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            headers: {
                'authorization': await this.GetToken(),
                'Content-type': 'application/json',
            },
            data: orderPayload
        });
        const orderResponseJson = await orderResponse.json();
        const orderId =await orderResponseJson.orders[0];
    response.orderId = orderId;

    return response;
}
}

module.exports = {ApiUtils}