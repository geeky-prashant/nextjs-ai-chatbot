import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import prisma from '@/lib/db/prisma';
import Note from "@/components/note";
import Image from 'next/image';
import Empty from "@/assets/empty.svg"

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
    <>
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
        {allNotes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
      <div>
        {
          allNotes.length === 0 && (
            <div className="h-full flex items-center justify-center flex-col">
              <Image src={Empty} priority alt="Empty" width={70} height={70} />
              <p className="mt-4 text-center max-w-md px-4 text-xl md:text-base">{"You don't have any notes yet. Why don't you create one?"}</p>
            </div>
          )
        }
      </div>
    </>
  )
}