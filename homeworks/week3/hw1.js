var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

rl.on('line', function (line) {
  lines.push(line)
});

rl.on('close', function() {
  solve(lines)
})
  
function solve(lines){
  	var n = Number(lines[0])
    var str = ''
    for(i=0 ; i < n ; i++){
        var str = str + '*'
        console.log(str)
    }
}