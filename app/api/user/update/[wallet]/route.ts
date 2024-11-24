import { connectToDB } from "@/lib/db/db";
import First from "@/schemas/firstGuess";
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

        const existingFirst = await First.findOne({time:day});

        if(!existingFirst){
            await First.create({
                walletId: wallet,
                time:day
            });

            bonus = 200;
        }

        const existingPrevFirst = await First.findOne({time:day-1});

        if(existingPrevFirst){
            await First.findOneAndDelete({time:day-1});
        }


        user.nextGuess = Date.now()+86400000;
        user.points += points + bonus;

        await user.save();

        return NextResponse.json({user:user},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}