import React from "react";
import { useAppContext } from "../AppContext";

const DisktopMenu = () => {
  const { isHome, setIsHome, showMobile, setShowMobile } = useAppContext();
  return (
    <div className="disk-show">
      <p
        className={`${isHome ? "active" : ""}`}
        onClick={() => {
          setIsHome(true);
          if (showMobile) {
            setShowMobile(false);
          }
        }}
      >
        Home
      </p>
      <p
        className={`${!isHome ? "active" : ""}`}
        onClick={() => {
          setIsHome(false);
          if (showMobile) {
            setShowMobile(false);
          }
        }}
      >
        Weather forecast
      </p>
    </div>
  );
};

export default DisktopMenu;
