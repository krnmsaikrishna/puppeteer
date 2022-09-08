const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

const port = process.env.PORT || 3131 


async function scr() {

url = "https://bscscan.com/address/0x7a2aaa499fd39762ba67d352ad87ceca79df1c3d" 

  return new Promise((resolve, reject) => {
    ;(async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      })

        const [page] = await browser.pages();

        await page.goto(url, { waitUntil: 'networkidle0' });
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
        return data;
        await browser.close();

/*

      const page = await browser.newPage()

      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

const data = await page.$$eval('tr td', tds => tds.map((td) => {
  return td.innerText;
}));
      await browser.close()
return data
*/


    })()
  })
}


app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))

app.get('/scr', (req, res) => {

  ;(async () => {
    const dar = await scr();
    res.send(dar);
  })()



})


app.listen(port, () => console.log(`app listening on port ${port}!`))
