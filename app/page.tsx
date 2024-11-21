import { Background } from "@/components/UI/background";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col justify-start p-20 max-md:px-4 max-md:py-20">
      <Background/>
      <h1 className="text-3xl">Grumble Games</h1>

      <div className="mt-20">
        <Link href={"/guess"}>
          <button className="rounded-xl border-t-2 border-r-2 text-xl hover:text-2xl duration-200 hover:brightness-110 border-white/20 h-32 w-60"> Guess </button>
        </Link>
      </div>
    </div>
  );
}
