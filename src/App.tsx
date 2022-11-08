import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieRoute from "./routes/Movie/MovieRoute";
import WelcomeRoute from "./routes/WelcomeRoute/WelcomeRoute";
import MovieTesterRoute from "./routes/MovieTester/MovieTesterRoute";
import TvTesterRoute from "./routes/TvTester/TvTesterRoute";
import SearchRoute from "./routes/SearchRoute/SearchRoute";
import FindByIdRoute from "./routes/FindByIdRoute/FindByIdRoute";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/movie_hold/:id" element={<MovieRoute />} />
          <Route path="/movie/:id" element={<MovieTesterRoute />} />
          <Route path="/tv/:id" element={<TvTesterRoute />} />
          <Route path="/search/:query" element={<SearchRoute />} />
          <Route path="/search/:type/:query" element={<SearchRoute />} />
          <Route
            path="/find_by_id/:externalSource/:id"
            element={<FindByIdRoute />}
          />
          <Route path="*" element={<WelcomeRoute />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
