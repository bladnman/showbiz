import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConnectionRoute from "./routes/Connection/ConnectionRoute";
import ShowViewRoute from "./routes/ShowView/ShowViewRoute";
import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

const routeList = [
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/connection",
    element: <ConnectionRoute />,
  },
  {
    path: "/show-view",
    element: <ShowViewRoute />,
  },
];
const router = createBrowserRouter(routeList);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
const ApContainer = styled(Stack)({
  color: "rgb(229, 229, 229)",
  backgroundColor: "#242424",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
export function Intro() {
  const [count, setCount] = useState(0);
  return (
    <ApContainer className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="/pig.png"
            className="logo react spin-reverse circle-frame"
            alt="Pig logo"
          />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react spin" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        {routeList.map((route) => (
          <>
            <a href={route.path}>{route.path}</a>
            <br />
          </>
        ))}
      </div>
    </ApContainer>
  );
}
