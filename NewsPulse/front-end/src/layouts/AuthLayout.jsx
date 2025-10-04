import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <section className="h-screen flex flex-col justify-center  bg-gradient-to-b from-[var(--main-color)] to-white]">
      <main className="w-full flex justify-center">
        <Outlet />
      </main>
    </section>
  );
}

export default AuthLayout;
