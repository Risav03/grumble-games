import { connectToDB } from "@/lib/db/db";
import Leaderboard from "@/schemas/leaderboardSchema";
import User from "@/schemas/userSchema";
import { NextResponse } from "next/server";

export async function PATCH(req:any){
    try{
        const wallet = await req.nextUrl.pathname.split("/")[4];

        await connectToDB();

        const body = await req.json();
        const{points} = body;

        const user = await User?.findOne({ walletId: wallet });

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const date = new Date();
        const day = date.getDate();

        let bonus = 0;

        const existingPrevFirst = await Leaderboard.find();

        if(!existingPrevFirst){
            bonus = 200;
        }

        await Leaderboard.create({
            walletId:wallet,
            time:Date.now()
        })


        user.nextGuess = Date.now()+86400000;
        user.points += points + bonus;

        await user.save();

        return NextResponse.json({user:user},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}