import React, { useState } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(null);

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
    <header className="bg-[#87d6998f]">
      <nav className="w-[90vw] mx-auto pt-4">
        <menu className="grid grid-cols-4 gap-7">
          <li className="text-center size-full rounded-full hover:bg-gray-500/5">
            <NavLink to="/" title="Forside">
              <figure>
                <img
                  src="/public/logo-2.png"
                  alt="Åben Forældrerådgivnings logo"
                />
              </figure>
            </NavLink>
          </li>
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? setShowSubMenu(item.path) : ""
              }
            >
              <li
                className={`text-center text-3xl font-semibold size-full flex flex-col justify-center ${
                  showSubMenu == item.path ? "bg-[#87d6998f]" : "bg-[#f07f0b]"
                } hover:bg-[#f07f0b8f] hover:shadow-lg rounded-full`}
              >
                {item.name}
              </li>
            </NavLink>
          ))}
        </menu>
        <menu>
          {showSubMenu == "/raadgiverne" &&
            subMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
        </menu>
      </nav>
    </header>
  );
};

export default Header;
