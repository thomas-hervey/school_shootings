import { JSDOM } from "jsdom"
// @ts-ignore
import scraper from "table-scraper"

// function to handle requests to the web
export async function fetcher(url: string): Promise<any> {
  try {
    const response = await fetch(url)
    return response
  } catch (error) {
    console.log(`Error in fetcher() with url: ${url} --> ${error}`)
  }
}

// class to scrape table data from a website
export class HTMLScraper {

  // Document object to store html
  public html: Document = <Document>{}

  constructor(protected url: string) {}

  // get function for returning html
  get getHTML(): string {
    // convert html to string
    const htmlString = this.html.documentElement.outerHTML
    // return the html from the JSDOM object
    return htmlString
  }

  /**
   * scrape() returns a promise that resolves to a string[][] containing the table data from the website
   *
   * @example:
   * const scraper = new Scraper("https://www.example.com)
   * await scraper.scrape()
   * const data = scraper.getHTML()
   *
   * @param url - the url of the website to scrape
   * @returns Promise<string[][]>
   */
  public async scrapeHTML(): Promise<void> {
    try {
      // get the html from the website
      const response = await fetcher(this.url)
      // get text from the response
      const text = await response.text()

      // create a new JSDOM object
      const dom = new JSDOM(text)
      // set the html property to the html from the JSDOM object
      this.html = dom.window.document

    } catch (error) {
      console.log(`Error in scrape() --> ${error}`)
    }
  }

  /**
   * getNestedByTag() returns an HTMLCollectionOf<Element>[] containing the nested elements for each element with the given tag
   *
   * @example:
   * const scraper = new Scraper("https://example.com")
   * await scraper.scrape()
   * const nested = scraper.getNestedByTag("table")
   *
   * @param tag - the string tag to search for
   * @returns HTMLCollectionOf<Element>[]
  */
  public getNestedByTag(tag: string): HTMLCollectionOf<Element>[] {
    // get all elements with the given tag
    const targets = this.html.getElementsByTagName(tag)

    // get all of the nested elements for each target
    const nestedTargets = Array.from(targets).map(target => {
      // get all of the nested elements
      const nested = target.getElementsByTagName("*")
      // return the nested elements
      return nested
    })

    // return the nested elements
    return nestedTargets
  }

  /**
   * convertTagsToStrings() converts an HTMLCollectionOf<Element> to a string[]
   *
   * @example:
   * const scraper = new Scraper("https://example.com")
   * await scraper.scrape()
   * const nested = scraper.getNestedByTag("table")
   * const strings = nested.map(nest => scraper.convertTagsToStrings(nest))
   * console.log(strings[0])
   *
   * @param tags - HTMLCollectionOf<Element> to convert to string[]
   * @returns string[]
   */
  public convertTagsToStrings(tags: HTMLCollectionOf<Element>): string[] {
    // convert HTMLCollectionOf<Element> to string[]
    const strings = Array.from(tags).map(element => element.innerHTML)
    // return the string[]
    return strings
  }

}

interface TableJSON {
  [key: string]: string
}

export class TableScraper extends HTMLScraper {
  public data: TableJSON = <TableJSON>{}

  constructor(url: string) {
    super(url)
  }

  get getData(): string {
    // convert json array to string
    const dataString = JSON.stringify(this.data)
    return dataString
  }

  public async scrapeTable(): Promise<void> {
    try {
      await scraper.get(this.url).then((tableData: any) => {
        this.data = tableData
      })
    } catch (error) {
      console.log(`Error in scrapeTable() --> ${error}`)
    }
  }
}