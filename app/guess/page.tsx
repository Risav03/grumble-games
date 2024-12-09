import WordGuesserGame from "@/components/games/guess";
import { GuessLeaderboard } from "@/components/games/guessLeaderboard";
import { Background } from "@/components/UI/background";
import WalletConnectButton from "@/components/UI/walletConnectButton";

export default function Guess(){
    return(
        <div className="w-screen min-h-screen flex items-center flex-col justify-center p-20 max-md:px-4 max-md:py-20">
            <Background/>
            <WalletConnectButton/>
            <div className="flex max-md:flex-col gap-10 w-full">
                <div className="md:w-1/2 max-md:mt-10 flex items-center">
                    <WordGuesserGame/>
                </div>
                <div className="md:w-1/2">
                    <GuessLeaderboard/>
                </div>
            </div>
        </div>
    )
}