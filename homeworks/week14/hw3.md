## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
### **什麼是 DNS**
ㄧ般來說 IP 是由 四組的 10 進位數字組成，但如果要連結到每一個 IP 都需要記得隨機的 IP 名稱會變得很麻煩，所以這時候就需要 DNS 來在我們ㄧ般看的網路位址與 IP 之間轉譯，DNS 就像是電話簿一樣，當我們在瀏覽器裡面查詢我們要的網址並發出 request 時，request 會先發到 DNS，再由 DNS 把他轉成 IP 位址並發送 request 到我們指定的 IP。  
DNS 的全名是 Domain Name System，DNS 的組成是樹狀的階層結構，例如在台灣會有一個管理 .tw domain 的 DNS 主機，下面管理包含 .com.tw / .edu.tw 等的不同子網域主機，這樣一層一層的把不同階層的 domain 串聯起來。所以當我們要連到成大的網站 ``www.ncku.edu.tw`` ，瀏覽器會先發到 ISP 的 DNS(如 hinet 168.95.1.1)，但因為中華電信管理的 DNS 並未包含 .edu.tw 的 dmain ，所以中華電信會轉到 .tw 的 DNS 主機，再由 .tw DNS 主機轉到 .edu.tw DNS 主機，再轉到 .ncku.edu.tw 就會找到我們的要去的位址。  
另外 DNS 為了節省上述的查詢步驟，其實會將最近查詢的紀錄存到 cache 中，當下次有人要查詢同樣的位址時，就可以直接轉到正確的位址。
### **Google 公開 DNS 對 Google 及ㄧ般大眾的好處**
對ㄧ般大眾的好處:
1. 依據 Google 對外的說明，使用 Google public DNS 有更快速、安全及減少重新導向等優點。
2. 使用者有更多的 DNS 伺服器選擇，也可以降低既有 DNS 的工作量，提升使用品質。
3. DNS 層級，google 的 DNS 層級是在 DNS root 下來的第一層主機，可以減少向上查詢的工作量。 

對 Google 的好處:
1. 用戶資料蒐集。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
通常來說伺服器是一次處理一筆 request ，但當像搶便宜機票的情形時，會同時湧入許多 request，這時就有可能會出現 race condition 的情形。可能會有剩一張票，但因為兩筆 request 同時達成而售出兩張票的情況。  
為了處理這種情形，其中一個方式就是透過在資料庫設定 lock。  
lock 其實有分不同的型式，如 shared lock / exclusive lock / update lock，上面所提的其實是 update lock，它主要作用方式是只允許有一個交易可以產生 update lock，進而達到確保只賣出一張票的結果。  
實際作用的流程如下:當我們在買票時，其實就等於建立一筆購票紀錄(update request)，當系統在處理 update request 時會自動針對該筆交易(我們可以視為最後一張票)產生 exclusive lock，來讓該張票不被其他交易行為更動，但當今天如果沒有設置 update lock 時，可能會導致有兩個交易行為同時產生 exclusive lock，就會導致兩個交易行為都成功的情形。而 update lock 規定只能有一筆 exclusive lock 產生，所以當某筆交易成功設定 update lock 後，其他交易行為就無法設定 exclusive lock ，確保交易只發生一筆。

## NoSQL 跟 SQL 的差別在哪裡？
> SQL 是關聯式資料庫，有相對比較嚴謹的架構，在 SQL 中用 data table 來儲存相關資料，table 需事先設定好欄位及欄位性質(大小、型別、名稱等)才能開始建立內部資料。連帶的 SQL 有比較好的連結性，可以利用 JOIN 等語法來獲取和建立資料表格。

> NoSQL 是非關聯式資料庫，非關聯式資料庫存取的內容是用類似 json 物件的方式(如下)。
```
{
  name : "ian",
  id : 1234,
  mobile : {
    a : 2222,
    b : 3333
  }
}
```
> NoSQL 的資料結構分為三層 DB -> collection -> document，我們可以想像成 SQL 裡的 DB -> Table -> row。不同於 SQL 儲存的資料必須符合各個欄位的規定，NoSQL 可以自由地建立 document 而不用符合太多的規定，建立的方式也循著同樣的結構，例如我們可以用 ``db.classmates.isert({ key: value, ... })`` 的方式建立一個 document，然後 NoSQL 資料庫會自動建立對應的唯一 id 值。

承上，SQL 與 NoSQL 的差別大致如下:  
1. SQL 的資料更為組織化、模式化及完整，NoSQL 則更加的靈活。
2. NoSQL 相較於 SQL 更容易擴充。

## 資料庫的 ACID 是什麼？
ACID 是資料庫在進行 Transaction(交易)時應符合的原則。  
``A(Atomicity)原子性``，交易不能只完成一部分，一個交易應該只有"成功"與失敗兩種可能性，例如在匯款時其實是轉出和轉入兩個行為，如果只有完成轉出的動作，那就會造成轉出帳戶的金額錯誤。  
``C(Consistency)一致性``，交易完成前後資料庫的完整性必須保持一致(欄位設定、trigger等)。  
``I(Isolation)隔離性``，資料庫可以有多個交易同時發生，但這些交易必須確保各個交易完成後資料庫內容必須一致。  
``D(Durability)耐久性``，交易完成後的資料庫數據不能損壞，且應是永久保存的。


### 參考資料:  
[SQL Server Lock 架構讀後心得](https://jackyshih.pixnet.net/blog/post/6154337)  
[適合所有人的DNS：優點和缺點](https://zh-tw.secnews.gr/189699/dns在線/)  
[SQL vs NoSQL 沒有硝煙的戰爭！](https://codertw.com/資料庫/16617/)