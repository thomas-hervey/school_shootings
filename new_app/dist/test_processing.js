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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const testRun = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://en.wikipedia.org/wiki/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present)";
    const scraper = new utils_1.TableScraper(url);
    yield scraper.scrapeTable();
    // save the data to a file
    const data = scraper.getData;
    // @ts-ignore
    fs.writeFileSync("../../data/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json", data, (err) => {
        if (err) {
            console.log(err);
        }
    });
});
testRun();
