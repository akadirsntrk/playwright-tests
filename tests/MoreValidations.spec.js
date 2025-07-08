import { test, expect } from '@playwright/test';
test("Screenshot",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");  
    await page.locator("#displayed-text").screenshot({path:`partialScreenshot.png`});
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
});
test.only("visual",async({page})=>{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');  
    
});