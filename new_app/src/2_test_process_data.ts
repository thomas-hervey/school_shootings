import fs from "fs"
import { removeFootnotes } from "./utils/text"


const filepath = "/Users/thomashervey/Projects/Personal/school_shootings/new_app/data/List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json"
const filepath_updated = "/Users/thomashervey/Projects/Personal/school_shootings/new_app/data/UPDATED_List_of_school_shootings_in_the_United_States_(2000%E2%80%93present).json"

const removeUnnecessaryTables = async (filepath: string) => {
  // read file
  const file = await fs.promises.readFile(filepath, "utf8")
  const data = JSON.parse(file)


  // NOTE: given the example below, remove the last three tables since they do not contain relevant data
  data.splice(-3, 3)

  // save file
  await fs.promises.writeFile(filepath_updated, JSON.stringify(data, null, 2))

  return data
}

const run = async () => {
  let cleanedTables = await removeUnnecessaryTables(filepath)

  // CLEAN EACH OBJECT

  // iterate over tables
  cleanedTables = cleanedTables.map((table: any) => {
    // iterate over objects in table
    table = table.map((obj: any) => {
      // iterate over keys in object
      Object.keys(obj).forEach((key: string) => {

        // 1. remove footnotes from each key
        obj[key] = removeFootnotes(obj[key])
      })
      return obj
    })
    return table
  })

  // save file
  await fs.promises.writeFile(filepath_updated, JSON.stringify(cleanedTables, null, 2))

  // TODO: geocode Location field
}



run()
