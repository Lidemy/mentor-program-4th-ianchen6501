const request = require('request');
const process = require('process');

if (process.argv[2] === 'list') { // list，列出前二十本書
  request.get('https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      for (let i = 0; i < json.length; i += 1) {
        console.log(`${json[i].id} ${json[i].name}`);
      }
    });
} else if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      const result = json.name;
      console.log(result);
    });
} else if (process.argv[2] === 'delete') {
  request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`);
} else if (process.argv[2] === 'update') {
  request.patch({
    url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    form: {
      id: process.argv[3],
      name: process.argv[4],
    },
  });
} else if (process.argv[2] === 'create') {
  request('https://lidemy-book-store.herokuapp.com/books',
    (error, response, body) => { // 取得id的數目
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      const { length } = json;
      request.post({
        url: 'https://lidemy-book-store.herokuapp.com/books',
        form: {
          id: length + 1,
          name: process.argv[3],
        },
      });
    });
} else {
  console.log('Wrong Input');
}
