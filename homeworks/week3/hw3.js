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
function isPrime(n) {
  const result = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      result.push(i);
    }
  }
  if (result.length === 2) {
    console.log('Prime');
  } else {
    console.log('Composite');
  }
}
function solve(line) {
  const num = Number(line[0]);
  const inputArr = [];
  for (let i = 1; i <= num; i += 1) {
    inputArr.push(Number(line[i]));
  }
  for (let j = 0; j < num; j += 1) {
    isPrime(inputArr[j]);
  }
}
rl.on('close', () => {
  solve(lines);
});
// 輸入結束，arr 裡面已經有輸入的資料，並執行 solve function
