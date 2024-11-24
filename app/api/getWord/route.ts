import { NextResponse } from "next/server";

export async function GET(req:any){
    try{
        const randomWords = [
            'serendipity',
            'enigma',
            'cascade',
            'whisper',
            'zenith',
            'labyrinth',
            'ethereal',
            'nebula',
            'solitude',
            'quixotic',
            'velvet',
            'kaleidoscope',
            'melancholy',
            'luminous',
            'wanderlust',
            'chrysalis',
            'ephemeral',
            'sanctuary',
            'resilient',
            'tranquil',
            'cascade',
            'symphony',
            'paradox',
            'mirage',
            'mystic',
            'aurora',
            'zephyr',
            'ethereal',
            'halcyon',
            'reverie'
          ];

          const date = new Date();
          const today = date.getDate();

          return NextResponse.json({word:randomWords[today]},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}