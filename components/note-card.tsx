"use client"

import { useState } from "react";
import { Note as NoteModel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import AddEditNoteDialog from "./add-edit-note-dialog";

interface NoteProps {
  note: NoteModel
}

export default function NoteCard({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const wasUpdated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowEditDialog(true)} >
        <CardHeader>
          <CardTitle className="text-[16px] md:text-lg">{note.title}</CardTitle>
          <CardDescription className="text-[12px] md:text-sm">
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-[14px] md:text-lg">
          <p className="whitespace-pre-line">
            {note.content}
          </p>
        </CardContent>
      </Card>
      <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      />
    </>
  )
}