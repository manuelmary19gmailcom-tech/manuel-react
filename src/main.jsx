import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
<<<<<<< HEAD
import "bootstrap-icons/font/bootstrap-icons.css";
=======
<<<<<<< HEAD
import "bootstrap-icons/font/bootstrap-icons.css";
=======
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f

// CSS
import "./index.css";

// React App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Service Worker registration failed:",
          error
        );
      });
  });
}