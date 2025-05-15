import React from "react";
import { createRoot } from "react-dom/client";
import PriceMyRide from "../components/PriceMyRide.jsx";

// Mount widget when page fully loads
window.addEventListener("load", () => {
  if (document.getElementById("boat-chat-container")) return;

  const container = document.createElement("div");
  container.id = "boat-chat-container";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<PriceMyRide />);
});
