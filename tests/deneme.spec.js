const {test, expect} = require(`@playwright/test`);
const { title } = require("process");
const {LoginPage}=require('../pageobjects/LoginPage');
test.describe.configure({mode:'parallel'});
test(`Browser Playwright`,async ({browser}) =>{
    //playwright code
    //step 1 -open browser-
    //step 2 -enter u/p 2seconds
    //step 3 - click
        
        const context= await browser.newContext();
        const page = await context.newPage();
        const usrname = page.locator(`#username`);
        const parola = page.locator(`[type='password']`)
        const signIn = page.locator(`#signInBtn`);
        await page.goto(`https://rahulshettyacademy.com/loginpagePractise/`)
        console.log(await page.title());
        await expect(page).toHaveTitle(`LoginPage Practise | Rahul Shetty Academy`);
        await usrname.fill(`merhaba dunya`); // Bu locator sayesinde sitedeki belirledigim kutucugun veya butonun id sini girerek onun uzerine locate atamasi veya degistirme yapabiliyorum 
        await parola.fill(`merhaba dunya`); // Bu da type i sayesinde yapilmis baska bir yolu bircok yontemden birisi
        await signIn.click();
        // bu gorunene kadar yani block olana kadar bekleyeceksin (emir)
        console.log(await page.locator(`[style*='block']`).textContent()); // textContent ile icinde yazan yazi block oldugu zaman yaziyi alip yazdiriyoruz
        await expect(page.locator(`[style*='block']`)).toContainText(`Incorrect`);
        // Buda ContainText i expextliyoruz eger varsa boyle birsey gecis sagliyor degilse olmuyor
        await usrname.fill(``); // Yaziyi silmek icin  
        await usrname.fill(`rahulshettyacademy`); 
        await usrname.parola.fill(`learning`);
        console.log(await page.locator(`card.body a`).textContent());
        
});

test(`Page Playwright`,async ({page}) =>{
    //playwright code
    //step 1 -open browser-
    //step 2 -enter u/p 2seconds
    //step 3 - clickes
    await page.goto(`https://www.google.com`)
    
});
test.only(`Client App Login`,async ({page}) =>{
    //test.use({ storageState: undefined }); // tarayici bellegi sifirla
    const email = `agababa@gmail.com`
    const pasword = "Paris954!"
    const productName = `ZARA COAT 3`;
    const products = page.locator(".card-body");
    const loginpage = new LoginPage(page);
    loginpage.goTo();
    loginpage.validLogin(email,pasword);
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill(`Paris954!`);
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState(`networkidle`);
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
    // Trendyol
});
test(`UI Controls`,async ({page}) =>{
    await page.goto(`https://rahulshettyacademy.com/loginpagePractise/`);
    const documentLink = page.locator("[href*='documents-request']");
    const signIn = page.locator(`#signInBtn`);
    const usrname = page.locator(`#username`);
    const dropdown = page.locator(`select.form-control`); // Dropdown uniqe name located
    await dropdown.selectOption(`stud`); // The one I want to select at dropdown
    await page.locator(`.radiotextsty`).last().click();
    await page.locator(`#okayBtn`).click();
    await expect(page.locator(`.radiotextsty`).last()).toBeChecked();
    await page.locator(`#terms`).click();
    await expect(page.locator(`#terms`)).toBeChecked();
    await page.locator(`#terms`).uncheck();
    expect(await page.locator(`#terms`).isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    //await page.pause(); // To Pause the site until I close
    
});
test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
 
 })