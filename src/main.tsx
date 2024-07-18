import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from './App';
import { store } from "./frontoffice/app/store";


import 'swiper/css/bundle';
import './frontoffice/assets/css/boxicons.min.css';
import './frontoffice/assets/css/navbar.css';
import "./frontoffice/assets/styles/index.scss";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);