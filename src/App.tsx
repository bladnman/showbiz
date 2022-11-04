import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieRoute from "./routes/Movie/MovieRoute";
import WelcomeRoute from "./routes/WelcomeRoute/WelcomeRoute";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/movie/:id" element={<MovieRoute />} />
          <Route path="*" element={<WelcomeRoute />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
