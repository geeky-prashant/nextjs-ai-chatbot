"use client"

import { useState } from 'react';
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import LoadingButton from "./loading-button"
import toast from "react-hot-toast"
import { Note } from "@prisma/client"

interface AddEditNoteDialogProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  noteToEdit?: Note
}

export default function AddEditNoteDialog({ open, setOpen, noteToEdit }: AddEditNoteDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const router = useRouter();

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    }
  })

  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input
          })
        });

        toast.success("Note updated successfully");

      } else {
        await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input)
        });

        toast.success("Note created successfully");
        form.reset();
      }

      setOpen(false);
      router.refresh();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;
    setDeleteInProgress(true);
    try {
      await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id
        })
      });

      toast.success("Note deleted successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setDeleteInProgress(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] rounded-md md:m-auto md:w-full">
        <DialogHeader>
          <DialogTitle>
            {noteToEdit ? "Edit Note" : "Create Note"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Take a note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-0 md:gap-2">
              {noteToEdit && (
                <LoadingButton
                  className="w-full mt-5 bg-gradient-to-r from-[#b21f22] to-[#862222] text-white"
                  loading={deleteInProgress}
                  disabled={form.formState.isSubmitting}
                  onClick={deleteNote}
                  type="button"
                >
                  Delete
                </LoadingButton>
              )}
              <LoadingButton
                className="w-full mt-5 bg-gradient-to-r from-[#0F9E7B] to-[#1a745d] text-white"
                loading={form.formState.isSubmitting}
                disabled={deleteInProgress}
                type="submit"
              >
                {noteToEdit ? "Update" : "Create"}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}