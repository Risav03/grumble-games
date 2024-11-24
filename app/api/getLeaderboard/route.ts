import { connectToDB } from "@/lib/db/db";
import First from "@/schemas/firstGuess";
import { NextResponse } from "next/server";

export async function GET(req:any){
    try{
        await connectToDB();

        const leaderboard = await First.find();

        return NextResponse.json({leaderboard:leaderboard},{status:200});
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}