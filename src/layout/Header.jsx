import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { BsList } from "react-icons/bs";
import { useLocation } from "react-router";

const Header = () => {
  const showSubMenu = useLocation().pathname;

  useEffect(() => {
    setShowBurger(false);
  }, [showSubMenu]);

  console.log(showSubMenu);
  const [showBurger, setShowBurger] = useState(false);

  const menuItems = [
    { name: "Om os", path: "/raadgiverne" },
    { name: "Nyheder", path: "/nyheder" },
    { name: "Kontakt", path: "/kontakt" },
  ];

  const subMenuItems = [
    { name: "Om rådgiverne", path: "/raadgiverne" },
    { name: "Vores samarbejdspartnere", path: "/samarbejdspartnere" },
    { name: "Vores pædagogiske tilgang", path: "/paedagogisk-tilgang" },
  ];

  return (
    <header className="bg-[#87d6998f] sm:bg-red-200 md:bg-amber-200 lg:bg-green-200">
      <nav className="sm:w-[90vw] md:w-[80vw] lg:w-[65vw] mx-auto pt-4">
        <menu className="flex flex-col sm:grid grid-cols-4 sm:gap-7">
          <li className="w-[45vw] mx-auto sm:w-full text-center size-full rounded-full hover:bg-gray-500/5">
            <NavLink to="/" title="Forside">
              <figure>
                <img src="/logo-2.png" alt="Åben Forældrerådgivnings logo" />
              </figure>
            </NavLink>
          </li>
          <li className="text-6xl flex justify-end mr-4 sm:hidden">
            <button
              onClick={() => setShowBurger(showBurger ? false : true)}
              className="hover:cursor-pointer hover:text-green-800"
            >
              <BsList />
            </button>
          </li>
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
        </menu>
        <menu className="sm:flex justify-evenly h-[50px] hidden">
          {(showSubMenu == "/raadgiverne" || showSubMenu == "/samarbejdspartnere" || showSubMenu == "/paedagogisk-tilgang") &&
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
        {showBurger && (
          <menu className="flex flex-col gap-2 text-end mr-6 text-lg sm:hidden pb-5">
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
      </nav>
    </header>
  );
};

export default Header;
