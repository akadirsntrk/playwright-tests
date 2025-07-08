class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: this.loginPayLoad
    });

    console.log("Login Status:", loginResponse.status());
    const loginResponseJson = await loginResponse.json();
    console.log("Login JSON:", loginResponseJson);

    if (!loginResponse.ok()) {
        throw new Error(`Login failed: ${loginResponseJson.message}`);
    }

    const token = loginResponseJson.token;
    return token;
}

async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        headers: {
            'Authorization': response.token, // or use `Bearer ${response.token}` if needed
            'Content-Type': 'application/json'
        }
    });

    const orderResponseJson = await orderResponse.json();
    console.log("Order response:", orderResponseJson);

    if (!orderResponse.ok()) {
        throw new Error(`Order creation failed: ${orderResponseJson.message}`);
    }

    const orderId = orderResponseJson.orders?.[0];
    response.orderId = orderId;
    return response;
}
}
 
module.exports = { APiUtils };