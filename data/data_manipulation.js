const fs = require('fs')
var NodeGeocoder = require('node-geocoder');
const wiki_shootings = require('./raw_data/wiki_shootings.json')
const googleGeocoderAPIKey = require('../config')

// console.log(wiki_shootings[15])

const _1990s = wiki_shootings[15]
const _2000s = wiki_shootings[16]
const _2010s = wiki_shootings[17]


const exampleArray = _1990s.slice(0,2)
var options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: googleGeocoderAPIKey,
  formatter: null
}

var geocoder = NodeGeocoder(options);


const locations = _1990s.map(shooting_instance => {
  const location = shooting_instance['Location']
  return exampleLocation = location.split('!')[0].trim()
})
const example = ['Brooklyn, New York', 'test']

const newValues = geocoder.batchGeocode(locations, (error, results) => {
  if(error) {
    console.log(error)
  }
  else {
    return results.map((result, index) => {
      const lat = result['value'][0]['latitude']
      const lon = result['value'][0]['longitude']
      const coords = {
        lat: lat,
        lon: lon
      }
      return _1990s[index].coords = coords
    })
  }

})
// TODO: resolve promise and update values of array locations

console.log(newValues[0])


// const updated_1990s = exampleArray.map(shooting_event => {

//   // get the location attribute
//   let exampleLocation = shooting_event['Location']
//   exampleLocation = exampleLocation.split('!')[0]

//   // Or using Promise
//   const geocoded = geocoder.geocode(exampleLocation)
//     .then(function(res) {
//       console.log(res)
//       const coords = {
//         lat: res[0]['latitude'] || 0,
//         lon: res[0]['longitude'] || 0
//       }
//       return res
//     })
//     .then(result => {
//       shooting_event.coords = coords
//       return shooting_event
//     })
//     .catch(function(err) {
//       console.log(err)
//     })
// })

// console.log(updated_1990s)