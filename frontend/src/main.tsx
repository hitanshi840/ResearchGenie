import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 2500,

        style: {
          background: "#0f172a",
          color: "#ffffff",
          border: "1px solid #1e293b",
          borderRadius: "12px",
        },

        success: {
          iconTheme: {
            primary: "#06b6d4",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  </StrictMode>
);