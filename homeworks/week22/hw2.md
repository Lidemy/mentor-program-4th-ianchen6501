## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState

- 作用  
  可以在 functional component 中設定並儲存 state(狀態)，透過 `const [state, useState] = useState(初始值)` 的方式，可以設定 state 及更新 state 的函式(setState)。
- 行為  
  在畫面一開始渲染的時候，state 會是初始值，之後如果有更新 state 就會以更新的值為主。
- setState 注意事項  
  如果 state 的值是 immutable 的話(如 object)，要定義新的 state 透過 `const a = b; b.name = newValue` 的方式會出錯，因為在複製 a 的時候，僅僅是複製一個記憶體位址(指向 a)，所以會改到 a 的值。這時候應該要改用 `const b = Object.assign({}, a)` 的方式，重新建立一個新的 Object。  
  state 要盡量設定在頂層 component，以確保正確的 re-render 行為。

---

### useEffect

- 作用  
  useEffect 裡面可以透過函式來設定某些渲染完後要執行的 side effect。
- 發生時機  
  useEffect 會在畫面渲染完成之後執行，所以要避免在裡面執行影響到畫面渲染(DOM)的行為。也可透過設定第二個參數 (source prop)，這樣在 source prop 改變的時候才會重新執行 useEffect。
- clean-up function  
  針對監聽、訂閱、儲存 cookie 等行為，如果想在下一次 render 前清除，可以透過在 useEffect function 裡面 return 一個 clean-up function，那在下一次 useEffect 執行前，就會先透過 clean-up function 把先前的 side effect 清除掉。

---

### useContext

- 作用  
  用來解決巢狀 components props 傳遞需要一直重複傳 props 的問題。
- 用法
  1. import 相關組件  
     `import {createContext, useContext} from 'react'`
  2. 建立 context  
     `const context = createContext(initialValue)`
  3. 在要傳入 context 的 component 外面包上 provider
     `<Context.Provider value={初始值}>`
  4. 在要使用 context 的 child component 引入 context  
     `const context = useContext(context)`

---

### useReducer

- 作用  
  類似於 useState，但可以做出更複雜的行為，針對不同狀況來更新 state。
- 用法  
  `const [state, dispatch] = useReducer(reducer, initialArg, init)`
  reducer 用來傳入更新 state 的函式，可以根據 dispatch type 的不同回傳不同的 state。  
  initialArg 傳入 initialState，如果要使用惰性初始化(針對特定條件重新初始化)，則可以使用第三個 argument init。
  ***

### useCallback

- 作用  
  用來做 child component 渲染的優化，可以透過緩存 function ，避免在每一次 parent component re-render 時都重新渲染。
- 用法  
  `const MemorizedCallback = useCallback(function, dependency)`
  如此一來，當只有 dependency 改變時，才會啟動 function。
  ㄧ般來說 useCallback 都會搭配 React.memo 使用，必須在引入 callback function 的 component 前面加上 `React.memo()`

---

### useMemo

- 作用  
  與 useCallback 很像，但 useMemo 是緩存第一個 callback 執行後回傳的值來達到渲染優化，useMemo 通常用來緩存某些需要大量資源計算的結果。
- 作用時機
  useMemo 會在渲染期間就執行，所以某些要在渲染後執行的行為應該放在 useEffect。
- 用法
  `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`  
   當 dependency 輸入空陣列的時候僅會在第一次渲染時執行。

---

### useRef

- 作用  
  與 useState 很像，差別是當 ref 改變時不會重新 render。當每次重新整理的時候，ref 都會回到初始值。
- 用法  
  `const ref = useRef(初始值)`  
  useRef 也可以搭配 component 一起使用來控制 uncontrolled component ，作法是 `<div ref={myref} />` 這樣就可以達到類似 controled component myref 跟 component 連動的效果。

---

### useImperativeHandle

- 作用  
  當在 parent component 設定 ref 並傳入 child component 的時候，同時也想把 child component 的 ref 值暴露給 parent component 時，就必須用到 useImperative Handle。

