import React from 'react'
import { Outlet } from 'react-router'
import HeaderAdmin from './HeaderAdmin'

const LayoutAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <main>
        <Outlet />
      </main>
    </>
  )
} 

export default LayoutAdmin