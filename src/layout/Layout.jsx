import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#e6ffec]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
