import { chromium } from 'playwright'

const widths = [320, 375, 390, 430]
const browser = await chromium.launch({ headless: true })
const failures = []

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => img.complete
      ? img.decode().catch(() => {})
      : new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })))
  })
  const result = await page.evaluate((viewportWidth) => {
    const rect = (element) => element.getBoundingClientRect()
    const images = [...document.images]
    const invalidImages = images.filter((img) => {
      const box = rect(img)
      return img.naturalWidth === 0 || img.naturalHeight === 0 || box.width <= 0 || box.height <= 0
    }).map((img) => img.src)
    const distortedPostImages = [...document.querySelectorAll('#postproduction img')].filter((img) => {
      const box = rect(img)
      const naturalRatio = img.naturalWidth / img.naturalHeight
      const renderedRatio = box.width / box.height
      return Math.abs(renderedRatio - naturalRatio) / naturalRatio > 0.02
    }).map((img) => img.src)
    const selectors = ['.hero-copy h1','.project-header h2','.project-note p','.cinema-grid figcaption strong','.contact-lines strong']
    const clippedText = [...document.querySelectorAll(selectors.join(','))].filter((element) => {
      const box = rect(element)
      return getComputedStyle(element).display !== 'none' && (box.left < -1 || box.right > viewportWidth + 1)
    }).map((element) => element.textContent.trim())
    const captionOverlaps = [...document.querySelectorAll('.cinema-grid figcaption')].flatMap((caption) => {
      const children = [...caption.children].filter((child) => getComputedStyle(child).display !== 'none')
      const overlaps = []
      for (let i = 0; i < children.length; i += 1) for (let j = i + 1; j < children.length; j += 1) {
        const a = rect(children[i]); const b = rect(children[j])
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) overlaps.push(caption.textContent.trim())
      }
      return overlaps
    })
    return { pageOverflow: document.documentElement.scrollWidth > viewportWidth + 1, invalidImages, distortedPostImages, clippedText, captionOverlaps }
  }, width)
  if (result.pageOverflow || result.invalidImages.length || result.distortedPostImages.length || result.clippedText.length || result.captionOverlaps.length) failures.push({ width, ...result })
  await page.close()
}
await browser.close()
if (failures.length) { console.error(JSON.stringify(failures, null, 2)); process.exit(1) }
console.log('Mobile layout checks passed at 320, 375, 390 and 430px.')
