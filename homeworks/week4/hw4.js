const request = require('request');

const options = {
  uri: 'https://api.twitch.tv/kraken/games/top?limit=10',
  headers: {
    'Client-ID': 'fk1hf1r42s4jpsch4dxyw50jbqzgqh', // twich client-id ， 不是一開始輸入的使用者id
    /* eslint-disable-next-line */
    'Accept': 'application/vnd.twitchtv.v5+json', // twich 要求的 header
  },
};

function callback(error, response, body) {
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    console.log(e);
  }
  for (let i = 0; i < json.top.length; i += 1) {
    console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
  }
}
request(options, callback);
