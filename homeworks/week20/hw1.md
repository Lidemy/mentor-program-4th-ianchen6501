## 十六到二十週心得
### 十六周
十六周學了超多東西，但到現在我覺得大概都忘光了(大誤)，其實是想要表達十六周的時候其實只是大概了解了原理，但離實際使用還有一大段的距離，這一點在後面如需要判斷、使用 this 或運用 .prototype() 方法的時候還是會發現自己概念上還有許多要重新思考與釐清的。所以希望在接下來幾周也可以花點時間整理筆記，並找一些實際的應用案例來練習。

### 十七.八周
這兩周主要體驗到了當專案變得稍微比較複雜(比起之前作業都是單個頁面的狀態)，架構及命名必須事先規劃的重要，因為 17 周只做了抽獎功能，所以我在檔案命名上就簡單的以前台(front)、後台(post)來區分，但當要把其他如點餐、注意事項等頁面一起加進來的時候，就發現之前的命名太簡略了得重新命名，真的執行才發現這是一個很繁瑣的過程，途中必須要重複 check 檔名、function 有沒有輸錯，來來回回也耗費了不少時間。另外也感謝 huli 一直耳提面命提醒遵守命名規則的重要，讓我深深體會一開始就要好好命名，不然改起來要人命的過程，也讓自己更正視命名在後續維護及交接的重要性。
十八周改用 nginx 部屬有遇到一個小問題是在把 express-session 的 secret 存成環境變數時，可能是伺服器中間有斷線或重啟，導致環境變數消失需要重新設定的不方便，所以另外找了 [dotenv](https://www.npmjs.com/package/dotenv) 來把環境變數存成檔案留存在資料夾中，這樣除了方便管理外，也不會因為重啟而丟失資料，覺得還挺方便的。

### 十九周
這周目前進度就是把影片給看完，預計是會做期末專題，也跟同學有初步連繫要一起合作(希望賺取合作 credit!)，計畫在學習 react 的四周內分些時間把期末專題的方向給規劃出來。

### 二十周
二十周主要心力都放在把餐廳網站給優化，預期目標是讓一些綴餘的程式碼簡化(主要集中在 controler 與 DOM 監聽)，有盡力讓 controler 簡化成共通 function 避免重複書寫，但網站監聽的部分還是寫的非常的冗廢。
另外也貪心的想嘗試圖片上傳的部分，但也卡在圖片存成 blob 後拿下來沒辦法使用的狀態，總而言之就是優化還缺很多地方要完成，時間真的是不夠用阿!
另外 lazy hackathon 優化的心得都放在[這邊](https://github.com/ianchen6501/lazy-hackthon-practice/issues/2)。


