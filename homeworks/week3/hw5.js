/* global BigInt */
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
function more(arr) {
  if (BigInt(arr[0]) === BigInt(arr[1])) {
    console.log('DRAW');
  } else if (BigInt(arr[0]) > BigInt(arr[1])) {
    console.log('A');
  } else {
    console.log('B');
  }
}
function less(arr) {
  if (BigInt(arr[0]) === BigInt(arr[1])) {
    console.log('DRAW');
  } else if (BigInt(arr[0]) > BigInt(arr[1])) {
    console.log('B');
  } else {
    console.log('A');
  }
}
function solve(n) {
  const num = Number(n[0]);
  for (let i = 1; i <= num; i += 1) {
    const arr = n[i].split(' ');
    if (Number(arr[2]) === 1) {
      more(arr);
    } else {
      less(arr);
    }
  }
}
rl.on('close', () => {
  solve(lines);
});
// 輸入結束，arr 裡面已經有輸入的資料，並執行 solve function
