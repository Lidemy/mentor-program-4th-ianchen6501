## Redux middleware 是什麼？

Redux middleware 有點類似之前 express 用過的 middleware，都是在做主要處理前的預處理行為，在 Redux 中我們有時候需要在資料傳進 store 前先做某些處理(call API 拿取資訊或 setTimeout() 等)，所以需要 middleware 來協助，在 middleware 處理完成後才進入 store 給 reducer 處理並更新 state。

常見的 middleware 有:

- redux-thunk  
  redux-thunk 最主要就是用來處理非同步的問題，一般來說我們傳入 dispatch 的都是一個 plain object，但是運用 redux-thunk，因為 redux-thunk 會判斷傳入的是 function 或是 plain object 來做不同處理。  
  因此我們可以透過傳入一個 function，並且在 function 裡面執行非同步操作，當 function 裡面執行完非同步的程序後再 return 一個 dispatch() 讓 reducer 去處理。

```js
// redux-thunk basic example :
function incrementAsync(amount) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };
}
// 一秒後發出 dispatch(incrementByAmount)
```

- Redux Saga  
  主要用來處理複雜條件的非同步事件。  
  使用起來會比 redux-thunk 來的更困難，要理解 Saga 需要先去了解 general function、yield、call、put 等的功用。  
  使用方式上 saga 不同於 redux-thunk 可以直接寫在 reducer 裡。需要另外開一個獨立的檔案，並且在引入時需要先建立一個實體

  ```js
  const sagaMiddleware = createSagaMiddleware();
  ```

  接著用 applyMiddleware 的方式搭配 createStore 來使用

  ```js
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  ```

- Redux Observable  
  也是用來處理複雜條件的非同步事件，例如今天如果使用者點選觀看一個影片，在影片載入完成前又點選另外一個影片，那要如何處理判斷?Observable 就可以來做這樣的判斷，但使用前需要了解 epic 函數的使用，學習曲線高。

---

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

### Client Side Rendering(CSR)

CSR 的基本精神就是在我們最初執行網頁時，並沒有完整的 HTML 資料結構也缺乏需要的內容資料，必須透過 download 的 JavaScript 去指定的地方拿取資料並重新整合後才會得到使用者眼前的畫面。  
在 React CSR 的流程如下:

1. 瀏覽器請求 HTML
2. 瀏覽器請求 JavaScript
3. React mount / API / 監聽
4. 使用者產生畫面

舉例來說，我們透過 React app 建立的 app 一般都是 CSR，CSR 的時間軸是一開始畫面都是定位在 root ，然後再透過 React router 來確定要執行哪個路由並透過 JavaScript 去拿取對應的資料，拿到資料後，React 再初始化來產生畫面。

### Server Side Rendering(SSR)

SSR 的基本精神就是在第一次渲染時不用透過 JavaScript，伺服器會直接回傳 HTML 資料並由瀏覽器渲染後就是使用者看到的畫面。而在 React 裡面，要實作 SSR 則是透過下列流程:

1. 瀏覽器請求 HTML
2. 伺服器回傳 HTML
3. 瀏覽器請求 JavaScript
4. React 監聽事件

### 為什麼我們需要 SSR

SSR 的優點包含下列:

1. 在第一次渲染時就包含了完整的 HTML 內容，有助於 SEO。
2. 因為不用等 bundle.js 下載完成後再開始載入內容，載入及畫面呈現的速度較快，有助於使用者體驗。

---

## React 提供了哪些原生的方法讓你實作 SSR？

在 React 實作 SSR 需要一個渲染伺服器，渲染伺服器可以對伺服器發出請求，並且在第一次渲染時回傳完整的 HTML 內容。

1. renderToString()  
   ReactDomServer 提供的方法，可以使用在瀏覽器或伺服器端，renderToString 會轉換 React element 成初始的 HTML 內容並回傳，因此可以使用在 server 回傳完整的 HTML 內容。

```js
const HTML = ReactDOMServer.renderToString(<div>...</div>);
res.write(HTML);
```

2. renderToStaticMarkup()  
   類似 renderToString()， 會轉換 React element 為初始的 HTML 內容，差別在於 renderToStaticMarkup() 回傳的內容不會包含 React 的內部標籤，所以適合使用在靜態網站的 SSR。

3. renderToNodeString()  
   功能與 renderTostring() 相同，但僅能使用在伺服器端。

4. renderToStaticNodeString()  
   功能與 renderToStatcMarkup() 相同，但僅能在伺服器端使用。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

### prerender.io

- 簡介  
  提供 SSR 服務，可以幫助先下載好自身網站的渲染內容，並協助在搜尋引擎爬蟲時回傳內容。
- 原理  
  透過在 server 上安裝 prerender middleware，prerender middleware 會偵測該次訪問是否是 crawler，如果是 crawler 就會發 request 給 prerender 取得 HTML 靜態內容並回傳。
- 使用方式  
  使用上需要先註冊並取得 token 並嵌入 app 中，並且採用官方推薦的 server (Express / Rails / Nginx / Apache)。

### Next

- 簡介  
  Next 是一套建構在 React 上的 SSR 框架(Vue 也有類似的框架 Nuxt)。
  Next 提供了兩種不同的 prerender 方式，一個是 static generation(SSG)， static generation 會在 build 階段就預先渲染好 HTML，並在其後的每一個 request 使用同樣的 HTML，所以 SSG 比較適用於靜態網頁。
  另一種是 server-side Rendering，SSR 會在每一次 request 都重新預渲染 HTML。
- SSR async funtion  
  next 在 9.0 後是使用 getStaticProps()，所以如果沒有使用 getServerSideProps() 或 getInitialProps() 會自動生成靜態 HTML

  1. getStaticProps()  
     適合用在靜態網站，在 build 階段向 server 拿取 Props 並 pre-render HTML 後，就會用同一份 HTML 資料來 render 畫面。

  2. getStaticPath()  
     當遇到 dynamic routes 的情況時，getStaticProps() 要搭配 getStaticPath() 使用，裡面要 return 一個包含 path、fallback 等參數的 object，這樣 next 會把 path 包含 Props 都在 build 階段 pre-render。

  3. getServerSideProps()  
     會在每一次 request 的時候，才會去 server 拿資料並 pre-render HTML 內容。所以一開始並不會在 build 階段建構靜態 HTML 檔案。(這邊我先假定在 getStaticProps 會先於 getServerSideProps)。  
     運行時機都是在 server side 作用。

  4. getInitialProps()  
     與 getServerSideProps() 類似，但 getInitialProps 只有在 initial page load 時會在 server side 運作，之後如果瀏覽不同 route 就會在 client 端運作(這邊有點不確定意思，先筆記)。

### 小結

並不是說一個網站只能選一種 SSR 的方式或選擇 SSR、CSR 兩邊站，應該是要視網站的功能角色而定，例如說前台因為需要比較好的使用者體驗，所以適合採用 SSR，後台因為沒有 SEO 需求可以直接使用 React SPA 及 express 的結合。

## reference

[Next.js 简明教程](https://zhuanlan.zhihu.com/p/130247139)  
[初探 nextjs 服務端渲染框架](https://www.mdeditor.tw/pl/pE1f/zh-tw)  
[從零開始用 React 搭建自己的技術部落格，遇到的問題](https://www.mdeditor.tw/pl/pAn4/zh-tw)
