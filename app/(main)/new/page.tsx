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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createPost } from "@/server/post"
import { authClient } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters.")
    .max(32, "Post title must be at most 32 characters."),
  content: z
    .string()
    .min(20, "Post content must be at least 20 characters.")
    .max(100, "Post content must be at most 100 characters."),
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
    <div className="mx-auto mt-10 w-full p-4 sm:max-w-2xl">
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
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="create-post-content"
                      placeholder="Write your post here..."
                      rows={15}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

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
