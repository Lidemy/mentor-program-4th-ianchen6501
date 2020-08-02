## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
## &lt;audio&gt; <br>
1. 用來撥放音樂檔案的標籤，可以接受的檔案模式有 Mp3、WAV、OGG等
2. 語法範例
```
<audio autoplay>
  <source src='music.mp3' type='audio/mp3'>
</audio>
```
3. &lt;audio&gt;不同的屬性設定 :  
autoplay 網頁開啟時會自動撥放  
controls 音訊操控介面  
loop 循環播放  
muted 靜音  
preload 網頁載入時音訊也一併載入  
url 檔案的網址

## &lt;sub&gt; <br>
1. 用來顯示下標文字(ps: sup用來顯示上標文字)
2. 語法範例
```
<p>this is a <sub>subscript</sub> text.</p>
```

## &lt;ruby&gt;<br>
1. 用來顯示旁註標記，常用在中文的注音、日文的漢字註釋等
2. &lt;ruby&gt; 要搭配 &lt;rt&gt; &lt;rp&gt; 來使用，&lt;rt&gt; 裡面放註釋，&lt;rp&gt; 裡面放如果瀏覽器不支援 &lt;ruby&gt; 的話要顯示的內容。
3. 語法範例
```
<ruby>
天<rt>ㄊㄧㄢ</rt>
</ryby>
```
## 請問什麼是盒模型（box modal）
1. box model 的作用方式會受到 box-sizing 的設定所影響。
2. box-sizing  
box-sizing 預設為 content-box，所以在計算盒子尺寸時，必須把 content、padding、border 的尺寸加起來才是正確的盒子尺寸，而 box-sizing 提供了另外的 border-box 設定，當我們在預設為 border-box 時我們設定的 height 跟 width 會成為盒子的最終尺寸，而 padding 和 border 的設定長度不會改變盒子的尺寸，系統會自行往盒子內生長。
3. 盒模型(box model)定義  
html 的版面其實都是由不同的元素組合而成(圖片、文字、色塊...)，而不同元素都可以當作一個盒子(box)有各自的長寬尺寸，而為了定義不同盒子的內容大小、周邊尺寸和排版需求，所以出現了盒模型來定義盒子的相關尺寸名稱。盒模型可以分為 content、padding、border、margin 等四種不同尺寸。  
**content**: 自行設定的 height 或 width 尺寸，如果沒有設置就是文字或圖片本身的尺寸。  
**padding**: 盒子中內容物與盒子周邊界線的淨尺寸，用 padding 時ㄧ般會把整個盒子給撐開，所以要計算實際寬高時，需要把 content + padding 的尺寸算出來才是實際尺寸。  
**border**: border 的位置是在 padding 和 content 的外圍增加一圈範圍出來，border 可以選擇不同的 type ，如實線、虛線等，在使用 border 時要注意 box-sizing 的設定是 預設的 content-box 還是 border-box。  
**margin**:用來設定盒子與周邊元素的距離，通常是透明的。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
**display** 是指顯示模式，每一個 html 標籤都會有預設的顯示模式，大部分可分為inline、block 跟 inline-block，相關特性如下:

|屬性|block|inline|inline-block|
|-|-|-|-|
|可否同行並列|X|O|O|
|寬度 width|撐到最大<br>占滿所有寬度|不可設定寬度<br>寬度由內容決定|可以設定寬度<br>同時會影響其他元素|
|高度 height|可以設定高度<br>同時會影響其他元素|同寬度|可以設定高度<br>同時會影響其他元素|
|外邊距 margin|可以設定外邊距<br>同時會影響其他元素|可以設定但ㄧ般對周邊元素沒有作用<br>設定 margin-left/margin-right 對兩邊的<br>inline元素會以有影響<br>當有設定 border 時可以看到 margin 的<br>範圍會覆蓋其他元素|可以設定<br>同時會影響其他元素|
|內邊距 padding|可以設定內邊距<br>同時會影響其他元素|同 margin|可以設定內邊距<br>同時會影響其他元素|
|標籤 label|&lt;article&gt;、&lt;header&gt;、&lt;footer&gt;、&lt;h1~h6&gt;、&lt;ol&gt;、&lt;form&gt;、&lt;p&gt;等|&lt;a&gt;、&lt;span&gt;、&lt;script&gt;、&lt;iframe&gt;等||



## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
**position** 是用來設定元素的定位方式，目前有 static(default)、absolute、fixed、relative、sticky 等方式。相關的特性如下:  
1. **static** 預設的定位模式，會依照 html 的文件流依序排列
2. **relative** 相對定位，元素會以自己的原始位置作為參考點做定位
3. **absolube** 絕對定位，元素會對上ㄧ個不是設定為 static 的元素作為參考點來做定位
4. **fixed** 相對於瀏覽器(viewport)做定位，所以不管網頁如何上下捲動，元素位置都不會改變
