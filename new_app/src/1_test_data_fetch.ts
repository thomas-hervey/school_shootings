import { TableScraper } from "./utils"

const testRun = async () => {
  const url = "https://en.wikipedia.org/wiki/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present)"

  const scraper = new TableScraper(url)
  await scraper.scrapeTable()

  // save the data to a file
  const data = scraper.getData
  // @ts-ignore
  fs.writeFileSync("../../data/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json", data, (err: any) => {
    if (err) {
      console.log(err)
    }
  })
}

testRun()