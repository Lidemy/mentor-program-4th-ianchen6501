## 教你朋友 CLI
### 參考資料
[第一周-command-line 基本指令與操作](https://medium.com/@miahsuwork/第一週-command-line-基本指令與操作-f4da8bcfdfa)  
[命令列介面-wiki](https://zh.wikipedia.org/wiki/命令行界面)

### 定義

> CLI就是 Comand Line Interserface 命令列介面或者也可以稱之為 CUI (Character User Interserface ，文字使用者介面)。
> 相較於CUI，通常我們習慣的在電腦桌面移動、打開資料夾等動作是透過 Graphic User Interserface (GUI)，但其實 GUI 背後也是透過 CLI在跟電腦進行溝通。 
> 現在雖然 GUI 十分普及了，但 CUI 卻沒有被取代掉，反而各各系統繼續加強 CUI 的功能，原因就是針對一群用戶端或伺服器，有時候 GUI 的控制能力反而不如 CUI ，因此創造了更豐富的 CUI 功能。

### 常見的 CUI 語言
1. linux 的 Bash
2. Windows 的 Window PowerShell

### 常見可用的 CUI 軟體
- window - windows powershell
- git bash

### 基本指令介紹
- whoami 印出目前的用戶名稱
- pwd 印出現在位置
- ls 印出現在資料夾內的檔案  
延伸技 " ls -a "列出隱藏的目錄;" ls -a"列出詳細的資料;" ls -al"列出詳細的資料及隱藏的目錄
- cd 移動到資料夾  
延伸技 "CD .." 到上一層、 "CD \ " 到根目錄
- clear 清光畫面
- man 指令教學手冊，使用方式: man +指令;按 q 可以跳出  
window 版本可能會沒有 man 指令可以使用，這時候可以依靠 help 指令，使用方式為 指令 + --help 。
- exit 關閉終端機

### 檔案操作指令
- touch 可以建立檔案或碰一下檔案並修改檔案時間
- rm 刪除(檔案)  
注意 rm 刪除後就真的刪除了，不會進到垃圾桶裡
- rmdir 刪除資料夾
- mkdir 新增資料夾
- mv 移動檔案或幫檔案改名  
改名方式為 " mv 舊檔名 新檔名"
- cp 複製檔案

### 編輯檔案相關指令
- vim 編輯器，分為兩種模式(一般模式/插入模式)，一般模式只能複製貼上，必須要輸入"i"進入插入模式才可以打文字，要進入一般模式按 "esc"。
跳出時要輸入":q"。
儲存時要輸入":w"
跳存時要輸入":wq"

### 其他指令
- cat 印出檔案內容  
使用方式: cat +檔案名稱
- echo 印出你要的內容  
使用方式: echo +要打印的文字
- grep 抓取特定字元  
使用方式: grep 抓取的字元 檔名
- wget 下載檔案至資料夾  
使用方式: wget+下載檔案位址
- curl 送出request
- date 顯示現在日期時間

### 指令組合技
- redirectory > 將echo或輸入的內容導向某檔案，例如echo "123" > file，就會把file裡面的內容洗掉變成123。另外如果用 ">>" 就不會洗掉原本的內容變成加在最後面。
- pipe | 把pipe左邊輸出的內容輸入到pipe右側。例如cat file | grep 抓取的內容。

### 給 h0w 哥的解決方法
h0w 哥以下我把要如何建立一個叫 wifi 的資料夾及在裡面建立一個 afu.js 的檔案步驟寫再下面，你可以參考看看~

1. 首先打開 Gitbash ，到你要的資料夾
2. 創建一個 wifi 的資料夾
```
mkdir wifi
```
3. 接著建立 afu.js 檔案
```
touch afu.js
```