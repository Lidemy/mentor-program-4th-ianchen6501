function join(arr, concatStr) {
    var str = ""
    for(var i = 1 ;i <arr.length ;i++){
        var str = str + (concatStr + arr[i])
    }
    return arr[0]+str
}

function repeat(str, times) {
    var result = ""
    for(i=0 ; i<times ; i++){
    var result = result + str    
    }
    return result
  }


console.log(join(['a'], '!'));
console.log(repeat('a', 5));
