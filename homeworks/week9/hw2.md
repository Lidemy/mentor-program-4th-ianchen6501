## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
兩個都是字元資料型態，都能夠儲存可變長度的字串，兩者都可以儲存最多 65535 characters(字元) 的容量。
兩個主要的差別在於，varchar 可以自定義大小(1~65535 characters)，而 text 就是固定在 65535 characters 的容量。
所以在 MYSQL 中我們可以設定 varchar 的長度，text 就沒有這個功能。
另外一般來說如果可以知道儲存字串的最大長度，一般會用 varchar 會比較節省記憶體空間。 

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
1. cookie 就是伺服器發送給瀏覽器的一小段文字資料(含 name 及 value)，瀏覽器會會儲存在 storage 並在 request header 帶上標題為 cookie 的資料。cookie 可以時效，過期了就無效了。cookie 通常用來做 session 管理(帳號登入、購物車)、個人化資料、追蹤使用者行為等。
2. 要在 http 設定 cookie 可以透過 set-cookie function 來執行，set-cookie 可以設定 name、value及 expire time。
3. 瀏覽器是透過 request header 裡面帶入 cookie 資料傳送到 server 去的。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 雖然目前通行證的驗證方式是透過輸入正確的帳密後得到 session (內含 username 資訊)，但因為 session 檔案不會因為 session_destroy 而清除，僅會刪除裡面的 username 資料，所以之後使用者還是可以透過在 session 裡面設定 username 資料來偽造留言資料，例如輸入其他人的 username。
