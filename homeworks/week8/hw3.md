## 什麼是 Ajax？
1. 定義
Ajax 是 Asyncronous JavaScript and XML 的縮寫，可以在不重新整理網頁的情況下透過瀏覽器與伺服器溝通並獲取資料的一種方式
2. 檔案格式
伺服器針對 Ajax 要求回應的檔案格式包含，JSON、XML、HTML
3. XTR 物件
XTR 物件讓瀏覽器可以非同步的向伺服器請求並解析回傳的資料，意思就是我們自己也可以在瀏覽器上讀取 JSON 資料。  
使用 XTR 物件，必須先設置變數(設置一個新的 XTR 物件)，來儲存回傳的資料和屬性。  
``var xhr = new XMLHttpRequest();``
4. 常用指令  
``xhr.readyState``   
會回傳一個數值代表目前讀取資料的狀態。
0(unsent) - 已經產生一個 XMLHttpRequest 檔案，但 open() 還未呼叫。
1(opened) - open() 已被呼叫
2(headers-received) - send() 已被呼叫，並且可取得 header 與狀態
3(loadin) - 下載資料中
4(done) - 完成下載
``xhr.open('method', url, true/false)``
用來設定 XMLHttpRequest 的參數與方法，method 可以用如 GET/POST/DELETE/PUT 等 HTTP 請求方法。url 放置要串接的 API　位址，第三個參數設定同步(true)或非同步(false)。 
``xhr.send()``
傳送資料
``xhr.onload() = function(){}``
當成功 load 回傳的資料後，可以指定 function 執行相關動作。
``xhr.onerror() = function(){}``
失敗後執行的動作。

## 用 Ajax 與我們用表單送出資料的差別在哪？
1. ``form``  
form 是透過 http 發送 request，同時會帶著參數(input value)，當 server 接收並回傳 response 的時候，瀏覽器會進入一個新的頁面並直接 render 回傳的資訊。  
2. ``Ajax``  
Ajax 則是建立一個 XMLHttpRequest 物件並透過 javaScript 來發送 request ，Ajax 可以實現非同步的請求，頁面不會重新整理，回傳的資訊會儲存在 responseText 裡面，瀏覽器不會立即 render。

## JSONP 是什麼？
JSONP 的全名是 JSON with padding。  
因為 CORS 同源政策的規範，非同源的回傳資料除非 head 帶有 'Access-Control-Allow-Origin'等資訊，不然會被瀏覽器給阻擋。但其中某些 tag 如 &lt;script&gt;或&lt;img&gt;等可以不受 CORS 規範，通過瀏覽器的阻擋機制。因此 JSONP 就是透過這個特性傳遞資料，詳細的流程如下:
1. 在 server 的回傳資訊裡內容寫入要傳送的資料:
```
setData ([
  {
  id:1,
  name:Ian
  },
  {
  id:2,
  name:Howie
}])
```
2. 在 local 端的 script 標籤寫入要引入資料的位址並另外寫一個 function 執行 server 的傳回資料，並取得傳回的 input 就是所要的資料。
```
<script>
function setData (input) {
  console.log(input)
}
</script>
<script src='url'></script>
```

## 要如何存取跨網域的 API？
可以透過 node.js 的 request module 或 Ajax XMLHttpRequst，發出含符合條件的 token 的 header，並取得含 'Access-Control-Allow-Origin: *' 的 response 通過瀏覽器驗證，才算成功存取跨網域的 API。 

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為透過 node.js 這個 runtime 不需要符合 CORS 同源政策的規範，可以直接存取跨網域 API，但瀏覽器為了安全性考量，必須符合 CORS ，這周主要處理瀏覽器如何存取跨網域 API，才會開始面對這個問題。
