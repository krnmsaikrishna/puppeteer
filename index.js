const express = require('express');
const puppeteer = require('puppeteer');
const port = process.env.PORT || 3131;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const app = express();

// ok

const getBrowser = () =>
  IS_PRODUCTION
    ? puppeteer.connect({ browserWSEndpoint: 'wss://chrome.browserless.io?token=968d84d4-8532-425a-91b1-dae9ba8a1b46' })
    : puppeteer.launch();

app.get('/image', async (req, res) => {
  let browser = null;

  try {
    browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto('https://www.gktoday.in/quizbase/current-affairs-quiz-january-2022?pageno=1');
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    res.send(data);
    
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).send(error.message);
    }
  } finally {
    if (browser) {
      browser.close();
    }
  }
});

app.listen(port, () => console.log('Listening on PORT: 8080'));

