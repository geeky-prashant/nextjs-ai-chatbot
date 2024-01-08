"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Logo from "@/assets/logo.svg"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AddEditNoteDialog from "@/components/add-edit-note-dialog"

const Navbar = () => {
  const [showEditAddNoteDialog, setShowEditAddNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto max-w-7xl flex items-center justify-between flex-wrap gap-3">
          <Link href="/notes" className="flex items-center gap-1.5">
            <Image src={Logo} priority alt="Logo" width={42} height={42} />
            <span className="tracking-tight font-extrabold text-lg text-[#1C274C]">365Bot</span>
          </Link>
          <div className="flex items-center gap-8">
            <Button onClick={() => setShowEditAddNoteDialog(true)} className="bg-gradient-to-r from-[#0F9E7B] to-[#1a6c57]">
              <Plus size={20} className="mr-1" />
              Add Note
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarbox: {
                    width: "2.5rem",
                    height: "2.5rem"
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