import React, { ReactNode } from 'react'

export const Button = ({onClick, children, type, disabled}:{children:string|ReactNode, onClick:()=>void, type:string, disabled?:boolean }) => {
  return (
    <button onClick={()=>{if(!disabled)onClick()}} className={` h-12 w-full ${type == "primary" ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-400"} text-xl hover:brightness-110 flex items-center justify-center duration-200 hover:-translate-y-1 font-bold rounded-lg `}>{children}</button>
  )
}
