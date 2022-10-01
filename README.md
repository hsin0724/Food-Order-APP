# Food-Order-APP

## 專案簡介
This is a Food Order App built with React. Customers can adjust the quantity of each meal and add the meals to their cart. They can also view the cart by clicking the cart button. Click the order button will show the user information form. This app uses Google Firebase as its backend server to fetch and post order data with HTTP request.  

這是一個使用 React 前端框架構建的點餐APP，並使用 Google Firebase 作為後端 Server 進行 fetch 和 post 訂單資料等 HTTP request。

> APP目前功能:  
* 選擇餐點數量並將餐點添加到購物車中。
* 查看購物出內容。
* 確認點餐並填寫買家訊息表單。
* 送出訂單資料至後端serve。  


> 正在開發功能:
* 輸入訂單時提供的買家資料即可查看訂單內容。
* 新增料理種類，選擇料理種類後介面只會顯示該種類之食物資訊。

## 專案展示
**新增餐點**  
使用者可選擇餐點數量並將餐點添加到購物車中。
![add](https://user-images.githubusercontent.com/67618752/193420113-45cd67d6-f246-4681-86a2-7fee062ddef9.gif)
<br>
<br>
**查看購物車**  
點擊 My Cart 按鈕查看購物車內容及金額，可從購物車內增加或刪減餐點數量。
![cart](https://user-images.githubusercontent.com/67618752/193420140-7400d681-eff0-4ed3-8ce1-034e9ea15082.gif)
<br>
<br>
**確認點餐 & 填寫買家訊息表單** 
使用者點擊 Order 按鈕後會出現表單請使用者填寫，送出資料前會進行表單驗證。
![order](https://user-images.githubusercontent.com/67618752/193420167-434840fe-fda4-40ed-865b-123f3ba1c89c.gif)  
<br>
<br>
**從後端serve查看訂單資料**  
開啟 Google Firebase 選擇專案後，從 Realtime Database 頁面可查看專案的所有資料。
![Screenshot_2](https://user-images.githubusercontent.com/67618752/193420880-df7e8e60-a785-4379-b85f-cf8ce10447c2.png)
![Screenshot_2](https://user-images.githubusercontent.com/67618752/193420820-2228d462-e6e6-44ad-b2c7-2fefd0da33ba.png)



## 專案執行
1. 執行 `git clone https://github.com/hsin0724/Food-Order-APP.git` 下載專案至本地端。
1. 執行 `npm install`安裝專案所需套件。
2. 執行 `npm start` 啟動專案，開啟瀏覽器前往 http://localhost:3000 訪問網頁。
3. 執行 `npm build` ，在 build 資料夾建立專案 production 版本。
4. 執行 `npm deploy` ，在 GitHub Pages 部屬專案網站。
