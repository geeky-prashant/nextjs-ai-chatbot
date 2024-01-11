"use client"

import { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddEditNoteDialog from "@/components/add-edit-note-dialog";
import ThemeToggleButton from "@/components/theme-toggle-button";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme()

  const [showEditAddNoteDialog, setShowEditAddNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto max-w-7xl flex items-center justify-between flex-wrap gap-3">
          <Link href="/notes" className="flex items-center gap-1.5">
            <Image src={Logo} priority alt="Logo" width={42} height={42} />
            <span className="tracking-tight font-extrabold text-lg">365Bot</span>
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            {/* Mobile Create Button  */}
            <Button onClick={() => setShowEditAddNoteDialog(true)} className="flex md:hidden bg-gradient-to-r from-[#0F9E7B] to-[#1a745d] px-2.5 h-9">
              <Plus size={18} />
            </Button>

            <ThemeToggleButton />

            {/* Desktop Create Button  */}
            <Button onClick={() => setShowEditAddNoteDialog(true)} className="hidden md:flex bg-gradient-to-r from-[#0F9E7B] to-[#1a745d]">
              <Plus size={20} className="mr-1" />
              Create
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: (theme === "dark" ? dark : undefined),
                elements: {
                  avatarBox: {
                    width: "2.3rem",
                    height: "2.3rem"
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <AddEditNoteDialog open={showEditAddNoteDialog} setOpen={setShowEditAddNoteDialog} />
    </>
  )
}

export default Navbar