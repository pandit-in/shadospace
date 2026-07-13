"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createPost } from "@/server/post"
import { authClient } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"
import Editor from "@/components/editor"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters.")
    .max(255, "Post title must be at most 32 characters."),
  content: z.string(),
})

export default function Page() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createPost(data.title, data.content, session?.user?.id as string)
      toast.success("Post created successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to create post")
    }
  }

  return (
    <div className="mx-auto mt-10 w-full p-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Create post</h1>
      </div>
      <div className="mt-6">
        <form id="create-post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
