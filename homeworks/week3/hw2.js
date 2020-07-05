var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin
})
//設定 readline 標準輸入
var lines = []
rl.on('line', function (line){
    lines.push(line)
});
//把輸入的資料放入一個 arr ，按 ctrl+c 可以結束程式並跳出
rl.on('close', function(){
    solve(lines)
})
//輸入結束，arr 裡面已經有輸入的資料，並執行 solve function

function solve (lines){
    var inputArr = lines[0].split(' ') 
    var start = Number(inputArr[0])
    var end = Number(inputArr[1])
    var daffodils = []
    for (var i=start; i<=end; i++){
        if(i === daffo(i)){
            console.log(i)
        }
    }
}



function daffo(i){
    var str = String(i)
    //console.log(str)
    var arr = str.split('')
    var sum = 0
    //console.log(typeof(sum))
    for(i=0; i<arr.length; i++){
        sum += power(Number(arr[i]),arr.length)
    }
    return sum
}

function power(base,n){
    var result = base
    for(i=1; i<n; i++){
            result =result * base
    }
    return result
}