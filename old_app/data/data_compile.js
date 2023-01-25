const fs = require('fs')

const _1970s = require('./raw_data/1970s')
const _1980s = require('./raw_data/1980s')
const _1990s = require('./raw_data/1990s')
const _2000s = require('./raw_data/2000s')
const _2010s = require('./raw_data/2010s')

function stringifyArrayOfObjs(array) {
  return array.map(value => {
    return JSON.stringify(value)
  })
}

const compiled =
  stringifyArrayOfObjs(_1970s)
  .concat(stringifyArrayOfObjs(_1980s))
  .concat(stringifyArrayOfObjs(_1990s))
  .concat(stringifyArrayOfObjs(_2000s))
  .concat(stringifyArrayOfObjs(_2010s))

console.log(compiled[0])
console.log(compiled[compiled.length -1])

try {
  fs.writeFile("/Users/Thomas/Projects/personal/school_shootings/data/raw_data/compiled.json", compiled.join(','), (err) => {
    if (err) console.log(err)
    else { console.log('successfully saved')}
  })
} catch (err) {
  console.log(err)
}