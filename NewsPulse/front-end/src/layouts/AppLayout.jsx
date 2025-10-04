import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HeaderUtilityBar from "../components/header/HeaderUtilityBar";
import Logo from "../components/Logo";
import MainNav from "../components/header/MainNav";
import DateItem from "../components/DateItem";
import SearchBar from "../components/header/SearchBar";
import UserInfo from "../components/header/UserInfo";
import Menu from "../components/header/Menu";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col flex-1 mx-auto px-2 text-color">
      <Header>
        <HeaderUtilityBar>
          <DateItem />

          <div className="order-3 lg:order-0 w-full lg:w-[64%] flex justify-center py-1">
            <SearchBar />
          </div>

          <div className="flex justify-center gap-6 md:gap-8">
            <UserInfo />
            <Menu />
          </div>
        </HeaderUtilityBar>

        <div className="border-b-2 py-4 md:py-6 flex justify-center">
          <Logo />
        </div>

        <div className="hidden md:block py-2 border-b-4">
          <MainNav />
        </div>
      </Header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
