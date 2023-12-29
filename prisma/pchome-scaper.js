import { writeFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { queue } from "async"
import puppeteer from "puppeteer"

const sleep = ms => new Promise(r => setTimeout(r, ms))

const browser = await puppeteer.launch({ headless: "new" })
const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), "products.json")
const products = []
let fetchedCount = 0

const page = await browser.newPage()
await page.goto("https://24h.pchome.com.tw/")
const productUrls = await page.$$eval("a[href^='https://24h.pchome.com.tw/prod']", aTags => aTags.map(a => a.href))

const fetchQueue = queue(async productUrl => {
  const page = await browser.newPage()
  page.goto(productUrl)
  await sleep(5000)

  try {
    const imageUrls = await page.$$eval(".c-radiusPhotoImage:first-child img", imgs => imgs.map(img => img.src))

    products.push({
      name: await page.$eval(".o-prodMainName", el => el.innerText),
      category: await page.$eval(".c-tagLink", el => el.innerText.substring(1)),
      price: parseFloat(await page.$eval(".o-prodPrice__price", el => el.innerText.replaceAll(/[\$,]/g, ""))),
      stock: 10,
      description: await page.$eval(".c-prodBriefing__slogan", el => el.innerText),
      images: await Promise.all(
        imageUrls.map(async imageUrl => {
          const response = await fetch(imageUrl)
          const arrayBuffer = await response.arrayBuffer()
          return `data:${response.headers.get("Content-Type")};base64,${Buffer.from(arrayBuffer).toString("base64")}`
        })
      )
    })
  } catch (e) {
    console.log(productUrl)
  }

  fetchedCount++
  console.log(`Fetching products: ${fetchedCount} / ${productUrls.length}`)

  // Avoid hitting rate limit
  await sleep(3000)
}, 3)
await fetchQueue.push(productUrls)
await fetchQueue.drain()

await writeFile(outputPath, JSON.stringify(products))
await browser.close()
