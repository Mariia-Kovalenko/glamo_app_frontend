import React from "react";
import ReactDOM from "react-dom";  // Import from 'react-dom' instead of 'react-dom/client'
import "./styles/_global.scss";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")  // Use ReactDOM.render here
);
