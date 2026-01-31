//* import
// react
import { NavLink, useLocation } from "react-router";
import { BsList } from "react-icons/bs";
import { useEffect, useState } from "react";

// own functionality
import { signOut } from "../../data/functions";

//* component
const HeaderAdmin = () => {
  //* burger-menu useState
  const [showBurger, setShowBurger] = useState(false);

  //* track the location - closing burger and marking the current location
  const location = useLocation().pathname;

  useEffect(() => {
    setShowBurger(false);
  }, [location]);

  //* menu
  const menuItems = [
    { name: "Forside", path: "/admin/forside" },
    { name: "Om os - Rådgiverne", path: "/admin/raadgiverne" },
    { name: "Om os - Vores samarbejde", path: "/admin/samarbejde" },
    { name: "Om os - Pædagogisk tilgang", path: "/admin/paedagogisk-tilgang" },
    { name: "Nyheder", path: "/admin/nyheder" },
    { name: "Kontakt", path: "/admin/kontakt" },
  ];

  //* return
  return (
    <header className="sm:w-fit bg-[#87d6998f] sm:min-h-full">
      <nav>
        {/* burger v */}
        <menu className="py-8">
          <li className="text-6xl flex justify-end mr-4 sm:hidden">
            <button
              onClick={() => setShowBurger(showBurger ? false : true)}
              className="hover:cursor-pointer hover:text-green-800"
            >
              <BsList />
            </button>
          </li>
        </menu>
        {/* burger ^ */}
        {/* menu v */}
        <menu
          className={`flex-col py-8 px-5 justify-evenly gap-5 rounded-xs sm:rounded-0 sm:bg-transparent sm:relative sm:flex ${
            showBurger ? "flex fixed z-10 bg-[#87d699] right-0" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to={"/admin"}
              className={`hover:bg-[#fdc684]  pt-1 pb-2 ps-2 pe-3 rounded-r-full ${
                location == "/admin" ? "bg-[#ffb75f]" : ""
              }`}
            >
              Admin-forside
            </NavLink>
          </li>
          {/* pages v */}
          <div className="border border-gray-800 px-2">
            <p className="border-b border-gray-800 font-thin">Sider</p>
            {menuItems.map((item, index) => (
              <li key={index} className="my-2">
                <NavLink
                  to={item.path}
                  className={`hover:bg-[#fdc684]  pt-1 pb-2 ps-2 pe-3 rounded-r-full ${
                    location == item.path ? "bg-[#ffb75f]" : ""
                  }`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </div>
          {/* pages ^ */}
          {/* open website in a new tab v */}
          <li>
            <NavLink
              to={"/"}
              target="_blank"
              className="hover:bg-[#fdc684]  pt-1 pb-2 ps-2 pe-3 rounded-r-full"
            >
              Tilbage til hjemmesiden
            </NavLink>
          </li>
          {/* open website in a new tab ^ */}
          {/* sign out v */}
          <li>
            <button
              // sign out locally
              onClick={() => signOut(true)}
              className="hover:bg-[#fdc684] cursor-pointer pt-1 pb-2 ps-2 pe-3 rounded-r-full"
            >
              Log ud
            </button>
          </li>
          <li>
            <button
              // sign out globally
              onClick={() => signOut(false)}
              className="hover:bg-[#fdc684] cursor-pointer pt-1 pb-2 ps-2 pe-3 rounded-r-full text-start"
            >
              Log denne bruger ud overalt
            </button>
          </li>
          {/* sign out ^ */}
        </menu>
        {/* menu ^ */}
      </nav>
    </header>
  );
};

export default HeaderAdmin;
