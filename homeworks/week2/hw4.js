function printFactor(n) {
    var factor = []
    for(var i = 1; i<=n ;i++ ){
        if(n%i === 0)
            factor.push(i)
    }
    for(var i = 0; i<factor.length ;i++){
        console.log(factor[i])
    }
}

printFactor(60);
