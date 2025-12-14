import { NavLink } from "react-router";

const HeaderAdmin = () => {
  const menuItems = [
    { name: "Admin", path: "/admin" },
    { name: "Forside", path: "/admin/forside" },
    { name: "Om os - Rådgiverne", path: "/admin/raadgiverne" },
    { name: "Om os - Samarbejdspartnere", path: "/admin/samarbejdspartnere" },
    { name: "Om os - Pædagogisk tilgang", path: "/admin/paedagogisk-tilgang" },
    { name: "Nyheder", path: "/admin/nyheder" },
    { name: "Kontakt", path: "/admin/kontakt" },
    { name: "Tilbage til hjemmesiden", path: "/" },
  ];

  return (
    <header className="border-b border-black mb-5">
      <nav className="w-[90vw] mx-auto py-8">
        <menu className="grid grid-cols-4 justify-evenly gap-5">
          {menuItems.map((item, index) => (
            <li key={index} className="text-center">
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </menu>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
