const {By, Builder, WebElementCondition,until} = require('selenium-webdriver');

const assert = require ("assert");

(async function loginpage() {
  let driver;
  
  try{
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://the-internet.herokuapp.com/login')
  }
  catch(err){
    console.log(err);
  }finally{
    await driver.quit();
  }
}()
)