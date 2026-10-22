import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  autoRefreshEvents: "DOMContentLoaded,load,resize"
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.ticker.sleep();
  } else {
    setTimeout(() => gsap.ticker.wake(), 50);
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
