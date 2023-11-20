import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { store, persistor } from "./redux/store/store";

// ReactDOM.render 18에서 더 이상 지원하지 안함.
// 아래와 같이 수정.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </CookiesProvider>
  </Provider>
);

// App 시작부분
// StrictMode 반응이 추가 검사를 수행함을 의미 (보고서에 대한 경고가 있으면 콘솔에 경고를 표시.)
// ReactDOM.render(
//   <React.StrictMode>
//     {/* <ContextProvider> */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     {/* </ContextProvider> */}

//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
