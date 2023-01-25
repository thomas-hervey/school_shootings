"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFootnotes = void 0;
// remove footnotes from string
const removeFootnotes = (str) => {
    // replace any characters within square brackets with an empty string
    return str.toString().replace(/\[.*?\]/g, "");
};
exports.removeFootnotes = removeFootnotes;
