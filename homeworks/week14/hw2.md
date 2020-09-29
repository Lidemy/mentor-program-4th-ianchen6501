整理一下架站流程:
1. 申請 aws EC2 伺服器、選擇伺服器所在地及作業系統(ubuntu)
2. terminal: 更新 ubuntu -> 安裝 tasksel -> 安裝 lamp server -> 安裝 phpmyadmin
3. 設定 phpmyadmin 密碼
4. 修訂防火牆設定(UCF)，預設開啟 (http / https / mysql / ssh)等，並開啟防火牆
5. php 設定: 更改 /var/www/html 權限、更改 php.ini 內的 short_open_tag 為 on
6. 登入 phpmyadmin 並匯入原本的資料庫資料
7. 設定 filezilla 並用金鑰連線，更改預設資料夾為 /var/www/html，接著放入檔案
8. 用 IP 連線，並修正可能連線錯誤
9. 申請 domain (gandi/freenom)，並設定 IP
10. 申請 SSL 及安裝(尚未完成)

知識點紀錄:
1. DNS 紀錄類型(MX/TXT/CNAME/A/NS)，其中目前可能會用到的 A 是針對將網域連接到代管網域服務的主機實體 IP 位址(猜測目前使用的 AWS EC2 即是)。
CNAME 則是針對網域連接另一個實際或正規的網域名稱，其他則是針對電子郵件、文字檔等使用。
2. aws EC2(Elastic Compute Cloud) 提供虛擬主機的服務，可以自訂運算容量與記憶體大小，EC2 的計價也有不同方式(秒數/預付費用/競價/租用實體主機等)。
不同的 instance 由不同的 CPU、記憶體、網路頻寬等組成，適用於不同目的。目前使用的 general-purpose 就適用於網頁伺服器，其他的運算優化、記憶體優化可以用來
做影音處理、或資料庫使用。
3. TTL。

困難與心得:
- 其實上述流程 1-3 依靠著前人的筆記很順利的就完成了，雖然途中針對各個過程沒有思考太多好像不太好，
導致整個架完基礎設施以後不太理解各個部份的功用是什麼(這個後來有靠 huli 的影片補起來一點)。
- 一開始放 php 資料是透過 github clone 的方式，但因為 clone 會一次下載全部的檔案，為了只放 repo 裡面的部分資料還研究了一下要怎麼實作，
嘗試用更改網址末段的方法(後來還是沒有成功)。才改成用 filezilla 連線資料庫的方式。filezilla 這邊比較卡在一開始用密碼驗證都會被擋，改用金鑰登入就成功了。
- 在連結 php 網站時比較多遇到的問題都是資料庫設定錯誤，原因大多出在部落格或留言板當初設計都必須設定資料庫裏面"權限(authority)"的預設值(default)，
來區分登入的角色權限，這樣就會遇到一個問題，如果今天忘記當初的預設值，就必須浪費時間嘗試，這部分在之後應想辦法改善。
- domain 的部分申請了 gandi(乾爹)與 freenom 兩個，差別就在於 freenom 免費的網域只提供某些冷門的 domain ，像我這次就申請 .gq 的 domain，google 了一下是
赤道幾內亞國家及地區頂級域名，可能會有連線比較不穩定的問題。

參考資料:
[DNS域名解析中A、AAAA、CNAME、MX、NS、TXT、SRV、SOA、PTR各项记录的作用](https://itbilu.com/other/relate/EyxzdVl3.html)
[30天鐵人賽介紹 AWS 雲端世界 - 13:　使用 Elastic Compute Cloud(EC2) 達到 AWS 上啟用 VM 服務](https://ithelp.ithome.com.tw/articles/10192098)