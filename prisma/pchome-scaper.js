import { writeFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { queue } from "async"
import puppeteer from "puppeteer"

const MAX_ITEM_TO_FETCH = 100

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchImages = imageUrls =>
  Promise.all(
    imageUrls.map(async imageUrl => {
      const response = await fetch(imageUrl)
      const arrayBuffer = await response.arrayBuffer()
      return `data:${response.headers.get("Content-Type")};base64,${Buffer.from(arrayBuffer).toString("base64")}`
    })
  )

// https://24h.pchome.com.tw/sign/3c
const productUrls = await fetch("https://ecapi-cdn.pchome.com.tw/fsapi/ecshop/composition/sign/v1/3c/data")
  .then(response => response.text())
  .then(text => text.matchAll(/"Url":"([A-Z0-9]{6}-[A-Z0-9]{9})"/g))
  .then(matches => [...matches].map(([_, match]) => "https://24h.pchome.com.tw/prod/" + match))

const browser = await puppeteer.launch({ headless: "new" })
const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), "products.json")
const productPromises = []
let fetchedCount = 0

const fetchQueue = queue(async productUrl => {
  let errorOccurred = false

  try {
    const page = await browser.newPage()

    await page.goto(productUrl)
    await sleep(5000)

    const imageUrls = [
      ...(await page.$$eval(".c-radiusPhotoImage:first-child img", imgs => imgs.map(img => img.src))),
      ...(await page.$$eval(".c-prodFeature__center > img", imgs => imgs.map(img => img.src)))
    ].slice(0, 3)

    if (imageUrls.length < 3) throw "Not enough images"

    const product = {
      name: await page.$eval(".o-prodMainName", el => el.innerText),
      category: await page.$eval(".c-tagLink", el => el.innerText.substring(1)),
      price: parseFloat(await page.$eval(".o-prodPrice__price", el => el.innerText.replaceAll(/[\$,]/g, ""))),
      stock: 10,
      description: await page.$eval(".c-prodBriefing__slogan", el => el.innerText)
    }

    productPromises.push(fetchImages(imageUrls).then(images => ({ ...product, images })))

    fetchedCount++
  } catch (e) {
    errorOccurred = true
  }

  const logPrefix = !errorOccurred ? "Fetched products:" : "Error:           "
  const logSuffix = !errorOccurred ? "" : `, ${productUrl}`
  console.log(`${logPrefix} ${fetchedCount + 1} / ${productUrls.length}${logSuffix}`)

  if (!errorOccurred && fetchedCount === MAX_ITEM_TO_FETCH) {
    const products = (await Promise.all(productPromises))
      .slice(0, MAX_ITEM_TO_FETCH)
      .map((product, index) => ({ id: index, ...product }))
    await writeFile(outputPath, JSON.stringify(products))

    fetchQueue.pause()
    fetchQueue.kill()

    await browser.close()
  }

  await page.close()
  // Avoid hitting rate limit
  await sleep(3000)
}, 3)
await fetchQueue.push(productUrls)
await fetchQueue.drain()
