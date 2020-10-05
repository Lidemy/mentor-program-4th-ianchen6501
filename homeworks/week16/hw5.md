## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
## variable 變數與資料型態  
> 這邊學到了原來用 typeof 來檢測型別回傳的資料其實是不精準的，例如 ``console.log(typeof [])``會回傳 object，及 JavaScript 自己的 bug ``console.log(typeof null) -> object``。  
所以如果要正確判斷型別，應該要用物件原型的方式來判斷，例如 ``console.log(Object.prototype.toString.call(null)) -> [object Null]``或 ``console.log(obj.__proto__.toString())``，但其實一開始看不太懂為何會這樣寫，後來才知道原來ㄧ般 object 都有固定的 toString 方法，所以如果要正確判斷型別，應該要找原型來判斷才對，所以順著 prototype chain， obj -> obj.__proto__ -> object.prototype，才會出現上面那種寫法，並用 ``.call()``把要判斷的物件當作 this 丟進去。
  
> 另外也學到原來 primitive type 是 immutable 的，原本的變數就算經過運算，還是不會改變原本的值，必須要賦值產生一個新變數才行。而 object 經過運算後，原本的值就會產生改變，不用重新賦值。

## event loop 
> 透過學習 event loop 對於整個瀏覽器 runtime 的運作架構，有更完整的了解。也學習到諸如 setTimeout function 所設定的時間並不是絕對的執行時間，而是最短可以執行的時間等。  
了解 runtime 的運作模式，我覺得最重要是可以幫助我們理解怎麼防止 blocking，
可能是盡量減少需要耗時或耗費大量資源的同步事件，或將某些次要任務透過 setTimeout 改為非同步事件(Async)。
## hoisting
> 透過了解 hoisting 的現象，幫助我繼續深入了解 scope 及 EC 的作用與流程，並且在進入 closure 前可以先有個暖身。我覺得這部分比較需要注意的是除了變數會提升外，其實參數及函式也會提升，所以要記住他們提升的順序與規則(1.參數、2.函式、3.變數)。 
## closure / scope chain
> 雖然可以理解 closure 的原理，但實作的方式對我而言實在不是特別直觀，所以我覺得我需要有點透過記憶的方式來幫助理解 closure。對我而言 closure 的作法是在原本的函式外面加一層 function 並回傳要執行的 function 內容，而這樣的好處是可以避免 function 裡面的變數被不小心或刻意的更改。配合這樣的特性，closure 可以應用在儲存複雜計算的結果及配合安全性問題封裝變數等。
### 物件導向(OOP) / prototype chain
> 這邊要記得雖然物件導向的寫法是在 ES6 之後才出現，但不代表 ES5 以前沒辦法實作出同樣的效果。透過了解原型鍊的原理，我們就可以知道其實 javaScript 裡面的物件導向寫法，其實是可以藉由原型鍊 + .call() 實作出來，了解原理後就不會拘泥於單一寫法。
另外關於原型鍊的部分則要記得，除了可以應用在上面提到的判斷型別外，也可以用在增加各個型別的個別方法(operation)，透過 ``string.prototype.operation = function() {}`` 的方式。
## call by value / call by reference
> 我覺得這篇文章，huli 試圖要傳達技術名詞其實也是不精確的，光是 call by reference，在 c++、javaScript 兩個語言可能也會有不同的涵義。但對於學習中的我們要學習的應該是去查證的精神，比對相關的技術文章及從 java 聖經 ECMAScript 中找尋證據。  

> 另外這篇文章也引用了不同語言中，call by reference 的行為(覺得還在大致看得懂，但需要更多驗證的狀態)，因此我覺得目前先求了解 call by value 及 call by reference 在 javaScript 的定義。
> 1. primitive type 都是 call by value。
> 2. call by value 的意思是指建立一個新的記憶體位置，並且把引用的變數的值複製後儲存進去。所以無論在函式裡面對新的變數做任何運算，都不會改變原本的變數
> 3. object 是 call by sharing(call by reference)
> 4. 如果在函式裡面建立了一個 object 變數，依舊不會改變到原本的 object
> 5. call by sharing 的原因是 function 裡面的 object 與原本的 object 共享了同一個 object，所以透過修改函式裡面的引數可以改到外面變數的值。



參考資料:  
[为什么用Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/cangqinglang/p/9143308.html)
[由Object.prototype.toString.call( )引发关于toString( )方法的思考](https://juejin.im/post/6844903604990509063)  
[前端中階：JS令人搞不懂的地方-變數](https://medium.com/@hugh_Program_learning_diary_Js/前端中階-js令人搞不懂的地方-變數-a864ede72f1d)
[[第十七週] JavaScript 進階：什麼是閉包 Closure 與實際應用](https://yakimhsu.com/project/project_w17_advancedJS_03_Clousure.html)