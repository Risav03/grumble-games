import React from 'react'

export const Card = ({className, children}:{className:string, children: React.ReactNode}) => {
  return (
    <div className={` ${className} p-6 rounded-xl border-t-[1px] border-r-[1px] shadow-xl shadow-black/40 border-gray-500/20 bg-white `}>
        {children}
    </div>
  )
}
