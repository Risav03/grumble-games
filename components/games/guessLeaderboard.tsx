'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GuessLeaderboard = () => {

    const[leaderboard, setLeaderboard] = useState<any>([])

    async function getLeaderboard(){
        try{
            const res = await axios.get("/api/getLeaderboard");
            console.log(res.data.leaderboard);
            setLeaderboard(res.data.leaderboard);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getLeaderboard()
    },[])

  return (

    <div className="flex flex-col h-[78vh] border-[1px] rounded-lg border-slate-400/20">
      {/* Table header */}
      <div className=" rounded-t-lg sticky top-0 bg-slate-300/10 text-slate-400 grid grid-cols-2 font-bold border-b border-slate-500/50">
        <div className="p-3 text-center">Position</div>
        <div className="p-3 text-center">Wallet ID</div>
      </div>
      
      {/* Scrollable table body */}
      <div className="flex-grow overflow-auto">
        {leaderboard.map((entry:any, i:number) => (
            <div 
            key={i} 
            className={`grid grid-cols-2 border-b border-slate-500/30 hover:scale-[1.01] duration-200 ${i==0 && "bg-gradient-to-b from-yellow-700 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"} ${i==1 && "bg-gradient-to-b from-gray-700 via-gray-300 to-gray-500 bg-clip-text text-transparent"} ${i==2 && "bg-gradient-to-b from-orange-700 via-orange-300 to-orange-500 bg-clip-text text-transparent"} `}
            >
            <div className="p-3 text-center">{i+1}</div>
            <div className={`p-3 text-center truncate  `}>{entry.walletId}</div>
          </div>
        ))}
      </div>
    </div>

  )
}
