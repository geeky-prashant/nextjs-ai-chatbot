"use client"

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
import { PUT } from "@/app/api/notes/route"

interface AddEditNoteDialogProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  noteToEdit?: Note
}

export default function AddEditNoteDialog({ open, setOpen, noteToEdit }: AddEditNoteDialogProps) {
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



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
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
            <DialogFooter>
              <LoadingButton className="w-full mt-5 bg-gradient-to-r from-[#0F9E7B] to-[#1a6c57]" type="submit" loading={form.formState.isSubmitting}>
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}