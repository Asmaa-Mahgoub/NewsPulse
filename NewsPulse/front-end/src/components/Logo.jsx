import { NavLink } from "react-router-dom";
import VectorLogo from "../assets/VectorLogo.png";

function Logo() {
  return (
    <NavLink to="/">
      <img
        src={VectorLogo}
        alt="Logo"
        className="w-48 sm:w-64 lg:w-4/5 mx-auto"
      />
    </NavLink>
  );
}

export default Logo;
