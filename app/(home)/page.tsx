import Image from "next/image"
import Logo from "@/assets/logo.svg"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  const { userId } = auth();

  if (userId) {
    return redirect("/notes")
  }

  return (
    <main
      className="flex items-center justify-center flex-col h-full gap-5 bg-gradient-to-r from-rose-100 to-teal-100"
    >
      <div className="flex items-center gap-4">
        <Image src={Logo} alt="Logo" width={80} height={80} />
        <span className="font-extrabold tracking-tight text-3xl lg:text-5xl text-[#1C274C]">365Bot</span>
      </div>
      <p className="text-center max-w-md px-4 text-md md:text-base text-[#161616]">An intelligent note-taking app with AI integration, built with cutting-edge technologies</p>
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#0F9E7B] to-[#1a6c57] mt-4"
      >
        <ArrowRight size={20} className="mr-1" />
        <Link href="/notes" className="font-bold text-base">
          Access App
        </Link>
      </Button>
    </main>
  )
}

export default HomePage