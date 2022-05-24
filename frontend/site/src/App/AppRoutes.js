import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
 
function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suche" element={<Suche />} />
      </Routes>
    </div>
  );
}