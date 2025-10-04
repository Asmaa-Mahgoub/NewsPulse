import { NavLink } from "react-router-dom";

function MainNav() {
  const categories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <ul className="md:flex w-[96%] lg:w-[80%] justify-between md:justify-evenly mx-auto">
      <li className="categoriesLink" key="general">
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `${isActive ? "third-color font-bold" : ""} capitalize`
          }
        >
          general
        </NavLink>
      </li>
      {categories &&
        categories.map((cat) => (
          <li className="categoriesLink" key={cat}>
            <NavLink
              to={`/categorypage/${cat}`}
              className={({ isActive }) =>
                `${isActive ? "third-color font-bold" : ""} capitalize`
              }
            >
              {cat}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}

export default MainNav;
