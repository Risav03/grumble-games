import { Background } from "@/components/UI/background";
import Image from "next/image";
import Link from "next/link";
import buttonBg from "@/assets/play.png"

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col justify-start p-20 max-md:px-4 max-md:py-20">
      <Background/>
      <h1 className="text-3xl">Grumbles Games</h1>

      <div className="mt-20">
        <Link href={"/guess"}>
          <button className="rounded-xl border-t-2 border-r-2 text-xl overflow-hidden relative hover:text-2xl duration-200 hover:brightness-110 border-white/20 h-32 w-60">
           <Image src={buttonBg} alt="bg" className="absolute object-cover -translate-y-1/2 z-[-1] brightness-50" />
           Guess 
           </button>
        </Link>
      </div>
    </div>
  );
}
