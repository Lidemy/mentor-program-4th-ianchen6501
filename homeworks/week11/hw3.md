## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
- 雜湊跟加密的差別  
``雜湊(hash)``  
將資料經過一連串運算後產生對應的結果，這樣的過程稱之為雜湊，雜湊完的結果具有不可逆性，
雜湊完的結果只有非常小的機率會一樣，所以可以拿來儲存密碼等需要安全性的資料。常見的雜湊演算法有 MD-5、SHA-256。  
``加密(encrypt)``  
加密是用鑰匙(key)來幫資料加密，在解密時也需要用到鑰匙才能開啟內容。可以分為對稱式加密(加密、解密都用同一組 key)
及非對稱式加密(加密、解密用不同組 key)，常見的對稱式加密有"凱薩式加密"、"AES"，常見的非對稱式加密有"RSA"。  
兩者主要的差別在於，雜湊完的結果無法推回原資料，就算資料外洩也只是拿到雜湊完的資料。而加密需要有鑰匙(key)，而雜湊不需要 key 。
- 為什麼密碼要雜湊後才存入資料庫  
如果密碼直接存在資料庫中，會有被攻擊取得全部密碼，或因管理不當而外洩的問題。所以在密碼管理方面，先把密碼經過雜湊在存入資料庫，
一樣可以達到使用者驗證的功能，就算外洩也無法讓駭客透過雜湊完的密碼，來回推正確密碼。

> 參考資料:  
[資訊安全密碼存明碼，怎麼不直接去裸奔算了？淺談 Hash , 用雜湊保護密碼](https://medium.com/@brad61517/資訊安全-密碼存明碼-怎麼不直接去裸奔算了-淺談-hash-用雜湊保護密碼-d561ad2a7d84)  
[一次搞懂密碼學中的三兄弟 — Encode、Encrypt 跟 Hash](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)

## `include`、`require`、`include_once`、`require_once` 的差別
- include 基本上與 require 功能一樣，兩者都會引入函式及變數，差別在於對於錯誤的處理方式，include 的內容在 php 程式運行的時候不會被視為必要檔案，所以如果查無檔案或檔案出錯，php 程式只會出現警告但還是會繼續執行。而 require 的內容則會被視為必要檔案，如果在 php 執行過程出錯，整個程式會全部停止並出現錯誤訊息。
而 include_once、require_once 和 include、require 唯一的差別是前者會主動去檢查程式腳本裡面是否有重複引用的情形，如果有重複就不會再次引入，避免變數內容產生錯誤。

> 參考資料:  
[深入理解require與require_once與include以及include_once的區別](https://codertw.com/程式語言/239900/)
[PHP Include Files](https://www.w3schools.com/php/php_includes.asp)

## 請說明 SQL Injection 的攻擊原理以及防範方法
- 攻擊原理  
SQL Injection 基本上就是透過 SQL 語法本身的特性，在前端使用者參數或輸入內容中加入跳脫字元或某些恆為 True 的判斷，如`#`、`'`或`1=1`，駭客就可以在這後面加入攻擊語句來達到目的。
- 防範方法  
防範方法是利用 prepareStatement 的方式，把使用者參數中包含特殊字元(如單引號)做轉譯處理(前後加上單引號等)，就可以避免 SQL 在執行時把參數當成語句的一部分執行。

> 參考資料:  
[PreparedStatement是如何防止SQL注入的？](https://kknews.cc/zh-tw/code/p2g52p2.html)

##  請說明 XSS 的攻擊原理以及防範方法
- 攻擊原理  
XSS(Cross-Site Scripting) 的攻擊原理與 SQL Injection 有點相像，兩者都是透過在前端使用者參數或輸入內容中加入攻擊語句來讓程式當作腳本執行。只是 XSS 運用的多是 JavaScript 語法。
例如在這周的留言板可以輸入留言內容`<script>alert("hacked")</script>`，那瀏覽器就會判斷這是一段程式碼而非留言內容，去執行&lt;script&gt; 語句裡面的指令。

- 防範方法  
可以透過 `specialChar()` 把特殊符號如 $、<、> 等替換為 html 字符，就可以避免瀏覽器把他們當作標籤執行。

## 請說明 CSRF 的攻擊原理以及防範方法
- 攻擊原理  
CSRF(Cross Site Request Forgery)就是跨網域的攻擊，利用做出一個釣魚網站來讓使用者(受害者)不經意發出 request 後執行某些動作來達成目的。方法是透過 &lt;a&gt; 或 &lt;form&gt; 可以發出 request 的特性，並在釣魚網站隱藏上面那些標籤，讓使用者點擊後自動發出 request 來進行惡意攻擊，因為使用者點擊後也會一併附帶 cookie 或 session 的資訊，所以 server 端會驗證使用者無誤，就讓惡意攻擊成功了。
- 防範方法  
1. 檢查使用者 request header 的 referer，但因為使用者可能會關掉 referer 的功能、瀏覽器可能會不帶 referer 或檢查的方法有 bug 等原因造成這個方法不這麼實用。
2. 透過圖形或簡訊驗證碼，因為攻擊者無法得知圖形或驗證碼的內容，也就無從攻擊了。
3. 加上 CSRF token ，由 server 隨機產生一個 token ，並儲存在 server 當中，使用者發出 form request 時，需要帶上 token，因為攻擊者並不知道 token 的內容，server 只要比對 token 是否正確就可以防範攻擊了。
4. Double Submit Cookie，這個方法是由 server 建立 CSRF token 並放在使用者的 form 及 cookie 裡面，因為使用者的 domain 與攻擊者的 domain 不同，攻擊者儘管可以偽造 form 裡面的 token 卻無法更改 cookie 裡面的內容，所以 server 只要比對兩個 token 是否一致就可以防禦了。
5. 透過瀏覽器防禦，可以在 set-cookie 語句後面加上 `Samsite`，這樣使用者的 cookie 就只能在 same site 上面使用，但要注意的是目前只有 Google Chrome 有支援。

參考資料:  
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)