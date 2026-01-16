//* import
// react
import { Outlet } from "react-router";

// components
import Header from "./Header";
import Footer from "./Footer";

//* component
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
