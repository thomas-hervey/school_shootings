const fs = require('fs')
var dateFormat = require('dateformat')
const compiled = require('./raw_data/compiled.json')
const compiled_updated = require('./raw_data/compiled_updated.json')

function updateDates(valuesToUpdate) {
  return valuesToUpdate.map(result => {
    const resultToUpdate = result
    if (result.Date.startsWith('00000000') && result.Date.length >= 23) {
      resultToUpdate.Date = result.Date.substring(23)
    }
    return JSON.stringify(resultToUpdate)
  })
}

function updateCasualties(valuesToUpdate) {
  return valuesToUpdate.map(result => {
    const resultToUpdate = result
    if (result.Deaths.startsWith('0,000,001') && result.Deaths.length >= 10) {
      resultToUpdate.Deaths = parseInt(result.Deaths.substring(9))
    }
    if (result.Injuries.startsWith('0,000,001') && result.Injuries.length >= 10) {
      resultToUpdate.Injuries = parseInt(result.Injuries.substring(9))
    }

    return resultToUpdate
  })
}

function changeDates(valuesToUpdate) {
  return valuesToUpdate.map(result => {
    if (result.Date) {
      const newDate = new Date(result.Date)
      dateFormat
      result.fullDate = dateFormat(newDate, "isoDate")
      result.yearMonthDate = result.fullDate.substring(0, 7)
    }
    return JSON.stringify(result)
  })
}

function writeResults(updatedResults) {
  try {
    fs.writeFile("/Users/Thomas/Projects/personal/school_shootings/data/raw_data/compiled_updated_4.json", updatedResults.join(','), (err) => {
      if (err) console.log(err)
      else { console.log('successfully saved')}
    })
  } catch (err) {
    console.log(err)
  }
}

const updatedResults = changeDates(updatedResults) // updateDates(compiled) // updateCasualties(compiled_updated)
writeResults(updatedResults)