## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
## rusult :  
> i: 0  
i: 1  
i: 2  
i: 3  
i: 4  
5  
5  
5  
5  
5
## process : 
``` js
/*scopeChain
arrow function (1~5) EC {
  AO : {
  }
  scopeChain : [arrow function EC.AO] + arrow function[[scope]]
  = [arrow function EC.AO] + [global EC.VO]
  = [arrow function EC.AO] + global EC scopeChain
}

global EC {
  VO : {
    var i : undfined -> 0 -> 1 -> 2 -> 3 -> 4 -> 5
    arroow function 1 : funciton
    arroow function 2 : funciton
    arroow function 3 : funciton
    arroow function 4 : funciton
    arroow function 5 : funciton
  }
  scopeChain : [global EC.VO]
}
arrow funciton [[scope]] = [global EC.VO] = global EC scopeChain
scopeChain*/

//scope: global
var i = 0 
console.log('i: ' + 0) //i: 0
setTimeout(() => { console.log(i) }, 0) //這邊 call stack 會執行 setTimeout 並把裡面的 function 丟到 webAPI 執行
var i = 1
console.log('i: ' + 1) //i: 1
setTimeout(() => { console.log(i) }, 0) //這邊 call stack 會執行 setTimeout 並把裡面的 function 丟到 webAPI 執行
var i = 2
console.log('i: ' + 2) //i: 2
setTimeout(() => { console.log(i) }, 0) //這邊 call stack 會執行 setTimeout 並把裡面的 function 丟到 webAPI 執行
var i = 3
console.log('i: ' + 3) //i: 3
setTimeout(() => { console.log(i) }, 0) //這邊 call stack 會執行 setTimeout 並把裡面的 function 丟到 webAPI 執行
var i = 4
console.log('i: ' + 3) //i: 4
setTimeout(() => { console.log(i) }, 0) //這邊 call stack 會執行 setTimeout 並把裡面的 function 丟到 webAPI 執行
var i = 5 return
//scope: arrow function，因為 arrow  function 裡面並沒有 i 變數所以會往上找到 global scope 裡面 i = 5
console.log(5) //i: 5 (0)
console.log(5) //i: 5 (1000)
console.log(5) //i: 5 (2000)
console.log(5) //i: 5 (3000)
console.log(5) //i: 5 (4000)
```
## process explanation
1. 上面的那一段程式碼，當執行到了 ``setTimeout()`` 的時候，``() => {console.log(i)}``會被丟到 webAPI 裡去執行，當 webAPI 倒數完畢的時候就會進入 task queue 中等待 event loop 排程。
2. 後面會連續輸出 5 個 5 的原因是，在 setTimeout 裡面的 callback function scope 並沒有宣告 i ，所以依據 scope chain 的機制，會往上到 global scope 找 i 變數(i = 5)，所以才會印出 5 。
## Main Concept
### global scope 全域變數  
> 在 function 外宣告的變數(global variable，或在 function 裡透過 automatically global 方式宣告的變數)，同個檔案裡的 scripts 和 function 都可以引用到。
### local scope (function scope) 區域變數  
> 在 function 裡宣告的變數(local variable)，儘可以在同一個 function 裡面被引用到，當 function 結束的時候，local variable 的 lifetime 也就結束了。


## reference
[JavaScript Scope - w3school](https://www.w3schools.com/js/js_scope.asp)

