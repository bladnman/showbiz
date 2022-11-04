import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import React, { useState } from "react";

export default function WelcomeRoute() {
  return <Intro />;
}

const AppContainer = styled(Stack)({
  color: "rgb(229, 229, 229)",
  backgroundColor: "#242424",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
export function Intro() {
  return (
    <AppContainer className="App">
      <div>
        <img
          src="/pig.png"
          className="logo react spin-reverse circle-frame"
          alt="Pig logo"
        />
        <img
          src="/pig.png"
          className="logo react spin circle-frame"
          alt="Pig logo"
        />
        <img
          src="/pig.png"
          className="logo react spin-reverse circle-frame"
          alt="Pig logo"
        />
        <img
          src="/pig.png"
          className="logo react spin circle-frame"
          alt="Pig logo"
        />
      </div>
      <h1>Welcome</h1>
    </AppContainer>
  );
}
