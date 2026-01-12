import { GiBottleVapors } from "react-icons/gi";
import { CiMenuBurger } from "react-icons/ci";
import { useAppContext } from "../AppContext";
import DisktopMenu from "./DisktopMenu";

const NavBar = () => {
  const { showMobile, setShowMobile } = useAppContext();

  return (
    <div
      className="nav-bar"
      onClick={() => {
        if (showMobile) {
          setShowMobile(false);
        }
      }}
    >
      <div className="menu">
        <p className="mobile" onClick={() => setShowMobile(!showMobile)}>
          <CiMenuBurger />
        </p>
        <div className="disk">
          <DisktopMenu />
        </div>
      </div>
      <p className="title">Evaporation Rate</p>
      <div className="logo">
        <GiBottleVapors />
      </div>
    </div>
  );
};

export default NavBar;
