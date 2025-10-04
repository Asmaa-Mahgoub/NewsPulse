import { Outlet } from "react-router-dom";
import SideBar from "../components/adminDashboard/SideBar";
import DateItem from "../components/DateItem";
import HeaderUtilityBar from "../components/header/HeaderUtilityBar";
import Menu from "../components/header/Menu";
import UserInfo from "../components/header/UserInfo";
import Header from "../layouts/Header";
import { useState } from "react";
import { FaCaretSquareRight } from "react-icons/fa";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="h-screen px-2 flex flex-col">
      {/* ====== Header ====== */}
      <Header>
        <HeaderUtilityBar>
          <DateItem />
          <div className="flex justify-center gap-6 md:gap-8">
            <UserInfo />
            <Menu />
          </div>
        </HeaderUtilityBar>
      </Header>

      {/* ====== Main Layout ====== */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 top-[127px]  w-auto bg-white shadow-lg transform transition-transform duration-300
            md:static md:translate-x-0 md:shadow-none
            ${isOpen ? "translate-x-0 z-40" : "-translate-x-full"}
          `}
        >
          <SideBar />
        </aside>

        {/* Overlay في الموبايل */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border rounded cursor-pointer"
        >
          <FaCaretSquareRight />
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-stone-200">
          <h1 className="text-2xl font-bold third-color">Admin Dashboard</h1>
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default AdminPage;
