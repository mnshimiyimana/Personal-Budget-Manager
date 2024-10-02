import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux"; 
import store from "./store/store"; 
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles.css";
import AntdConfig from "./config/antdConfig";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <AntdConfig>
          <App />
        </AntdConfig>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();