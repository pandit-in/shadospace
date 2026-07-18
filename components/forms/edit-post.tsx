"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { updatePost } from "@/server/post"
import { useRouter } from "next/navigation"
import Editor from "@/components/editor"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters.")
    .max(255, "Post title must be at most 255 characters."),
  content: z.string(),
  thumbnail: z.url("Enter a valid image url"),
})

interface EditPostFormProps {
  postId: string
  initialTitle: string
  initialContent: string
  initialThumbnail: string | null
}

export default function EditPostForm({
  postId,
  initialTitle,
  initialContent,
  initialThumbnail,
}: EditPostFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent,
      thumbnail: initialThumbnail ?? "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await updatePost(postId, data.title, data.content, data.thumbnail)
      toast.success("Post updated successfully")
      router.push(`/post/${postId}`)
    } catch {
      toast.error("Failed to update post")
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="mt-6">
        <form id="edit-post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="thumbnail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-post-form">
                    Post thumbnail
                  </FieldLabel>
                  <div>
                    {field.value ? (
                      <div className="relative">
                        <Button
                          className="absolute top-2 right-2 z-10"
                          variant={"destructive"}
                          type="button"
                          onClick={() => field.onChange("")}
                        >
                          Remove
                        </Button>
                        <Image
                          src={field.value}
                          alt="Thumbnail"
                          width={800}
                          height={400}
                          className="h-44 w-full rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <UploadDropzone
                        appearance={{
                          button:
                            "ut-ready:bg-red-800 -mb-3 text-sm ut-uploading:cursor-not-allowed bg-red-500 bg-none after:bg-orange-400",
                          container:
                            "w-full h-44 border-2 border-dashed border-red-500/10 flex-row items-center rounded-md bg-red-500/10",
                          uploadIcon: "-mt-2",
                          label:
                            "text-xs text-muted-foreground hover:text-foreground/90",
                          allowedContent:
                            "flex h-8 flex-col items-center justify-center px-2 text-white hidden",
                        }}
                        endpoint="thumbnailUploader"
                        onClientUploadComplete={(res) => {
                          toast.success("Thumbnail uploaded successfully")
                          field.onChange(res[0].ufsUrl)
                        }}
                        onUploadError={() => {
                          toast.error("Failed to upload thumbnail")
                        }}
                      />
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-post-form">Post title</FieldLabel>
                  <Input
                    {...field}
                    id="edit-post-form"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type your title here..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-post-content">Content</FieldLabel>
                  <div>
                    <Editor content={field.value} onChange={field.onChange} />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      <div className="mt-4 w-full">
        <Button type="submit" form="edit-post-form" className="w-full">
          {form.formState.isSubmitting ? "Updating..." : "Update Post"}
        </Button>
      </div>
    </div>
  )
}
