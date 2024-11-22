import React from 'react'

export const Card = ({className, children}:{className:string, children: React.ReactNode}) => {
  return (
    <div className={` ${className} p-6 rounded-xl bg-slate-950 border-t-[1px] shadow-2xl shadow-slate-800/70 border-r-[1px]  border-gray-500/20 `}>
        {children}
    </div>
  )
}
