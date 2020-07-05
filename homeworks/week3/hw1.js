const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});
// 設定 readline 標準輸入
const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});
function solve(n) {
  const result = [];
  for (let i = 1; i <= n; i += 1) {
    result.push('*');
    console.log(result.join(''));
  }
}
rl.on('close', () => {
  solve(lines);
});
// 輸入結束，arr 裡面已經有輸入的資料，並執行 solve function
