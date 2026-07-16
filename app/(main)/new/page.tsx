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
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters.")
    .max(255, "Post title must be at most 32 characters."),
  content: z.string(),
  thumbnail: z.url("Enter a valid image url"),
})

export default function Page() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
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
      toast.error("Failed to create post")
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl p-4">
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
                            "ut-ready:bg-red-800 ut-uploading:cursor-not-allowed bg-red-500 bg-none after:bg-orange-400",
                          container:
                            "w-full h-44 border-2 border-dashed border-red-500/10 flex-row items-center rounded-md bg-red-500/10",
                          uploadIcon: "hidden",
                          label: "hidden",
                          allowedContent:
                            "flex h-8 flex-col items-center justify-center px-2 text-white hidden",
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
          Submit
        </Button>
      </div>
    </div>
  )
}
