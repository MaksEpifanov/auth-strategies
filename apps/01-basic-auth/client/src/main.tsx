import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(elem).render(app);
