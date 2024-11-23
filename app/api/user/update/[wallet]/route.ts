import { connectToDB } from "@/lib/db/db";
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

        console.log("BEFORE DAYE");
        user.nextGuess = Date.now()+86400000;
        console.log("After DATE");

        user.points += points;

        console.log("After points", user.points);

        await user.save();

        return NextResponse.json({user:user},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}