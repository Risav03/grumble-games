import React, { Dispatch } from 'react'

export const TextInput = ({content, setContent, heading, placeholder, type, required, limit, disabled}:{type?: string, required:boolean, content:string, setContent:Dispatch<string>, heading:string, placeholder:string, limit?:number, disabled?:boolean}) => {
  return (
    <div className="w-full text-start flex flex-col">
          <input type={type} placeholder={placeholder} onChange={(e) => {if(!disabled) setContent(e.target.value) }} value={content} className={`p-2 peer placeholder:text-gray-300/40 bg-gray-500/20 w-full focus:outline-none focus:border-gray-400 focus:border-2 rounded-lg border-[1px] border-gray-500/50 duration-200 `}></input>
          <h2 className={`text-sm text-semibold text-nifty-gray-1 order-first mt-4 peer-focus:font-semibold duration-200 peer-focus:text-gray-400 text-gray-500/80 `}>{heading} {required && <span className="text-red-500 font-semibold ml-1">*</span>} {limit && <><span className={` ${content.length > limit && "text-red-500"} `}>{content.length}</span>/{limit && limit}</>}</h2>
      </div>
  )

}
