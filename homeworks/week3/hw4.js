const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});
// 設定 readline 標準輸入
const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});
// 把輸入的資料放入一個 arr ，按 ctrl+c 可以結束程式並跳出
function solve(n) {
  const str = n[0];
  const arr1 = str.split('');
  const arr2 = [];
  for (let i = 0; i < arr1.length; i += 1) {
    arr2.push(arr1[arr1.length - 1 - i]);
  }
  if (arr1.join('') === arr2.join('')) {
    console.log('True');
  } else {
    console.log('False');
  }
}
rl.on('close', () => {
  solve(lines);
});
// 輸入結束，arr 裡面已經有輸入的資料，並執行 solve function
