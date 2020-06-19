## 參考資料來源
[Git與GitHub介紹，軟體版本控制基本教學](https://tw.alphacamp.co/blog/git-github-version-control-guide)


## 跟你朋友介紹 Git
"Hi 菜哥，廢話少說我來教你 Git 了，快給我坐下好好聽。"
"在講 Git 之前呢，你要先懂什麼叫版本控制，現在主要有兩種版本控制方式..."

---

### 前言 VCS 及 DVCS
- VCS 中央式版本控制系統  
會有一個共通的遠程倉庫，並由各人獨自提取各自的代碼開發，開發完成後提交。每個人進行開發時都要到遠程提取代碼。

- DVCS 分布式版本控制系統  
與 VCS的差異在於，每個人在各自的主機都會存取一個本地的 clone ，可以在不聯網的情況下進行開發，當有每一個小改動可以先提交到本地，等到完整的版本完成後在推送到遠程倉庫，當遠程倉庫更新後，其他人也可以 clone 最新的版本進行開發。

---

"好的，這樣你稍微對版本控制有基礎的概念了吧，接下來我們來看看 Git 到底是什麼玩意兒..."

---
### Git 簡介

- Git 就是一個用來做版本控制的東西，他會在你的檔案下建立一個 git 的資料夾，來做版本控制。
- Git 作業大致的流程是這樣子的，在要做版本控制的資料夾裡面進行 Git 初始化以後， Git 會自動在資料夾底下建立一個 .git 的資料夾，裡面會存放有版本信息。
版本控制主要會有三個區域 1.工作區(目前的資料夾)、2.暫存區(.git 資料夾裡的 index 檔案)、3.版本庫(就是 .git 資料夾)。
當檔案被編修以後其實還不是被記錄版本的狀態，就是所謂的 unstaged 狀態，所以需要經由 git add 指令，之後就會呈現 staged (就是暫存的狀態)，當最後檔案被 commit 提交之後，就會呈現 modified 的狀態，這表示這次的變動已經成為一個正式的版本了(之後可以透過 git log 看到各次的歷史。)

---
"看了這麼多的字有沒有一點頭昏腦脹了呢，不如我們就直接開始操作看看吧!"

---
### 下載 Git
- 進入 Git 的官網並且下載最新的版本，安裝完後你會看到功能列多了一個 git bash 的軟體可以使用。 Git bash 可以讓你用 command line 的方式來進行版本控制。
### Git 基本指令
> 基本操作
- git init  
git 版本控制的初始化，會在資料夾內建立.git的資料夾。

- rm -rf .git  
刪除 .git 資料夾，只要在做一次 git init 就會重新建立

- git status  
查看現在git檔案的運行狀態。
檔案一般會有三種狀態，1. untracked(不加入)、 2.staged(加入暫存區)、3. modified(加入版本控制)

- git add +檔案名 or git add . (一次加入資料夾所有檔案)  
把檔案加入暫存區，會顯示 staged 的狀態。

- git rm --cached +檔案名  
刪除 commit 

- git commit or git commit -m +"版本描述"  
加入檔案控制

- Git log  
查閱檔案控制的歷史紀錄，因為每儲存一次檔案控制（add + commit）就會有一個新版本的檔案控制(可以想成把檔案丟進一個新資料夾)，所以透過 git log 可以看到各次的歷史記錄。  
備註:每一個版本都會有一長串的亂碼名稱，那是 SHA 又稱為"安全散列演算法"

- Git log --oneline  
可以得到簡述版本的歷史紀錄

- Git checkout + commitname (其實也可以接 branchname)  
進入某一次的 commit ，使用方法：Git checkout +版本名稱。如果要跳出該版本則輸入 Git checkout master

- .gitignore  
是一種檔案型式，可以把不想要進行版本控制的檔案都放進去（如個人檔案、系統檔案等），使用時需要先 touch .ignore 然後 vim 編輯他，在裡面輸入要放進去的檔案名稱。之後那個檔案就不會顯示在 untracked 的項目裡。

- Git commit -am "版本控制名稱"  
可以一次達成 git add . + git commit -m "" 的功能。  
備註: 要注意的是如果有檔案還沒 add 過，無法使用這個功能。
---
"講了這麼多功能，那菜哥你會不會好奇 Git 除了自己做版本控制外，也可以多人一起共同工作嗎?當然可以，這就要提到 branch 了..."

---

### Git branch 分支 簡介 
為了同時開發新功能或修復錯誤，透過創造不同  Branch 可以達成穩定版及新功能版共同開發的狀態。讓穩定版維持運作的狀態，同時另開 branch 開發新功能，最後再 merge 成為一個新版本。  
因此開發合併流程大概會長得這樣：  
Branch Main → Commit1 .2.3 (維持運作)  
Branch 新功能 → Commit A.B.C (同時進行開發)  
最後把回到 branch main 並 Mergh Branch 新功能的 Commit A.B.C ，但要注意有時會遇到 conflict。 

### Git Branch 基本指令
- Git Branch + Branchname  
建立新的 Branch

- Git Branch -v  
查看現有的 Branch

- Git checkout + Branchname  
在不同 branch 中間切換

- Git Branch -d + Branchname  
刪除 Branch

- git branch -m filename  
幫 branch 改名子

- Git Merge + Branchname  
合併 Branch ，注意是在現在所在的 Branch 把其他 Branch 合併進來。

- Git rebase   
跟 Git merge 很像，不同點在於如果今天 master 的檔案也有更新的話 Git rebase 會保持 master 最新的狀態。

- Git Merge 遇到 conflict 的時候的解決方式  
在 Git Merge 時如果系統跳出 conflict 必須透過手動的方式解決，流程為vim 有衝突的版本，然後裡面會同時出現現在 commit 的內容(在<<<<<<<<<< HEAD 到 ========== 的中間區域)以及準備要 merge 的內容(=========== 到 >>>>>>>>>>> branchname的中間區域)，依照想要改的方式儲存後跳出，重新 add + commit 就解決了。
### 其他常用指令
+ git commit --amend  
用於修正打錯名子的 commit ，可以進入編修模式。

+ git reset  
回復到未 merge 或 commit 的狀態

+ git reset head^ --hard / soft  
用於如果 commit 後想刪除或修正，有以下兩種方式:
```
git reset head^ --hard #會強制刪除最新的commit
```

```
git reset head^ #會把commit 的檔案回復到 unstaged 的狀態讓你 vim 後重新 commit
```
+ git checkout -- filename / git checkout -- .  
如果 vim 反悔不想要了，可以透過這個功能回復上一動。 "-- ."的功能與 add . 相同，就是把所有還沒 commit 的版本都回復上一動。

---
"菜哥既然你都懂怎麼版本控制了，你會不會想跟別人一起創作笑話呢，那你一定得要認識一下 Github ..."

---
### Github 簡介
Github 是基於 Git 技術的雲端平台， Github 提供 Repository (網路共享資料夾)，人們可以透過 Repository 來達到共同工作的目的。  
在 Github 上面主要有幾種功能。
1. code 你可以在這邊存放檔案。
2. Issue 發表問題、討論
3. Pull request 執行版本合併，重要!!

### Github flow 工作流程簡介
首先要先註冊 Github ，註冊完成後首先要創建一個 Repository ，創建完成後你就可以在這邊用 Push / pull 的方式上傳或抓版本控制。
如果今天是要跟別人進行共同開發，這時一般會有一個主體的 Repository ，你做為一個開發者要先到那個主體 Repository 複製一個一模一樣的 Repository ，作法就是到主體 Repositroy 主頁中找尋頁面上的 fork 標誌並點下去，這時候 Github 會花一點時間把他複製一個新的 Repository 出來，此後你就可以在這個 fork repository 上面做任何動作而不會影響到原來的。當你進行功能開發完成後，這時候你可以把檔案 push 到 fork Repository 上面並點選 Pull Request 等到管理者確認 pull Request 的請求並 Merge 後，新功能就會合併到主體的 Repository 上面了

### Github 基本指令

+ 設定遠端 Repository 位址
首先在 Github 上面先建立一個 repository ，接著透過下列指令設定 repository。
``` c
git remote add origin https://github.com/ianchen6501/test.git #上傳位址
```
+ Git Push   
上傳 commit 或 branch 到 repository，指令如下
```
git push origin branchname / commitname
```
+ Git Pull
把 repository 上的版本給抓下來，當然抓下來的過程中也有可能遇到 conflict ，這時候的解決方式也一樣是進入想同步的檔案 vim 然後儲存後重新 add / commit 。
```
git pull origin branchname / commitname
```
+ Git Clone
把 Github 上的檔案完整給複製下來，可以在 Github 的右上角照到綠色的 Clone or Download 鍵，之後在終端打入 " git clone + 網址 "
就可以下載到本地，但要注意的是本地如果修改後是無法 Push 到不屬於自己的 repository 上面去的，解決的方式就是在 Github 上面再fork 一個檔案到自己得 repository 重新 clone 一次。



