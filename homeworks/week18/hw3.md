## 什麼是反向代理（Reverse proxy）？
proxy 就是代理伺服器的意思，代理伺服器就是 client-side 和 server-side 的一個中間層，依據代理的對象不同又可以分為正向代理(Forward Proxy/client-side) 與反向代理(Reverse Proxy/server-side)兩種不同的代理伺服器，反向代理的功用主要包含:
1. 代理多個不同伺服器或服務，讓一個 ip 能夠同時有多種不同服務
2. 過濾 request，阻擋不符合規範的請求或攻擊
3. Load balancing : 當 request 進來的時候，proxy server 可以指定比較有空閒的 server 去處理
4. Caching : 可以先把固定的 response 存進 cache，降低後端伺服器的負擔
5. 可以用來統計 request
6. 可以用來測試新功能或讓功能逐步上線，例如可以分配諸如 10% 的使用者來執行 Carnary development，在獲得反饋的同時降低對整體的影響。
7. 可以在使用者無法察覺的狀況下，更改 service port

## 什麼是 ORM？
Object-Relational Mapping (ORM)是一種將關聯式資料庫與物件相互映射的技術，讓工程師可以透過操作物件的方式來操作資料庫，避免撰寫重複的 sql 程式碼。通常不同的框架都會有附帶的 ORM 程式庫，例如 Ruby on Rails 就內建了 Active Record。ORM 的優點與缺點大致如下:
- 優點
1. 可以一定程度防止 sql injection，通常越成熟的 ORM 程式庫防範的越好
2. 避免大量撰寫 sql 及重複的程式碼
3. 方便轉移資料庫，當轉移資料庫的時候只要修改物件的映射就行了
- 缺點
1. 犧牲性能
2. 進行複雜查詢還是需要 sql 指令的協助

## 什麼是 N+1 problem？
n+1 problem 指的是一種無效率的資料庫檢索狀態，例如假設今天我們有一個 ``cities`` 的欄位，裡面有許多 city ，每個 city 又有不同的屬性包含 name、area...等，如果我們要搜尋的是符合某個 area 的 city，我們可能會寫出下列的程式碼 
```js
forEach(cities as city) {
  city.findAll({where : { name : ...}})
}
```
那實際上 sequelize 執行的方式可能會是:
```js
select * from cities  //把所有的 city 先找出來，總共有 n 個，這也是 n+1 的由來
select * from city1 where name = ...
select * from city2 where name = ...
select * from city3 where name = ...
```
而這邊的狀況會造成大量的檢索行為，而因為在資料庫的執行中，一筆指令搜尋多個物件會來的比多筆搜尋一個物件的狀況來的有效率，所以 n+1 query 會造成低效率的狀況。為了要解決 n+1 problem 我們可以透過 eager loading 的方式，eager loading 的原理是先把所有我們要檢索的資料預先加載，避免後續的 n 串檢索行為。而在 sequelize 中就是利用 include 會一併連同 associated table 一起檢索的特性，來解決 n+1 problem。
```js
city.findAll({
  include: cities,
  where : {
    name : ...
  }
})
```
### reference
[系統設計 - 正向代理跟反向代理](https://www.jyt0532.com/2019/11/18/proxy-reverse-proxy/)  
[SQL三部曲:你不需要ORM](https://tecky.io/en/blog/SQL三部曲:你不需要ORM/)  
[What is the meaning of the N + 1 Problem?](https://laracasts.com/discuss/channels/general-discussion/what-is-the-meaning-of-the-n-1-problem)