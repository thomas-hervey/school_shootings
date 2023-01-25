const fs = require('fs')

// const wikipedia = require('node-wikipedia')

// const sourcePage = wikipedia.page.data("School_shootings_in_the_United_States", { content: true}, (response) => {
//   console.log('hi there')
//   console.log(typeof response)
// })

const scraper = require('table-scraper')
const url = 'https://en.wikipedia.org/wiki/School_shootings_in_the_United_States'
scraper.get(url).then((tableData) => {
  const asString = JSON.stringify(tableData)
  // console.log(tableData[15])
  fs.writeFile("./raw_data/wiki_shootings.json", asString, (err) => {
    if (err) console.log(err)
    else { console.log('successfully saved') }
  })
})