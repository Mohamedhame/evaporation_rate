import NavBar from "./components/NavBar";
// import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Forecast from "./components/Forecast";
import { useAppContext } from "./AppContext";
import DisktopMenu from "./components/DisktopMenu";
function App() {
  const { isHome, showMobile } = useAppContext();

  return (
    <>
      <NavBar />
      {isHome ? <HomePage /> : <Forecast />}
      <div className={`${showMobile ? "show-mobile" : "hidden"}`}>
        <DisktopMenu />
      </div>
    </>
  );
}

export default App;
