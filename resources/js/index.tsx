import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { getIsDarkMode } from './redux/appSelector';
//@ts-ignore
const theme =createTheme({
  palette: {
    // mode: "dark",
    // background: {
    //   default: "#3a2524",
    //   paper: "#46505A",
    // },
    // //@ts-ignore
    // fpage: {
    //   main: "#EF8B6B",
    //   light: "#262335",
    // },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
