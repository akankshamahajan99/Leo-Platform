
const opencage = require('opencage-api-client');

opencage.geocode({q: '37.4396, -122.1864', language: 'fr'}).then(data => {
  // console.log(JSON.stringify(data));
  if (data.status.code == 200 && data.results.length > 0) {
      // 1330 Middle Avenue, Menlo Park, Californie 94025, États-Unis d'Amérique
      console.log(data.results[0].formatted);
    }

}).catch(error => {
  console.log('error', error.message);
});