## 什麼是 DOM？
> DOM 的全名是 Document Object Model (文件物件模型)，是一種程式介面，提供一個樹狀結構的表示法，可以讓程式存取及改變文件的架構、內容甚至觸發事件。  
DOM 的主要架構是由節點(node)所組成，並且各個節點彼此之間是有階層關係，例如 html 的結構就是由 Ducument (html)、Element (head/body等)、Text、Attribute (href) 等節點所組成。
另外節點彼此之間也是 parent node、child node 或是 sibling node 的關係。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
> 套用 html 的樹狀結構，假若今天'點擊'了一個 element ，其實會依照事件傳遞機制，從 window(html) 一路傳遞向下傳遞到 target element，再向上回傳到 window ，這樣的傳遞機制就可以拆分為三個不同階段，分別是 1.捕獲階段 capture phase、2. 目標階段 target phase、3. 冒泡階段 bubbling phase，在向下傳遞時是'捕獲階段'，到達觸發事件的目標(target)時就會是 target phase 目標階段，向上傳遞回 window 的時候就是 bubbling phase 冒泡階段(如下圖)。
![](./eventflow.png)  
因此我們可以透過 eventListener 來觀察事件傳遞機制，另外在 eventListener 的第三個參數可以設定 boolyn 值來控制是要監控'捕獲(true)'還是'冒泡(false)'階段，當不輸入時 default 會是 false 的狀態。


## 什麼是 event delegation，為什麼我們需要它？
> event delegation (事件代理)是一種利用事件傳遞機制的應用方式，可以節省逐次在 child node 添加eventLister 的不便及方便後續的維護管理。  
event delegation 的原理是透過在 parent node 新增原本要在 child node 執行的功能，在運行或觸發 child node 就可以利用事件傳遞機制的一路執行從捕獲到冒泡的特性，由 parent node 代替執行功能。  
善用 event delegation 也可以利用在 window 添加 preventDefault 或 console.log(e) 的方式來防止瀏覽器預設動作，或監控每一個動作。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
> event.preventDefualt()是防止瀏覽器的預設事件，例如 anchor element 的 link 功能或 button element 的 submit 功能。  

> event.stoppropagation()是阻止當前事件繼續進行'捕捉'和'冒泡'等動作，要注意的是 event.stoppropagation() 只會阻止後續第一順位的動作，如果還有其他不同的動作必須要改用 event.stopImmediatePropagation()指令，才會阻止所有的動作。


參考資料:
[介紹 DOM 及事件流程](https://blog.hellojcc.tw/dom-element-event-flow/)