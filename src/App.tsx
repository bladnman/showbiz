import React from "react";
import "./App.css";
import AppLoading from "./features/app/apploading/AppLoading";
import AppProvider from "./features/app/appprovider/AppProvider";
// import MainUI from "./features/MainUI";
import useAppInitializer from "./hooks/useAppInitializer";

const LazyMainUI = React.lazy(() => import("./features/MainUI"));

function App() {
  const isInitialized = useAppInitializer();

  const renderUI = () => {
    // LOADING
    if (!isInitialized) {
      return <AppLoading />;
    }

    // APP UI
    // return <MainUI />;
    return <LazyMainUI />;
  };

  return (
    <React.StrictMode>
      <AppProvider>{renderUI()}</AppProvider>
    </React.StrictMode>
  );
}

export default App;
