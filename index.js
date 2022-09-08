const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

const port = process.env.PORT || 3131 


function scr() {

url = "https://bscscan.com/address/0x7a2aaa499fd39762ba67d352ad87ceca79df1c3d" 

  return new Promise((resolve, reject) => {
    ;(async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      })

      const page = await browser.newPage()

      await page.goto(url, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      })

const data = await page.$$eval('table tr td', tds => tds.map((td) => {
  return td.innerText;
}));

console.log(data);
      
      

      await browser.close()
    })()
  })
}


app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))

app.get('/scr', (req, res) => {



/*

  const url = req.query.url

  ;(async () => {

    const buffer = await screenshot(url)

    res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')

    res.setHeader('Content-Type', 'image/png')

    res.send(buffer)

  })()
*/



})


app.listen(port, () => console.log(`app listening on port ${port}!`))
