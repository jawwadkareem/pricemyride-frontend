import React from "react";
import { createRoot } from "react-dom/client";
import PriceMyRide from "../components/PriceMyRide.jsx";

window.addEventListener("load", () => {
  if (document.getElementById("boat-chat-container")) return;

  const container = document.createElement("div");
  container.id = "boat-chat-container";
  document.body.appendChild(container);

  // Prevent body scroll
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";

  const root = createRoot(container);
  root.render(<PriceMyRide />);
});