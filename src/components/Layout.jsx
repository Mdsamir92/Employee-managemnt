import React from 'react'

function Layout({children}) {
  return (
    <div className='max-w-7xl w-full mx-auto px-4 pt-20'>
        {children}
    </div>
  )
}

export default Layout