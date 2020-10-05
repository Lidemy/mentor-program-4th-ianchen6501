## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1 
function fn(){
  console.log(a) 
  var a = 5
  console.log(a) 
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a) 
    a = 20
    b = 100
  }
}
fn()
console.log(a) 
a = 10
console.log(a) 
console.log(b) 
```
## result : 
> undefined  
5  
6  
20  
1  
10  
100
## process : 
```js
/*scope chain 的運作流程:
fn2 EC {
  AO: {
  }
  scopeChain: fn2 EC.AO + fn2.[[scope]]
  = [fn2 EC.AO] + fn.scopeChain
  = [fn2 EC.AO] + [fn EC.AO] + [global EC.VO]
  = [fn2 EC.AO] + [fn EC.AO] + global EC.scopeChain
}

fn EC {
  AO: {
    a : undefined -> 5 -> 6 -> 20
    fn2 : function
  }
  scopeChain: fn EC.AO + fn.[[scope]]
  = [fn EC.AO] + [global EC.VO]
  = [fn EC.AO] + global EC.scopeChain
}
fn2.[[scope]] = fn.scopeChain 
= [fn EC.AO] + fn.[[scope]]
= [fn EC.AO] + [global EC.VO]
= [fn EC.AO] + global EC.scopeChain

global EC {
  VO: {
    a: undefined -> 1 -> 10
    b: 100
    fn: function
  }
  scopeChain: [global EC.VO]
}
fn.[[scope]]: [global EC.VO] = global EC.scopeChain
*/

//執行流程
1. 一開始會先進行 global EC，建立 global EC.VO 並在 global scope 裡面提升 a 及 fn，賦值 a 為 1
2. 進行 fn EC，並建立 fn EC.AO
3. 執行 fn function 並進入 fn function scope，執行``console.log(a) -> undefined``
4. 對 a 賦值為 5
5. 執行``console.log(a) -> 5``
6. ``a++``，賦值 a 為 6
7. ``var a``，a 已經被提升並賦值了，此行不會發生任何改變
8. 進行 fn2 EC，並建立 fn2 EC.AO
9. 執行 fn2 function 並進入 fn2 function scope
10. 執行``console.log(a) -> 6``
11. 循著 fn2 的 scope chain 對 a 賦值為 20，位置在 [fn EC.AO]
12. 循著 fn2 的 scope chain 對 b 賦值為 100，位置在 [global EC.VO]
13. fn2 function 執行完畢，回到 fn scope
14. 執行``console.log(a) -> 20``
15. fn function 執行完畢，回到 global scope，fn 及 fn2 scope 及 variable 都會消失
16. 執行 ``console.log(a) -> 1``
17. 對 a 賦值為 10
18. 執行 ``console.log(a) -> 10``
19. 執行 ``console.log(b) -> 100``

```

## Main Concept :
### scope chain 範圍鍊
> 一個物件，裡面有這個 function 執行範圍的序列資訊，方便在找尋變數時，可以循著 scope chain 一層一層往上找。scope chain 由 ``function AO + [[scope]]``組成，當進入每一個 function execution context (EC) 的時候，都會產生一個新的 scope chain 物件。

### hoisting 提升
> ㄧ般提到 hoisting 應該指是變數的宣告會被提升到最上面(賦值不會)，原理是在程式碼執行前會先執行 EC 並建立對應的 VO/AO 及 scope chain，所以如果我們在變數宣告前就 call 變數，其實會回應 undefined (此時已經被宣告但尚未賦值)。
```js
console.log(a) //undefined
var a = 10
```

### hoisting 提升的順序
> 參數 argument -> 函式 function -> 變數 variable

## reference
[我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)  
[js中，函数的闭包、作用域跟[[Scopes]]的关系](https://juejin.im/post/6844903732669317128)