/** 
 * Description : Automates a login attempt on the-internet.herokuapp.com
 *               using valid credentials, verifies the success message,
 *               and captures a screenshot.
 */

//Dependencies
const {By, Builder,until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--remote-allow-origins=*');
const assert = require ("assert");
const fs = require("fs");  


(async function loginpage() {
  let driver;
  
  try{
      // Launch a new Chrome browser session
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
    //Navigate to the login page
    await driver.get('https://the-internet.herokuapp.com/login')

    
    // Fill in the userename and password fields 
    // Perform login with valid credentials
    await driver.findElement(By.id('username')).sendKeys("tomsmith");
    await driver.findElement(By.id('password')).sendKeys("SuperSecretPassword!");
    const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
    loginBtn.click();

    // Verify the login actually succeeded by checking the flash message text.
    // If this assertion fails, it throws an error with a helpful message
    // showing exactly what text was returned, making debugging easier.
    const successsMsg = await driver.wait(until.elementLocated(By.css('.flash.success')), 10000);
    const msgtext = await successsMsg.getText();

    assert.ok(
      msgtext.includes('You logged into a secure area!'),
      `Login failed and error message is: "${msgtext}"`
    );

    console.log('Login Test passed!');

    // Capture a screenshot of the browser as proof of successful login.
    // takeScreenshot() returns image.
    const image = await driver.takeScreenshot();
    fs.writeFileSync('login-success.png', image, 'base64');
    console.log('Screenshot saved as login-success.png');

  }
  catch(err){
    // Catches both Selenium errors
    // and assertion failures
    console.error("Login test failed:", err);
  }finally{
    // Closing the browser, whether the test passed or failed
    await driver.quit();
  }
}()
)