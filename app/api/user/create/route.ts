import { connectToDB } from "@/lib/db/db";
import User from "@/schemas/userSchema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req:any){
    revalidatePath('/','layout');
    try{
        await connectToDB();
        const body = await req.json();
        const{wallet} = body;

        const existingUser = await User?.findOne({walletId:wallet});

        if(existingUser){
            return NextResponse.json({user:existingUser},{status:202});
        }

        console.log("LMAOOO WTF")

        const user = await User?.create({
            walletId:wallet, username:wallet, nextGuess:Date.now()
        })

        return NextResponse.json({user:user},{status:200});
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}