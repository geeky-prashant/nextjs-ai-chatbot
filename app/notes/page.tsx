import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import prisma from '@/lib/db/prisma';

export const metadata: Metadata = {
  title: '365Bot - Notes',
}

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("User Undefined");

  const allNotes = await prisma.note.findMany({
    where: {
      userId
    }
  })

  return (
    <div>
      {JSON.stringify(allNotes)}
    </div>
  )
}