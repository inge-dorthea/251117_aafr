import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-transparent sm:bg-red-200 md:bg-amber-200 lg:bg-green-200">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
