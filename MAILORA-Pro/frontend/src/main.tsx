import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { createMailoraTheme } from "./theme/theme";
import App from "./App";
import "./styles/global.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Provider store={store}><ThemeProvider theme={createMailoraTheme("dark")}><CssBaseline/><BrowserRouter><App/></BrowserRouter></ThemeProvider></Provider></React.StrictMode>
);
