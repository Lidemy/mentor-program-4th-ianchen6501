## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1)
setTimeout(() => { 
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
## result:
> 1  
3  
5  
2  
4

## progress:  
1. 在 stack 中執行 ``console.log(1)``，並 print 出 1。
2. 執行 ``setTimeout(() => { console.log(2)}, 0)`` 並將裡面的 arrow function 轉由 webAPI 處理，因為倒數時間為 0 ms，所以會馬上被排進 task queue 中(第一順位)。
3. 在 stack 中執行``console.log(3)``，並 print 出 3。
4. 執行 ``setTimeout(() => { console.log(4)}, 0)``並將裡面的 arrow function 轉由 webAPI 處理，因為倒數時間為 0 ms，所以會馬上被排進 task queue 中(第二順位)。
5. 在 stack 中執行 ``console.log(5)``，並 print 出 5。
6. EventLoop 偵測到 stack 已經沒有其他任務，所以會把 task queue 中的任務排進 stack 中，因此第一順位的 ``() => {console.log(2)}`` 在 stack 中執行，執行 arrow function 後發現裡面有``console.log(2)`` 所以 print 出 2。
7. EventLoop 繼續把 tack queue 中的任務排進 stack，因此第二順位的 ``() => {console.log(4)}``在 stack 中執行，並 print 出 4。

## Main Concept

### 1. web runtime structure  
<img src="https://i.imgur.com/i7DVvFZ.png" height=70% width=70%/>

### 2. heap  堆疊  
> 泛指記憶體中的一塊區域，runtime 會在這塊區域裡面分配位置放置待執行的任務。  

### 3. stack 堆積  
> runtime 執行程式碼的地方，程式碼片段會形成一個 frame (堆疊)，就像一個一個的任務一樣依序排進 stack 中執行。

### 4. webAPI
> 瀏覽器提供的 API ，包含 DOM(監聽、操作 DOM 物件等)、setTimeout、Ajax 等。

### 5. task queue (callback queue) 佇列  
> webAPI 負責的任務在進入 stack 執行前，會依序排列在 task queue 中等 stack frame 清空後，由 event loop 排程進入 stack 執行。

### 6. event loop 事件循環
> 一個監聽 stack 的機制，會在 stack 沒有任務時，依序把 tack queue 中的任務排進 stack 中。event loop 的形式可能會長得像下面的程式碼:
```
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

## reference
[Javascript [筆記] 理解 Event Loop,Call Stack, Event & Job Queue in Javascript](https://milletbard.com/2019/11/25/JavaScript-event-loop/)  
[並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)