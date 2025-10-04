import { NavLink } from "react-router-dom";
import Button from "../components/Button";

function PageNotFound() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-7xl md:text-9xl font-bold text-[var(--third-color)]">
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-stone-800">
        Oops! Page not found
      </h2>
      <p className="text-stone-500 max-w-md">
        The page you are looking for doesn’t exist or has been moved. Don’t
        worry, you can head back to the home page.
      </p>

      <Button color="bg-[var(--third-color)] hover:opacity-90">
        <NavLink to="/" className="text-base md:text-lg">
          Go Home
        </NavLink>
      </Button>
    </section>
  );
}

export default PageNotFound;
