import React from "react";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main>
      <div><Toaster/></div>
      <AppRouter/>
    </main>
  );
};

export default App;
