## 為什麼我們需要 React？可以不用嗎？

為了解決現在網頁對互動性與即時性的需求，雖然 JavaScript 也可以透過 addEventListener 來即時的監測使用者行為並操縱 DOM 來做出畫面的更動，但如果網頁的規模擴大且每一個 Element 都要監控的話，會造成 JavaScript 程式碼過於繁雜，且直接操作 DOM 也會耗費大量資源，造成效率降低。  
React 的優勢在於，他可以透過在實際操作 DOM 更改之前，先透過建立 vertual DOM 並比較 state 或 props 有無更動來決定是否變更 DOM element，另外也透過 diff 算法來批次的處理更新的 DOM 元素，因此總結這個問題是，我們可以不用 React 也可以達成互動網頁或 SPA 網頁的要求，但 React 幫助我們用更精省的程式碼來達成，同時也可以優化瀏覽器的渲染流程，不用每次都重新渲染。  
reference:  
[reactjs 的背景和原理](https://www.jianshu.com/p/f349521621c1)  
[Virtual DOM | 為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/手寫筆記/build-a-simple-virtual-dom-5cf12ccf379f)  
[[译] Virtual Dom 和 Diff 算法在 React 中是如何工作的？](https://juejin.im/post/6844903772943024141)

## React 的思考模式跟以前的思考模式有什麼不一樣？

以前的思考模式是把元件和動作拆開來思考，透過 CSS、html 來建立靜態的元件，再透過 JavaScript 及 PHP 來達成資料處理、動態生成畫面等效果。  
在 React 其實也是在處理靜態及動態的資料。然而處理的方式變得很不同，在 React 中因為 component、state、Effect 等地出現，在使用 React 的時候就變成主要在思考

- 怎麼把靜態的頁面拆解成不同的 conponent 組合
- 需要處理那些資料，這些資料是 prop 還是 state。
- state 建立的位置
- 要透過哪些行為來改動 state ，如何把資料往上傳

reference:  
[用 React 思考](https://zh-hant.reactjs.org/docs/thinking-in-react.html)

## state 跟 props 的差別在哪裡？

### 相同處:

state 和 props 都是 JavaScript object ，當他們有改變的時候都會觸發 re-render，而他們被建立的目的通常都是為了定義 component

### 相異處:

性質: props 有點像是 default value 是從 parent conponent 傳遞下來的，為了定義該 component 的性質或狀態。 state 則是 component 本身的才開始有的性質，parent component 並不具備，並可向下傳遞給 child component。
來源: props 是從 parent component 傳遞下來的，state 是 component 在內部自行建立的。  
可否在 component 裡面變更: props 因為是繼承來的，不可以變更，state 可以透過 setState 來變更。

reference:  
[Component State](https://zh-hant.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)  
[props vs state](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
