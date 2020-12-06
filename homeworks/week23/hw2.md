## 為什麼我們需要 Redux？

1. **Redux 幫助我們集中管理 state**  
   當專案變得複雜的時候，所以我們得同時管理多個 state，但當 state 的數量變的龐大，會十分難以新增或修正既有功能或 debug，而在 redux 中，所有的 state 統一在 store 裡面管理，而要更改 state 唯一的辦法就是透過 action。這樣子的結構讓 Redux 得以解決 state 繁複不好管理的問題，也可以避免大多數的 race condition。
2. **Redux 可以透過管理 global state 及 selector 來解決 prop drilling 的問題**
3. **Redux 提供 React-Redux / React ToolKit / React devtool 等工具**  
   其中 React-Redux，提供了諸如 connect 等工具來幫助 React 與 Redux 串接。React devtool 可以觀看 state、action 等的狀態，也可以做到 time travel 來觀察各個步驟的狀態。

---

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

### Redux 是什麼？

Redux 是一個狀態容器(狀態管理工具)，可以用來使用在 JavaScript App 上面。

### Redux 的各個元件 :

1. **action**  
   action 是一個單純的 JavaScript Object，作用是發到 store 裡面去更改 state。action 必須要帶上一個 type key(通常是 string)，讓 store 根據 action type 來決定對應的 reducer。

```js
//action
{
  type: 'actionType',
  payload: {...}
}
```

- actionTypes  
  當 action 的數量變多，為了管理方便及避免打錯字，會額外用一個 actionTypes.js 的檔案來管理 action。透過 actionTypes 可以在我們打錯字的時候提醒我們，如果沒有透過 actionTypes，系統不會報錯。

```js
//actionTypes
const ACTION_TYPE = "actionType";
```

- action creator  
  除了直接傳 action 給 store，我們也可以透過 action creator 來產出 action 並傳給 store。

```js
//action creator
fucntion actionCreator(value) {
  return {
    type : ACTION_TYPE,
    payload : {
      value,
      ...
    }
  }
}
```

2. **reducer**  
   一個接受 state、action 並回傳新的 state 的函式，reducer 會根據傳入的 action type 來執行相對應的處理。如果傳入的 action type 沒有對應的處理方式會回傳 default。
   reducer 應該盡量維持 pure function 的狀態。所以應該避免引用 reducer 以外的參數、call API 等。

```js
//reducer
const initialState = {...}
function myReducer(state = initialState, action) {
  switch(action.type) {
    case ACTION_TYPE :
      return {...handledState}
      ...
    default
      return state
  }
}
```

- combineReducers  
  我們可以把不同用途的 reducers 拆分成不同的檔案管理，再用 combineReducers 把不同 reducer 整合成一個 rootReducer。

```js
const myApp = combineReducers({
  todos,
  users,
});
```

注意上面的 code 其實就等同於

```js
const myApp = function(state={}, action) {
  return {
    todos(state.todos, action)
    users(state.users, action)
}
```

3. **store**  
   store 是一個保存 state 的容器，每個 app 都只有唯一的一個 store。
   我們可以透過 redux 提供的方法來新增、獲取或修改 state。

- createStore  
  透過 `const store = createStore(rootReducer)` 可以在 App 初始化 store ，並把 reducers 與 store 結合，後續就可以處理不同的 action。

- getState  
  獲取當前的 state。

- dispatch  
  更改 state 的唯一方式，可以透過 `dispatch(action)` 來更改 state。

- subscribe  
  對 store 添加一個 lister，每一次 dispatch 執行 action 時都會被呼叫。
  可以搭配 getState 來獲得最新的 state。

### Redux 的資料流

**Redux 的資料流是 one way flow 的形式，會依序由 `action -> store -> reducer -> UI -> action ...`的方向來傳遞及變更 state**

**initial setup :**

1. 在這個階段 createStore 會創造一個 store 及內部的 rootReducer。
2. 接著 rootReducer 會用 initialState run 第一次，並把 return 的 state 傳給 store 範圍內的 UI render。
3. UI 拿到 state 後會進行第一次 render，後續也會持續監測 state 的變動。

**Updates :**

1. 當使用者觸發事件，dispatch 會發出 action。
2. store 裡面的 rootReducer 接到 action，根據 action type 來給相對應的 reducer 處理。
3. reducer return 更新的 state 並通知相關的 UI 元件。
4. UI 與之前的 state 比對並決定要 re-render 的部分。
5. UI re-render。

---

## 該怎麼把 React 跟 Redux 串起來？

1. **connect method**

- mapStateToProps  
  把 store state 傳到 presentational component 作為 props 使用。

```js
const mapStateToProps = (store) => {
  return {
    state: store.state,
  };
};
```

- mapDispatchToProps  
  接受 dispatch 回傳 dispatch action，可以用來置入 presetational component 讓 component 能 dispatch action

```js
// mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return onClick : (
    value) => {
      dispatch(action(value))
    }
}
```

- connct  
  把 mapStateToProps 及 mapDispatchToProps 與 presentational component 連結

```js
// connect to Store
const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// connect to presentational component
const connectToComponent = connectToStore(component);
// 上面也可以結合為
const connectToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);
```

2. **hooks method**  
   除了用 connect 來連結 React 跟 Redux 之外，也可以透過 React-Redux 提供的 hooks 來綁定

- useSelector  
  可以篩選到需要的 store 裡面的 state

```js
const selectState = useSelector((store) => store.State);
```

- useDispatch  
  可以在 component 裡直接 dispatch action

```js
const dispatch = useDispatch;
...
<div event(() => dispatch(action)) />
```
