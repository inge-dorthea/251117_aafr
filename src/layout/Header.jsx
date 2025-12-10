import React from 'react'
import { NavLink } from 'react-router'

const Header = () => {

  const menuItems = [
        {name: "Om os", path: "/raadgiverne"},
        {name: "Nyheder", path: "/nyheder"},
        {name: "Kontakt", path: "/kontakt"},
    ]

  const subMenuItems = [
        {name: "Om rådgiverne", path: "/raadgiverne"},
        {name: "Vores samarbejdspartnere", path: "/samarbejdspartnere"},
        {name: "Vores tilgang", path: "/paedagogisk-tilgang"},
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

export default Header