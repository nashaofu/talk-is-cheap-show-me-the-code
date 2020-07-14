const got = require('got')
const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')

fs.readFile(path.join(__dirname, './app.html'))
  .then(async data => {
    const $ = cheerio.load(data)

    await Promise.all(
      $('script')
        .map((index, el) => $(el).attr('src'))
        .get()
        .map(async url => {
          console.log(url)
          const body = await got.get(url, {
            resolveBodyOnly: true
          })

          const filename = url.replace(/(https:\/\/cdn\.bootcdn\.net|https:\/\/cdn\.jsdelivr\.net)/, '')
          return fs.outputFile(path.join(__dirname, 'js', filename), body)
        })
    )

    $('script').each((index, el) => {
      const url = $(el)
        .attr('src')
        .replace(/(https:\/\/cdn\.bootcdn\.net|https:\/\/cdn\.jsdelivr\.net)/, '')
      $(el).attr('src', url)
    })

    return fs.outputFile(path.join(__dirname, '_app.html'), $.html())
  })
  .then(() => {
    console.log('done')
  })
  .catch(err => {
    console.log(err)
  })
