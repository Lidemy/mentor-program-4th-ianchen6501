function reverse(str) {
    var str_arr = str.split("")
    var rev = []
    for(var i = (str_arr.length-1) ; i>=0 ; i--){
        rev.push(str_arr[i])
  }
    var rev = rev.join('')
    console.log(rev)
}

reverse('hello');
reverse('1234  56');
reverse('  haha  ')