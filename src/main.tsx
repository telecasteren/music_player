import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./app/app-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import "./css/App.css";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppWrapper />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
