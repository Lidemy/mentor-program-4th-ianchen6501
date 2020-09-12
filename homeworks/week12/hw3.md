## 請簡單解釋什麼是 Single Page Application
SPA 是指在同一個頁面(網址)完成大部分或所有的動作，當使用者點擊不同的標的時，頁面不會重新導入到新的網址，可以達到更好的使用者體驗。  
SPA 的原理是透過 CSR(client-side-rendering) 來取代 SSR (server-side-rendering)，讓後端只負責給資料(如下圖)，前端透過 Ajax 獲取資料後重新整合成 html 並在瀏覽器渲染，就不用整個網頁重新 loading 一次，所以網址同樣也不會更改。  
![](./圖片一.PNG)
要說明 SSR 與 CSR 的差異前，可能要先搞懂基本的 MVC 架構，MVC 的出現基本上是把網路工程在處理的事情分成 M(model)、V(view)、C(controller)三個部分，M 負責資料處理及演算法的部分，V 則是視圖、視覺、UI的部分，而 C 則是在處理和回應來自 server 的要求。搞懂 MVC 的基本架構後，就可以說明 SSR 與 CSR 差別，SSR 的處理流程是在 server-side 就渲染好畫面，意思是 SSR 在 server-side 的 view 整合成一整份 html 的程式碼回傳給瀏覽器來顯示。而 CSR 則需要在拿到 server 回傳的資料後，在瀏覽器端重新整理資料成完整的 html(這部分就是 render)，再顯示到瀏覽器上。兩者的流程圖示如下:
### SSR
![](./SSR.jpg)
### CSR
![](./CSR.jpg)  

參考資料:  
[前後端分離與 SPA
#frontend #Backend #MVC #SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
## SPA 的優缺點為何
SPA 的優點包含:
1. 可以優化使用者體驗，不會一直發生網頁跳轉的狀況。
2. 節省伺服器的負擔，只透過一次的 request 就可以拿到所需要的靜態資料，接下來只要透過 js 拿到所需要的其他資料就好。
3. 可以完整的切開前後端的工作，讓分工更明確。  

缺點則有:
1. 缺點是因為前端的頁面原始碼不存放資料，所以爬蟲只能爬到一堆 JavaScript code 而沒有內容資料，對於 SEO 沒有幫助。但因為 google 現在已經可以針對使用 SPA 及 ES6 的網頁去爬出完整的資料，所以 CSR 無助於 SEO 的狀況應該可以改善。
2. 因為第一次載入網頁時需下載大量的 javaScript 資料，因此載入的速度會變慢，為了改善這個問題，就出現了 Isomorphic JavaScript (又可以稱為 universal JavaScript )，Isomorphic JavaScript 的原理是透過再伺服器先渲染出第一個畫面，節省一般 CSR 第一畫面的渲染時間，接下來再透過 JavaScript 來作業。

參考資料:  
[前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/前端三十-18-fe-為什麼網站要做成-spa-ssr-的優點是什麼-c926145078a4)
## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
1. 渲染的位置不同:  
透過 php 直接輸出內容的方式，每做一個動作，都要重新對 server 發出 request ，並且瀏覽器要重新載入"後端"渲染好回傳的 html 檔。而後端負責提供輸出資料的 API ，前端用 Ajax 串接的方法，只需要載入一次網頁，接下來都是透過 js 串接 api 的方式，在"前端"渲染回傳的資料，瀏覽器不用重新載入 html 檔，並且只需要針對回傳的資料部分重新渲染。
2. 前後端的工作量不同:  
在後端的 view 渲染會加大伺服器的工作量，而在前端渲染可以降低伺服器的工作量，但同時在一開始 download JavaScript 檔案時會花費比較多的時間。
3. 傳遞的資料格式不同:  
這周的方法是透過傳遞 JSON 來交換資料，而在 view 渲染的方式會回傳一個完整的 html 檔案。