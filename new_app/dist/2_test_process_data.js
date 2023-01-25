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
const fs_1 = __importDefault(require("fs"));
const text_1 = require("./utils/text");
const filepath = "/Users/thomashervey/Projects/Personal/school_shootings/new_app/data/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json";
const filepath_updated = "/Users/thomashervey/Projects/Personal/school_shootings/new_app/data/UPDATED_List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json";
const removeUnnecessaryTables = (filepath) => __awaiter(void 0, void 0, void 0, function* () {
    // read file
    const file = yield fs_1.default.promises.readFile(filepath, "utf8");
    const data = JSON.parse(file);
    // NOTE: given the example below, remove the last three tables since they do not contain relevant data
    data.splice(-3, 3);
    // save file
    yield fs_1.default.promises.writeFile(filepath_updated, JSON.stringify(data, null, 2));
    return data;
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    let cleanedTables = yield removeUnnecessaryTables(filepath);
    // CLEAN EACH OBJECT
    // iterate over tables
    cleanedTables = cleanedTables.map((table) => {
        // iterate over objects in table
        table = table.map((obj) => {
            // iterate over keys in object
            Object.keys(obj).forEach((key) => {
                // 1. remove footnotes from each key
                obj[key] = (0, text_1.removeFootnotes)(obj[key]);
            });
            return obj;
        });
        return table;
    });
    // save file
    yield fs_1.default.promises.writeFile(filepath_updated, JSON.stringify(cleanedTables, null, 2));
    // TODO: geocode Location field
});
run();
