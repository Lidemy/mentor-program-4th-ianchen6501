const request = require('request');
const process = require('process');

request(`https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    const json = JSON.parse(body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(json[0].name);
      console.log(json[0].capital);
      console.log(json[0].currencies[0].code);
      console.log(json[0].callingCodes[0]);
    } else {
      console.log('找不到國家資訊');
    }
  });
