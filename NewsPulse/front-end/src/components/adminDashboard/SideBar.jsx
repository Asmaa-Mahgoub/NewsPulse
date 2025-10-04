import { NavLink } from "react-router-dom";
import Logo from "../Logo";

function SideBar() {
  return (
    <aside className="h-full rounded-r-md w-48 lg:w-56 bg-stone-200 border-2 border-black  flex flex-col gap-8 py-4">
      <div className="w-[80%] mx-auto pt-2">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 px-2">
        <NavLink
          to="/adminpage/homedashboard"
          className={({
            isActive,
          }) => `flex items-center gap-3 px-4 py-2 text-sm md:text-base rounded-md hover:text-white hover:bg-[var(--third-color)] transition-all duration-300
              ${isActive ? "bg-[var(--third-color)] font-semibold text-white" : " "}`}
        >
          Home Dashboard
        </NavLink>

        <NavLink
          to="/adminpage/articlesdashboard"
          className={({
            isActive,
          }) => `flex items-center gap-3 px-4 py-2 rounded-md hover:text-white hover:bg-[var(--third-color)] transition-all duration-300
              ${isActive ? "bg-[var(--third-color)] font-semibold text-white" : " "}`}
        >
          Articles
        </NavLink>

        <NavLink
          to="/adminpage/authordashboard"
          className={({
            isActive,
          }) => `flex items-center gap-3 px-4 py-2 rounded-md hover:text-white hover:bg-[var(--third-color)] transition-all duration-300
              ${isActive ? "bg-[var(--third-color)] font-semibold text-white" : " "}`}
        >
          Author
        </NavLink>
      </nav>
    </aside>
  );
}

export default SideBar;
