/** 
 * Description : Automates a login attempt on the-internet.herokuapp.com
 *               using Invalid credentials, verifies the usuccessfull message,
 *               and captures a screenshot.
 */

//Dependencies
const {By, Builder,until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--remote-allow-origins=*');
const assert = require ("assert");
const fs = require("fs");   


(async function loginpageFailed() {
  let driver;
  
  try{
    //Launch a new Chrome browser session
    driver = await new Builder().forBrowser('chrome').build();

      //Navigate to the login pag 
    await driver.get('https://the-internet.herokuapp.com/login')

    // Fill in the userename and password fields 
    // Perform login with invalid credentials
    await driver.wait(until.elementLocated(By.id('username')), 10000).sendKeys("kennymafabatho");
    await driver.wait(until.elementLocated(By.id('password')),10000).sendKeys("eTalente");
    const loginBtn = await driver.findElement(By.css('button[type="submit"]'));

    loginBtn.click();


    // Verify the login is actually unsuccesful by checking the message text.
    // If this assertion passes, it throws an error with a helpful message
    // showing exactly what text was returned, making debugging easier.
    const unsuccesssMsg = await driver.wait(until.elementLocated(By.css('.flash.error')), 10000);
    const msgtext = await unsuccesssMsg.getText();

    // Confirms the login was correctly rejected. On failure, the error
    // message includes the actual message text returned, to speed up
    // debugging
    assert.ok(
      msgtext.includes('Your username is invalid!'),
      `Test failed and expected invalid username message but displayed:"${msgtext}"`
    );

    console.log('Failed Login Test Passed (Negative Test)');

    // Capture a screenshot of the browser as proof of unsuccessful login.
    // takeScreenshot() returns image.
    const image = await driver.takeScreenshot();
    fs.writeFileSync('login-unsuccessfull.png', image, 'base64');
    console.log('Screenshot saved as login-unsuccesfull.png');

  }
  catch(err){
    // Catches both Selenium errors
    // and assertion failures
    console.error("Test failed:", err);
  }finally{
    // Closing the browser, whether the test passed or failed
    await driver.quit();
  }
}()
)