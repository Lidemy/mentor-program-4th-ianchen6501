## Webpack 是做什麼用的？可以不用它嗎？
webpack 是一個 module bundler ，可以同時打包 javascript、CSS、圖片等，並在打包的過程進行 babel、uglify、compile CSS 等處理。
因為現在的網站越發複雜，為了可以在瀏覽器進行模組化開發，就需要 webpack 的協助。本來在瀏覽器時因為不能使用 require / export 等語法，所以透過 webpack 我們可以
使用引用的語法，並透過 webpack 打包成一個檔案，而這個檔案就可以用瀏覽器來開啟。
所以其實我們也可以不用 webpack ，直接在瀏覽器裡用 javascript 引用，但這會花費網路資源，並導致比較長的載入時間，同時也會有瀏覽器支援度的問題。


## gulp 跟 webpack 有什麼不一樣？
gulp 是用來把任務自動化，所以需要透過其他 pluging 來達成各種任務，gulp 本身無法做像 babel 轉換、CSS compile 等事情，但我們可以透過 gulp 來為這些任務設定處理流程等。
webpack 則是一個純粹的打包器(bundler)，可以透過把各種資源引入來達成我們需要的功能，並最後打包為瀏覽器可以執行的檔案。

## CSS Selector 權重的計算方式為何？
- 權重分層原則:  
權重大原則會分成 5 層，!important -> inline style -> ID -> class(pseudo-class) / attribute -> element。
- 權重計分方式:  
依照 selector 每一層出現的次數分別加總，例如 style="" 是屬於 inline style 所以權重就會計算為 0-1-0-0-0、#name input[type=""] 包含 id、element、attribute 權重就會是 0-0-1-1-1。
- 權重比較方式:  
1. 先看層數高的部分是否有取分，例如上面兩個例子 inline style 的權重就會大於 #name input[type=""]。
2. 取分的層級一樣高時，看該層的取分來決定，例如 li:nth-of-type(3n) li (0-0-0-1-2) 的權重會大於 li[attr] (0-0-0-1-1)
3. 當層數及取分都相同時，在看取分的項目，大原則是 attribute 的權重會大於 class(pseudo-class)。

參考資料:  
[前端中階：webpack](https://medium.com/@hugh_Program_learning_diary_Js/前端中階-webpack-b2c1f5ab7d2)  
[Webpack Tutorial 繁體中文 Gitbook](https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/)  
[強烈推薦收藏好物 – CSS Specificity (CSS 權重一覽)](https://muki.tw/tech/css-specificity-document/)