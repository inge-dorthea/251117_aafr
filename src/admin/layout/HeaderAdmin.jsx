import React from 'react'
import { NavLink } from 'react-router'

const HeaderAdmin = () => {

    const menuItems = [
        {name: "Admin", path: "/admin"},
        {name: "Forside", path: "/admin/forside"},
        {name: "Om os - Rådgiverne", path: "/admin/raadgiverne"},
        {name: "Om os - Samarbejdspartnere", path: "/admin/samarbejdspartnere"},
        {name: "Om os - Pædagogisk tilgang", path: "/admin/paedagogisk-tilgang"},
        {name: "Nyheder", path: "/admin/nyheder"},
        {name: "Kontakt", path: "/admin/kontakt"},
        {name: "Tilbage til hjemmesiden", path: "/"},
    ]

  return (
    <header>
        <nav>
            <menu>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path}>{item.name}</NavLink>
                    </li>
                ))}
            </menu>
        </nav>
    </header>
  )
}

export default HeaderAdmin