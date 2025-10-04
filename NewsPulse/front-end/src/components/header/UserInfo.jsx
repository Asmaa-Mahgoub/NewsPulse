import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";

function UserInfo() {
  const { isAuth, logout } = useAuth();

  const location = useLocation();

  return (
    <div className="group relative flex flex-col justify-center">
      <div className="hover:text-[var(--third-color)] transition-colors duration-300">
        <NavLink
          to="/userinfo"
          className={({ isActive }) =>
            `${isActive ? "text-[var(--third-color)]" : ""}`
          }
        >
          <FaUserCircle className="text-2xl sm:text-3xl" />
        </NavLink>

        {location.pathname !== "/userinfo" && (
          <div
            className="absolute top-[100%] right-1/2 translate-x-1/2 mt-2 w-[200px] md:w-[260px]
             bg-white shadow-xl rounded-xl p-4 text-xs md:text-sm text-stone-700
             opacity-0 group-hover:opacity-100 -z-10 group-hover:z-10 transition-all duration-300 ease-in-out
             border border-stone-200 font-semibold"
          >
            {isAuth ? (
              <div className="flex flex-col gap-3 text-xs md:text-sm">
                <div className="flex flex-col gap-1 border-b pb-2">
                  <p className="font-semibold text-stone-900">Mohamed</p>
                  <p className="text-stone-500 ">moh@gmail.com</p>
                </div>
                <Button
                  onClick={() => logout()}
                  color="bg-[var(--third-color)] hover:opacity-90"
                >
                  <NavLink to="/">Logout</NavLink>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-center">
                <p className="text-stone-500">Access your account to begin</p>
                <Button color="bg-[var(--third-color)] hover:opacity-90">
                  <NavLink to="/auth">Get Started</NavLink>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
