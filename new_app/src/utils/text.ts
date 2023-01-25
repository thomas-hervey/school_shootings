// remove footnotes from string
export const removeFootnotes = (str: string) => {
  // replace any characters within square brackets with an empty string
  return str.toString().replace(/\[.*?\]/g, "")
}