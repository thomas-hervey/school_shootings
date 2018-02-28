const fs = require('fs')
const compiled = require('./raw_data/compiled.json')

function updateDates(valuesToUpdate) {
  const updatedResults = valuesToUpdate.map(result => {
    const resultToUpdate = result
    if (result.Date.startsWith('00000000') && result.Date.length >= 23) {
      resultToUpdate.Date = result.Date.substring(23)
    }
    return JSON.stringify(resultToUpdate)
  })

  try {
    fs.writeFile("/Users/Thomas/Projects/personal/school_shootings/data/raw_data/compiled_updated.json", updatedResults.join(','), (err) => {
      if (err) console.log(err)
      else { console.log('successfully saved')}
    })
  } catch (err) {
    console.log(err)
  }
}

updateDates(compiled)

