import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FindByIdRoute from "./routes/FindByIdRoute";
import MovieTesterRoute from "./routes/MovieTesterRoute";
import SearchRoute from "./routes/SearchRoute";
import TvTesterRoute from "./routes/TvTesterRoute";
import WelcomeRoute from "./routes/WelcomeRoute";
import Theme from "./theme/Theme";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Theme>
          <Routes>
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
        </Theme>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
