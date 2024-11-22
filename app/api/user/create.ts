import { connectToDB } from "@/lib/db/db";
import User from "@/schemas/userSchema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req:any){
    try{
        const body = await req.json();
        const{wallet} = body;
        revalidatePath('/','layout');
        await connectToDB();

        const existingUser = await User.findOne({walletId:wallet});

        if(existingUser){
            return NextResponse.json({exists:existingUser},{status:204});
        }

        const user = await User?.create({
            walletId:wallet, username:wallet, lastGuess:Date.now()
        })

        return NextResponse.json({user:user},{status:200});
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}