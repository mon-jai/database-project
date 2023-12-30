import { writeFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { queue } from "async"
import puppeteer from "puppeteer"

const productPromises = []
let fetchedCount = 0

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function fetchProduct(productUrl) {
  try {
    const page = await browser.newPage()
    const localFetchCount = fetchedCount++

    // TimeoutError: Navigation timeout of 30000 ms exceeded
    page.goto(productUrl)
    await sleep(5000)

    const imageUrls = await page.$$eval(".c-radiusPhotoImage:first-child img", imgs => imgs.map(img => img.src))
    const product = {
      id: localFetchCount,
      name: await page.$eval(".o-prodMainName", el => el.innerText),
      category: await page.$eval(".c-tagLink", el => el.innerText).substring(1),
      price: parseFloat(await page.$eval(".o-prodPrice__price", el => el.innerText).replaceAll(/[\$,]/g, "")),
      stock: 10,
      description: await page.$eval(".c-prodBriefing__slogan", el => el.innerText)
    }

    productPromises.push(fetchImages(imageUrls).then(images => ({ ...product, images })))

    console.log(`Fetched products: ${localFetchCount} / ${productUrls.length}`)
  } catch (e) {
    console.log(`Error: ${localFetchCount} / ${productUrls.length}: ${productUrl}`)
  }

  // Avoid hitting rate limit
  await sleep(3000)
}

async function fetchImages(imageUrls) {
  return Promise.all(
    imageUrls.map(async imageUrl => {
      const response = await fetch(imageUrl)
      const arrayBuffer = await response.arrayBuffer()
      return `data:${response.headers.get("Content-Type")};base64,${Buffer.from(arrayBuffer).toString("base64")}`
    })
  )
}

const browser = await puppeteer.launch({ headless: false })
const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), "products.json")

const page = await browser.newPage()
await page.goto("https://24h.pchome.com.tw/")
const productUrls = await page.$$eval("a[href^='https://24h.pchome.com.tw/prod']", aTags => aTags.map(a => a.href))

const fetchQueue = queue(fetchProduct, 3)
await fetchQueue.push(productUrls)
await fetchQueue.drain()

const product = await Promise.all(productPromises)
await writeFile(outputPath, JSON.stringify(product))
await browser.close()
