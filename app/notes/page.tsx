import { UserButton } from "@clerk/nextjs";

export default function NotesPage() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}