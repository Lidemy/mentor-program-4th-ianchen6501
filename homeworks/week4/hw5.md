## 請以自己的話解釋 API 是什麼
> API 全文是 Application Programming Interface ，是一個介面可以讓不同的端點之間互相連接溝通。舉例來說假設今天要投幣買一罐飲料，投幣機會提供不同的按鍵讓消費者選擇，API 就像是投幣機的按鍵，各個資訊網站會提供不同的 API 讓使用者使用串接來取得資訊。  
API 的組成主要有 url 及搭配的 header、method 等，因此要串接 API 時要先讀懂 API document ，知道要在 header 設定哪些資訊(如 client-key)，以及要取得不同資訊時要利用那些 method。

參考資料:
[API 實作(一)：規劃 RESTful API 要注意什麼](https://noob.tw/restful-api/)

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
### API football
1. 作用:  
可以取得足球比賽的相關資訊，如聯盟(leagues)、隊伍(teams)、各項數據(status)、時區(timezone)等。
2. url:  
大致有 demo 版和需要取得認證的方式(透過 rapidAPI)。  
demo - 'https://www.api-football.com/demo/v2/'  
authentication - 'https://api-football-v1.p.rapidapi.com/v2/'
3. header:  
透過認證的方式要在 header 加上 rapidAPI-key，如下  
"header" => [
  'X-RapidAPI-Key: XXXXXXXXXXXXXXXXXXXXXXXXX'
]
4. method:  
在 uri 後面加上 method 關鍵字，例如
'get("https://api-football-v1.p.rapidapi.com/v2/seasons")'
5. 資料來源:  
[API football](https://www.api-football.com)

### MAGICSEAWEED
1. 作用:  
可以取得全球各地主要的天氣、海象資訊及浪高等，幫助衝浪客判斷當日的浪況。
2. url:  
必須要先 email 到[官方](https://magicseaweed.com/developer/sign-up)取得 API key，接著可以透過更改 spot_id 的方式取得不同地點的衝浪資訊。
'http://magicseaweed.com/api/YOURAPIKEY/forecast/?spot_id=10'
3. header:  
不用另外設定 header。
4. error response:
```
{
  error_response: {
    code: 501,
    error_msg: "Invalid parameters were supplied and did not pass our validation, please double check your request."
  }
}
```
5. 資料來源:  
[MagicSeeweed](https://www.api-football.com)

### Cafe Nomad
1. 作用:  
可以取得台灣各城市的咖啡店資訊，包含店名、位置、有沒有限時及wifi等等。
2. url:  
無須透過認證直接發出 request 就可以。
'https://cafenomad.tw/api/v1.2/cafes'
3. header:  
不用另外設定 header。
4. method:  
在 url 末端加入城市名稱。  
5. 資料來源:  
[cafe nomad](https://cafenomad.tw/developers/docs/v1.2)


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Eating in Taiwan API Document for developer

#### 作用:  
消費者: 在這邊你可以查詢到全台灣的餐廳資訊，包含餐廳的名稱、營業時間、地點、容納人數等。  
餐廳業者: 在這邊你可以建立屬於你的餐廳資料，並藉此來推廣你獨特的餐廳。
#### url:  
'https://EatingInTaiwan.tw/api/v1/'
#### header:  
我們使用 api-key 來認證，所以請來信'EatingInTaiwan@org.com.tw'取得 api-key，並按照下列模板設定您的 header。
```
headers = {
    'api-key': "XxXxXxXxXxXxXxXxXxXxXxXx" //注意這邊必須輸入您專屬的 api key
}
```
#### method:  

|說明|method|path|參數|範例|  
|-|-|-|-|-|  
|取得餐廳資料|GET|/restaurants|_limit: 取得餐廳資訊的數量|/restaurants_?limit=20|  
|取得單一餐廳資料|GET|/restaurants/:ID|無|/restaurants/ID| 
|取得某地區的餐廳資料|GET|/restaurants/:location|無|/restaurants/taipei| 
|新增餐廳資料|POST|/restaurants/:ID|names:<br>time:<br>locations:<br>number_limit:|/restaurants/ID| 
|修訂餐廳資料|PUT|restaurants/:ID|names:<br>time:<br>locations:<br>number_limit:|/restaurants/ID| | 
|刪除餐廳資料|DELETE|restaurants/:ID|無|/restaurants/ID| 

#### 正確的 response
```
[{
name: XXX
time: YYY
location: ZZZ
number_limit: AAA
}]
```
#### error response
```
{
  error_response: {
    code: 400,
    error_msg: "Bad request, please double check your request."
  }
}
```
