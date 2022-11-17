import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DetailDialog from "./routes/details/DetailDialog";
import MovieDetailsRoute from "./routes/details/MovieDetailsRoute";
import TvDetailsRoute from "./routes/details/TvDetailsRoute";
import SearchRoute from "./routes/search/SearchRoute";
import WelcomeRoute from "./routes/WelcomeRoute";
import Theme from "./theme/Theme";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Theme>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetailsRoute />} />
            <Route path="/tv/:id" element={<TvDetailsRoute />} />
            <Route path="/search/:query" element={<SearchRoute />} />
            <Route path="/search/:type/:query" element={<SearchRoute />} />
            <Route path="*" element={<WelcomeRoute />} />
          </Routes>
          {/* SYSTEM DIALOGS */}
          <DetailDialog />
        </Theme>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
