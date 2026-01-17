//* import
// react
import { Outlet } from 'react-router'

// components
import HeaderAdmin from './HeaderAdmin'

const LayoutAdmin = () => {
  return (
    <div className='flex flex-col sm:flex-row sm:min-h-screen'>
      <HeaderAdmin />
      <main className="bg-[#e6ffec] w-full pt-5 max-h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  )
} 

export default LayoutAdmin