"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableScraper = exports.HTMLScraper = exports.fetcher = void 0;
const jsdom_1 = require("jsdom");
// @ts-ignore
const table_scraper_1 = __importDefault(require("table-scraper"));
// function to handle requests to the web
function fetcher(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            return response;
        }
        catch (error) {
            console.log(`Error in fetcher() with url: ${url} --> ${error}`);
        }
    });
}
exports.fetcher = fetcher;
// class to scrape table data from a website
class HTMLScraper {
    constructor(url) {
        this.url = url;
        // Document object to store html
        this.html = {};
    }
    // get function for returning html
    get getHTML() {
        // convert html to string
        const htmlString = this.html.documentElement.outerHTML;
        // return the html from the JSDOM object
        return htmlString;
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
    scrapeHTML() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the html from the website
                const response = yield fetcher(this.url);
                // get text from the response
                const text = yield response.text();
                // create a new JSDOM object
                const dom = new jsdom_1.JSDOM(text);
                // set the html property to the html from the JSDOM object
                this.html = dom.window.document;
            }
            catch (error) {
                console.log(`Error in scrape() --> ${error}`);
            }
        });
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
    getNestedByTag(tag) {
        // get all elements with the given tag
        const targets = this.html.getElementsByTagName(tag);
        // get all of the nested elements for each target
        const nestedTargets = Array.from(targets).map(target => {
            // get all of the nested elements
            const nested = target.getElementsByTagName("*");
            // return the nested elements
            return nested;
        });
        // return the nested elements
        return nestedTargets;
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
    convertTagsToStrings(tags) {
        // convert HTMLCollectionOf<Element> to string[]
        const strings = Array.from(tags).map(element => element.innerHTML);
        // return the string[]
        return strings;
    }
}
exports.HTMLScraper = HTMLScraper;
class TableScraper extends HTMLScraper {
    constructor(url) {
        super(url);
        this.data = {};
    }
    get getData() {
        // convert json array to string
        const dataString = JSON.stringify(this.data);
        return dataString;
    }
    scrapeTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield table_scraper_1.default.get(this.url).then((tableData) => {
                    this.data = tableData;
                });
            }
            catch (error) {
                console.log(`Error in scrapeTable() --> ${error}`);
            }
        });
    }
}
exports.TableScraper = TableScraper;
