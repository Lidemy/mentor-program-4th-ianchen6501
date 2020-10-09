## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
## result
> 2  
2  
undefined
## process
```js
//首先會發現這是一個物件裡面包含 call this function 的形式，所以函式的回傳值要看執行函式的方式而定
//這邊會發現執行函式的方式是類似物件導向的寫法，所以可以把函式的執行方式改為後面加上 .call() 的方式，this 的值就會是 call this 的 function (hello)前面的那一個東西
obj.inner.hello()
=> obj.inner.hello.call() //this.value = obj.inner.value = 2
obj2.hello()
=> obj2.hello.call() //this.value = obj2.value = obj.inner.value = 2
=> obj.inner.hello.call()
hello()
=> hello.call() //this.value = undefined
```
## this 的三種狀況
1. 物件導向(OOP): this -> instance / object
2. function : this -> global(瀏覽器: window)，在嚴格模式中則是 undefined
3. 在物件中的 call this function ，則要看執行 function 的方式而定，如果是用物件導向的寫法，會回傳 call this function 前面的那一個物件，但如果是用一般 function 執行的寫法則會回傳預設值 global(如下例)，所以我們可以用在函式後面加上 ``.call()`` 的方式來看 call this function 前面有沒有東西，來判斷 this 的值。
```js
//物件導向寫法
var a = {
  test: function() {
    console.log(this)
  }
}
a.test() //{ test: [Function: test] }，object a
=== a.test.call(a)

//ㄧ般 function 寫法
var b = a.test
b() //global，嚴格模式為 undefined
=== b.call()
```
