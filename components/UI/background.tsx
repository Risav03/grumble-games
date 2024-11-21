import React from 'react'

export const Background = () => {
  return (
    <div className='w-screen h-screen bg-gradient-to-b from-slate-950 to-black fixed top-0 z-[-1] left-0 flex items-start justify-center'>
        <div className='w-[60rem] h-80 rounded-full blur-[150px] bg-slate-900 -translate-y-[10rem]'></div>
    </div>
  )
}
