import React from 'react'

const Loading = () => {
  return (
   // fade-in-delay = own class, see App.css
    <div className='fade-in-delay fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-950/50 z-10'>
      {/* v spinner lavet af marianne vha tailwind */}
      <div className='border-16 border-white border-t-gray-800 rounded-full h-[120px] w-[120px] animate-spin'></div>
    </div>
  )
}

export default Loading