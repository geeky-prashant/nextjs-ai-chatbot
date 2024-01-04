import { UserButton } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '365Bot - Notes',
}

export default function NotesPage() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}