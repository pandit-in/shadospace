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
import { createPost } from "@/server/post"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Editor from "@/components/editor"
import React from "react"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters.")
    .max(255, "Post title must be at most 32 characters."),
  content: z.string(),
  thumbnail: z.string().url("Enter a valid image url").nullable().optional(),
})

export default function Page() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createPost(
        data.title,
        data.content,
        data.thumbnail,
        session?.user?.id as string
      )
      toast.success("Post created successfully")
      router.push("/")
    } catch (error) {
      const err = error as Error
      toast.error("Failed to create post" + err.message)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="mt-6">
        <form id="create-post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="thumbnail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-post-form">
                    Post thumbnail
                  </FieldLabel>
                  <div>
                    {field.value ? (
                      <div className="relative">
                        <Button
                          className="absolute top-2 right-2 z-10"
                          variant={"destructive"}
                          type="button"
                          onClick={() => field.onChange(null)}
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
                            "ut-ready:bg-red-800/50 -mb-3 text-sm ut-uploading:cursor-not-allowed bg-red-500 outline-none after:bg-red-400",
                          container:
                            "w-full h-44 border-2 border-dashed border-red-500/10 bg-red-500/10",
                          uploadIcon: "-mt-2",
                          label:
                            "text-xs text-muted-foreground hover:text-foreground/90",
                          allowedContent:
                            "flex h-8 flex-col items-center justify-center px-2 text-xs text-muted-foreground hidden",
                        }}
                        endpoint="thumbnailUploader"
                        onClientUploadComplete={(res) => {
                          console.log("Files: ", res)
                          toast.success("Thumbnail uploaded successfully")
                          field.onChange(res[0].ufsUrl)
                        }}
                        onUploadError={(error: Error) => {
                          console.log("Error: ", error)
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
                  <FieldLabel htmlFor="create-post-form">Post title</FieldLabel>
                  <Input
                    {...field}
                    id="create-post-form"
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
                  <FieldLabel htmlFor="create-post-content">Content</FieldLabel>
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
        <Button type="submit" form="create-post-form" className="w-full">
          {form.formState.isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </div>
  )
}
