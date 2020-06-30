## 交作業流程

1. 把作業的檔案從 Gitup classroom 上面 clone 下來。
```
Git clone + 網址
```
2. 在作業的資料夾裡面開一個新的 branch 例如 "HW_week_1"
```
Git branch HW_week_1 
```
3. 編寫作業完成後，把作業 add + commit 到 HW_week_1 這個 branch裡
```
Git commit -am "description"
```
4. 把作業 push 到 Github repository。
```
Git push origin HW_week_1
```
5. 進入 Pull request 頁面，並 create pull request(在過程中也可以發表感想或問題)。完成後就複製網頁代碼取得 PR (pull request) 的連結，並至作業系統的作業列表上傳作業，點選"新增作業"並貼上 PR 連結送出。

6. 接下來就是等助教來批改作業，助教批改完作業後，就會 Merge 作業至 master 並刪除遠端的 branch。

7. 當作業批改完後，因為 local 端的 branch master 還在未更改的狀態，所以得把 Github branch master pull 到 local端。
```
git checkout master
git pull origin master
```
8. 最後再把 local 的 branch HW_week_1 給刪除，就完成一次完整的交作業與批改的流程了:)
```
git branch -d HW_week_1
```