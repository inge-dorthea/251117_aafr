//* import
// functionality
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router";

// icons
import { BsList } from "react-icons/bs";

//* component
const Header = () => {
  //* om os-undermenu - const to find out if the submenu should be shown (only on desktop)
  const showSubMenu = useLocation().pathname; // showSubMenu = the location of the user

  //* start med lukket burger menu på hver side
  useEffect(() => {
    setShowBurger(false);
  }, [showSubMenu]); // showSubMenu changes each time the user changes location

  const [showBurger, setShowBurger] = useState(false);

  //* menu (not used in submenu)
  const menuItems = [
    { name: "Om os", path: "/raadgiverne" },
    { name: "Nyheder", path: "/nyheder" },
    { name: "Kontakt", path: "/kontakt" },
  ];

  //* om os-undermenu (used in submenu and burgermenu)
  const subMenuItems = [
    { name: "Om rådgiverne", path: "/raadgiverne" },
    { name: "Vores samarbejde", path: "/samarbejde" },
    { name: "Vores pædagogiske tilgang", path: "/paedagogisk-tilgang" },
  ];

  //* return
  return (
    <header className="bg-[#87d6998f]">
      <nav className="sm:w-[90vw] md:w-[80vw] lg:w-[65vw] mx-auto pt-4">
        <menu className="flex flex-col sm:grid grid-cols-4 sm:gap-7">
          {/* logo v */}
          <li className="w-[45vw] mx-auto sm:w-full text-center size-full rounded-full hover:bg-gray-500/5">
            <NavLink to="/" title="Forside">
              <figure>
                <img src="/logo-2.png" alt="Åben Forældrerådgivnings logo" />
              </figure>
            </NavLink>
          </li>
          {/* logo ^ */}
          {/* burger v */}
          <li className="text-6xl flex justify-end mr-4 sm:hidden">
            <button
              onClick={() => setShowBurger(showBurger ? false : true)}
              className="hover:cursor-pointer hover:text-green-800"
            >
              <BsList />
            </button>
          </li>
          {/* burger ^ */}
          {/* menu v */}
          {menuItems.map((item, index) => (
            <div key={index} className="hidden sm:block">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#87d69959] size-full rounded-full flex flex-col justify-center hover:bg-[#ffb75f8f] hover:shadow-lg"
                    : "bg-[#ffb75f] size-full rounded-full flex flex-col justify-center hover:bg-[#ffb75f8f] hover:shadow-lg"
                }
              >
                <li
                  className={`text-center sm:text-xl md:text-2xl lg:text-3xl font-semibold`}
                >
                  {item.name}
                </li>
              </NavLink>
            </div>
          ))}
          {/* menu ^ */}
        </menu>
        {/* submenu v */}
        <menu className="sm:flex justify-evenly h-[50px] hidden">
          {/* if showSubMenu = these three locations v it will show */}
          {(showSubMenu == "/raadgiverne" ||
            showSubMenu == "/samarbejde" ||
            showSubMenu == "/paedagogisk-tilgang") &&
            subMenuItems.map((item, index) => (
              <li
                key={index}
                className="sm:text-md lg:text-xl my-auto hover:underline underline-offset-8"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "underline underline-offset-8" : ""
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </menu>
        {/* submenu ^ */}
        {/* burgermenu v */}
        {showBurger && (
          <menu className="flex flex-col gap-2 text-end mr-6 text-lg sm:hidden pb-5">
            {/* om os replaced by sub menu v */}
            {subMenuItems.map((item, index) => (
              <li key={index} className="hover:underline underline-offset-8">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "underline underline-offset-8" : ""
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="hover:underline underline-offset-8">
              <NavLink
                to={menuItems[1].path}
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-8" : ""
                }
              >
                {menuItems[1].name}
              </NavLink>
            </li>
            <li className="hover:underline underline-offset-8">
              <NavLink
                to={menuItems[2].path}
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-8" : ""
                }
              >
                {menuItems[2].name}
              </NavLink>
            </li>
          </menu>
        )}
        {/* burgermenu ^ */}
      </nav>
    </header>
  );
};

export default Header;
