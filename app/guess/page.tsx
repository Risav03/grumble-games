import WordGuesserGame from "@/components/games/guess";
import { Background } from "@/components/UI/background";
import WalletConnectButton from "@/components/UI/walletConnectButton";

export default function Guess(){
    return(
        <div className="w-screen min-h-screen flex items-center flex-col justify-center p-20 max-md:px-4 max-md:py-20">
            <Background/>
            <WalletConnectButton/>
            <WordGuesserGame/>
        </div>
    )
}