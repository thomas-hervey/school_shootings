const fs = require('fs')
var NodeGeocoder = require('node-geocoder');
const wiki_shootings = require('./raw_data/wiki_shootings.json')
const googleGeocoderAPIKey = require('../config')

// console.log(wiki_shootings[15])

const _1990s = wiki_shootings[15]
const _2000s = wiki_shootings[16]
const _2010s = wiki_shootings[17]

var options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: googleGeocoderAPIKey,
  formatter: null
}

var geocoder = NodeGeocoder(options);

let rangeToUpdate = _1990s

const locations = rangeToUpdate.map(shooting_instance => {
  const location = shooting_instance['Location']
  return exampleLocation = location.split('!')[0].trim()
})


geocoder.batchGeocode(locations, (error, results) => {
  if(error) {
    console.log(error)
  }
  else {
    const updatedResults = results.map((result, index) => {
      const lat = result['value'][0]['latitude']
      const lon = result['value'][0]['longitude']
      const coords = {
        lat: lat,
        lon: lon
      }
      rangeToUpdate[index].coords = coords
      return JSON.stringify(rangeToUpdate[index])
    })

    // once values are updated, write them to a new file
    fs.writeFile("./data/raw_data/wiki_shootings_with_coords.json", updatedResults.join(','), (err) => {
      if (err) console.log(err)
      else { console.log('successfully saved')}
    })

  }
})