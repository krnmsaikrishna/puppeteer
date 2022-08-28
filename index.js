const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

const port = process.env.PORT || 3131 


function screenshot(url) {

  return new Promise((resolve, reject) => {

    ;(async () => {

      const browser = await puppeteer.launch({

        // headless: true, // debug only

        args: ['--no-sandbox']

      })

      const page = await browser.newPage()

      await page.goto(url, {

        waitUntil: ['load', 'networkidle0', 'domcontentloaded']

      })

      await page.waitForTimeout(1000)

      await page.emulateMedia('screen')

      const buffer = await page.screenshot({

        fullPage: true,

        type: 'png'

      })

      await browser.close()

      resolve(buffer)

    })()

  })

}


app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))

app.get('/screenshot', (req, res) => {

  const url = req.query.url

  ;(async () => {

    const buffer = await screenshot(url)

    res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')

    res.setHeader('Content-Type', 'image/png')

    res.send(buffer)

  })()

})


app.listen(port, () => console.log(`app listening on port ${port}!`))
