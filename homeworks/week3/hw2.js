const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});
// 設定 readline 標準輸入
const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});
function power(base, n) {
  return base ** n;
}
function daffo(i) {
  const str = String(i);
  const arr = str.split('');
  let sum = 0;
  for (let j = 0; j < arr.length; j += 1) {
    sum += power(Number(arr[j]), arr.length);
  }
  return sum;
}
function solve(n) {
  const inputArr = n[0].split(' ');
  const start = Number(inputArr[0]);
  const end = Number(inputArr[1]);
  for (let i = start; i <= end; i += 1) {
    if (i === daffo(i)) {
      console.log(i);
    }
  }
}
rl.on('close', () => {
  solve(lines);
});
// 輸入結束，arr 裡面已經有輸入的資料，並執行 solve function