---

### useLayoutEffect

- 作用  
  與 useEffect 類似，都是用來執行某些 side-effect，但是執行時間是在 DOM 渲染後與 useEffect 執行前。

---

### useDebugValue

- 作用  
  搭配自定義 hook 使用，可以用來設定顯示於 React 開發者工具裡顯示自定義的標籤。

---

### reference

[useCallback、useMemo 分析 & 差别](https://github.com/monsterooo/blog/issues/37)  
[認識 React Hooks 之三](https://ithelp.ithome.com.tw/articles/10253073)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

### component lifecycle 主要分為三階段

- Mounting  
  當 component 被加載到 DOM 時觸發。
- Updating  
  當 component 裡面的 prop 或 state 有變更時觸發。
- Unmounting  
  當 component 要從 DOM 中被移除時觸發。

### lifecycle

- Mounting

  1. constructor( getDefaultProps / getInitialState )  
     初始化，這時候要針對 state、props 做初始化。
  2. getDerivedStateFromProps  
     在第一個 DOM 被渲染前執行
  3. render  
     render DOM
  4. ComponentDidMount  
     第一次 render 完之後執行

- Updating

  1. getDerivedStateFromProps  
     同上
  2. shouldComponentUpdate  
     在 prop 與 state 更新後、update render 前執行。預設值是 true ，就是當有改變時就 update。可以手動調整為 false，但盡量使用 pure component 方法來優化渲染比較好。
  3. render  
     render DOM
  4. getSnapshotBeforeUpdate  
     在 update DOM 渲染完成後，並改變 DOM 之前執行。通常用來在 DOM 改變之前抓取某些資料。
  5. componentDidUpdate  
     update render 完後執行。有需要的話這時可以發出網路請求或 setState

- Unmounting

  1. componentWillUnmount  
     component 要被清除時執行，這時可以拿來做清除監聽、cookie、localstorage 等行為。

- 備註: lifecycle method 命名原則
  1. will: 在該事件發生前執行
  2. did: 在該事件發生後執行

![](https://iamian.cc/static/56e1ae1a077d66ecc3899de3eec3e5d6/acfc1/react-life.png)

### reference

[React 元件生命週期 (Component Lifecycle)](https://www.fooish.com/reactjs/component-lifecycle.html)

## 請問 class component 與 function component 的差別是什麼？

- lifecycle method vs hook  
  class component:  
  使用 componentDidMount、componentWillUnmount 等 lifecycle method
  function component:  
  使用 useEffect、useLayoutEffect 等 hook

- props  
  class component:  
  要使用 props ，要在 constructor 初始化 props，並且 `super(props)`
  function component:  
  可以直接使用傳入的 props。

- state  
  class component:  
  設置 state 要使用 `this.state = {state}`  
  function component:  
  設置 state 要使用 useState hook

- bind(this)  
  class component:  
  function 如果要針對 component 本身執行操作的話，要透過 `constructor { function = function.bind(this) }` 來綁定 component。

### reference

[React Class-based vs Functional Component
從特性淺談兩種寫法之異同](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

- 差異  
  uncontrolled 和 controlled component 是針對表單元件內部資料的控制行為所做出的分類。  
  一般要取得 form 的資料，要先透過 querySelector 選到元件後，透過 value method 拿到裡面的資料。這樣的表單元件在 react 裡面就是 uncontrolled component。  
  但在 react 裡面可以把資料交給 state 去控制，達到 state 與資料同步的狀態，這樣的表單元件就是 controlled component。  
  方法如下:

1. `const [state, setState] = useState(null)`
2. 建立 handleOnChange function ，裡面執行 `setState(formValue)`
3. 建立 form component `<input onChange={handleOnChange} value={state}>`

- 使用時機  
  ㄧ般 react 是推薦使用 controlled component，但針對 input type = file 的狀況，只能使用 uncontroled component。
