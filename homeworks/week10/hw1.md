## 六到十週心得與解題心得
第六周:  
這周我覺得重點就是在了解 html 的 element 其實有分成 block 跟 inline 兩種屬性，不同的 element 要先知道是屬於上列哪一個，才不會覺得有時候某些 CSS 指令可以正常使用，有時候卻會失靈。另外也要熟悉定位(position)跟各種排版方法(水平、垂直置中、flex、grid 等)，常常會切版切一切還要去找置中的方法，所以如果能有系統的熟練排版方法，應該可以節省不少時間。
另外 CSS 的命名應該要有系統，可以參考 BEN 命名法，把網頁拆分為 block、element、modifier 等三個層級，分別用不同的命名方式。

第七周:  
這周的 hw1 真的覺得很有挑戰性，花了很多時間。其中光搞懂不同動作的前後觸發程序就費了很多腦筋，常常是寫出一個小功能後，發現如果要加入其他功能，前面寫的就必須要大改的問題。後來因為真的太卡了，偷看了一下解答，並花了很多時間理解解答為什麼這樣做，並試著自己重新做一次，才逐步摸索出解題的流程，
這周的 hw3 遇到了留言板留言過長會破版的問題，在解決的過程中，也才真正理解到如果有一個 div 裡面的子物件如過設定了 position: absolute，因為物件如果設定了 absolute 就不會影響或撐開周圍的元素，導致原本的 div 的高度就不會受到子物件的影響，意思就是不會被撐開。

第八周:  
這周開始進入用實際網頁串 API ，主要覺得就是學了 Ajax 以及 XMLHttpRequset() 的用法。並且在查資料的過程中理解到，其實我們現在用的工具是逐漸發展過來的，並且逐漸有新的工具再出現。
解串 twitch 的時候發生了一段糗事，就是我一直覺得應該程式碼沒有問題可以串接所有的直播連結，但每跳到一個新的遊戲時，畫面都不會變動，所以我就一直點直到 devtool 的 console 出現反應時間過長的錯誤，下意識覺得是否是 request 的流程造成迴圈所以跑太久，一直百思不得其解是發生什麼問題，後來才想到原來是因為用了 ``innerhtml +`` 的語法，所以新增的直播連結一直增加在底下。仔細想想好像同樣的情況一直出現，只要誤解了錯誤原因，常常就會陷入一個死胡同出不來，然後換個方向想才會發現原來根本不是一開始想的，這也好像跟理解錯誤訊息的能力有關。

第九周:  
這周開始學習新的 PHP 及 MYSQL 等語言，其實一開始搞不太清楚 Apache、PHP 跟資料庫(MYSQL)之間的關係，現在大概釐清的狀況是，Apache 是一個伺服器系統、PHP是一個程式語言可以在 Apache 運行請其去資料庫提取資料等，MYSQL 則是一個資料庫軟體。所以這周作業的執行流程其實主要都是在做從前端透過伺服器去取資料並回傳的作業，在前端透過 PHP request 伺服器去資料庫提取、新增或刪除資料等，並且在上述那些資料庫作業時就必須使用到 SQL 語法。
另外這周我覺得自己比較需要注意的是加入判斷錯誤的位置及判斷的方法，所以整理了一下，大概是
1. ``(!empty())``:主要用在判斷 input 是否為空值。
2. ``(!result)``: 主要用在判斷是否有連線成功，如果連線失敗出現 error ，就會判斷為 false 跳出執行。
3. ``(result->num_rows() === 0)``:主要用在判斷資料庫是否有提取到資料。

第十周:  
綜合測驗和小遊戲都還沒來的及做，之後補上!




