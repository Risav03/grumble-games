import { connectToDB } from "@/lib/db/db";
import User from "@/schemas/userSchema";
import { NextResponse } from "next/server";

export async function PATCH(req:any){
    try{
        const wallet = req.nextUrl.pathname.split("/")[4];
        console.log("WALLET", wallet)
        await connectToDB();

        const body = req.json();
        const{points} = body;

        const user = await User?.findOne({ walletId: wallet });

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        user.nextGuess = Date.now()+86400000;
        user.points = user.points + points;

        await user.save();

        return NextResponse.json({user:user},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}