import { NavLink } from "react-router-dom";
import VectorLogo from "../assets/VectorLogo.png";

function Footer() {
  return (
    <footer className="border-t-4 pt-8">
      <div className="border-b-2 py-2">
        <NavLink to="/">
          <img src={VectorLogo} alt="logo" className="w-48" />
        </NavLink>
      </div>

      <div>
        <p></p>
      </div>
    </footer>
  );
}

export default Footer;
