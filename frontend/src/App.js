import React from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Chat />
      </main>
    </div>
  );
}

export default App;
