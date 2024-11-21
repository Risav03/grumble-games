import WordGuesserGame from "@/components/games/guess";

export default function Guess(){
    return(
        <div className="w-screen min-h-screen flex items-center flex-col justify-start p-20 max-md:px-4 max-md:py-20">
            <WordGuesserGame/>
        </div>
    )
}