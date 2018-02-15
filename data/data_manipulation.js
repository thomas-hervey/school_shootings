const fs = require('fs')
var NodeGeocoder = require('node-geocoder');
const wiki_shootings = require('./raw_data/wiki_shootings.json')
const googleGeocoderAPIKey = require('../config')

// console.log(wiki_shootings[15])

const _1990s = wiki_shootings[15]
const _2000s = wiki_shootings[16]
const _2010s = wiki_shootings[17]


let exampleToGeocode = _1990s[0]['Location']
exampleToGeocode = exampleToGeocode.split('!')[0]
console.log(exampleToGeocode)


var options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: googleGeocoderAPIKey,
  formatter: null
};

var geocoder = NodeGeocoder(options);

// // Using callback
// geocoder.geocode('29 champs elysée paris', function(err, res) {
//   console.log(res);
// });

// // Or using Promise
// geocoder.geocode('29 champs elysée paris')
//   .then(function(res) {
//     console.log(res);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// // output :
// [{
//   latitude: 48.8698679,
//   longitude: 2.3072976,
//   country: 'France',
//   countryCode: 'FR',
//   city: 'Paris',
//   zipcode: '75008',
//   streetName: 'Champs-Élysées',
//   streetNumber: '29',
//   administrativeLevels: {
//     level1long: 'Île-de-France',
//     level1short: 'IDF',
//     level2long: 'Paris',
//     level2short: '75'
//   },
//   provider: 'google'
// }]