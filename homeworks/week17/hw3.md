## 什麼是 MVC？
MVC 為了解決 javaScript 、 php 等語言混寫在一起，造成維護的困難而推行的一種網路架構。
所以 MVC 基本上不是指一種單一技術，而是一種設計架構，類似的架構還有 MVP、MVVM等。
MVC 是三個字的縮寫組成，Model、View、Controler，這三者組成一個合作架構，各自處理彼此的任務如下:
1. Controler : 負責 client、View、Model 之間的溝通協調，比如說接受 view 傳過來的 requet 做出相對應的回應、跟 model 拿數據、對數據進行處理、把數據傳給 view 顯示等各項任務，可以說是主要的流程控制中心。
2. View : 負責顯示畫面並直接與 client 端互動，主要接受 client 端發出的 request 並交給 controler 處理、接受 controler 回傳的資料並顯示，另外也會監測 model 是否有變動，當 model 改變時需要即時進行更新。基本上好的 MVC 架構 View 並不處理數據或進行運算等。
3. Model : 負責處理數據(CRUD)及管理資料庫等，具有直接訪問資料庫的權力。

![](https://miro.medium.com/max/784/1*t2DP7y6kEaVhp9O5wfU99Q.png)

---
## 請寫下這週部署的心得
這周部屬第一個感覺就是原來部屬也可以這麼潮，相對於 14 周的部屬流程，heroku 安裝的流程更少、網站的使用者介面更友善(ams 實在太複雜...)、結合 git 的部屬流程也很便捷，靠 node.js 就全部搞定。但過於方便好像也造成 debug 比較困難，如果 log 出來的資訊不夠詳細的話，只能從部屬的流程錯誤斷點來判斷可能是哪個步驟出問題，一個一個試，但目前主要會卡的點都在於資料庫建立不正確或不完全。  
另外原本有想嘗試部屬在 aws ec2 上面，但因為這周是靠 node.js 作為 server 來運行網站，但轉移到 ec2 上面似乎要在 ubuntu 重新安裝 node.js 及不確定 heroku 會自動執行 ``npm run start``的行為是否適用於 ubuntu，考量時間就先放棄了，之後有時間再試。

---

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
其實這幾周好像做出來的東西功能其實變化並不大，但是整個架構一直在調整，常常也會有剛開始進行一個新的作業，要想一下要採用什麼技術的狀況發生。讓我覺得了解各個工具的用處及彼此的架構關係非常重要，不然常會有不知從何下手的狀況(有點沒效率XD)。
像這周在做抽獎的後台的時候，其實不太確定在 ejs 檔案中能不能執行 jquery，查詢後才知道是可以的，但也另外發現原來 ejs template 其實是在 node.js server-side 先處理完再進度 client-side 渲染，所以 client-side jQuery 的部分要注意盡量等所有都渲染完後再跑 jQuery 的部分(加上 ``$(document).ready()``)。另外在 server-side 的部分因為沒有瀏覽器的 DOM 架構所以如果要執行相關 DOM 任務要透過引入 jsdom module 並且建立 ``new window`` 的方式來進行操作。

而這幾周學習的東西一路從
1. 純 PHP
2. PHP + API + javaScript(jQuery) 動態生成網頁
3. PHP + API + javaScript(jQuery) + 打包工具(webpack)
4. express + sequelize 後端架構(PHP 神奇的消失了)

對我而言好像發生了很大的變化，主要就在架構變得越來越清晰，一開始純 PHP 其實是把 MVC 三個功能都混在同一個 PHP 檔案裏面執行(儘管有把連線拆開)。接著 API 出現後，好像有把大雜燴拆成 model、control + view 兩個部分，API 搭配 conn.php 負責 model 的任務，controler + view 還是由同一個檔案完成。接著打包工具出現，覺得最主要就是讓各個任務可以獨立成不同的 module，讓整個架構變得更清晰，但這時候 control 和 view 還是沒辦法獨立成兩個部份的樣子。但進到 17 周，新的工具讓這一切突然變得很不一樣，MVC 可以各自獨立，靜態的檔案也可以放在 public 獨立管理，但美中不足的是這周 view jQuery 的部分還是寫的很醜陋，雖然獎項的標題、內容、照片等執行的任務都差不多，但還是得每一個獨立出來各自寫，造成類似的 code 一直重複出現，只改其中對象的狀況發生，對應到 controler 也需要為每一個不同對象建立獨立的 controler function(儘管執行的行為 95 % 相同)。有嘗試過把 jquery 的監測行為寫成獨立的 function 來引用，但面對 ``$(e.target)`` 把 function 拆出來後，會出現 e undefined 的問題，這部分還想不到要怎麼解決。另外也有試過想把 exprees app 的 callback function 獨立出來，但目前遇到的問題是如果要把不同的對象標籤當成參數傳進去 cb 會遇到系統判定參數為一個 middle ware 的問題(程式碼如下)，這部分還在想要怎麼解決。
```js
const findAll = (req, res, attr) => { //attr 被當成 undefined middle ware
  prize.findAll({
    where : { is_deleted : null},
    include: user,
    order: [['id', 'DESC']]
  }).then(prizes => {
    res.render(`../views/${attr}`, {prizes})
  }).catch(error => {
    console.log(error.toString())
    res.redirect('/')
  })
}
```

---

## Reference
[How to use jquery with my Node.js EJS template?_jsdom](https://stackoverflow.com/questions/40207912/how-to-use-jquery-with-my-node-js-ejs-template)