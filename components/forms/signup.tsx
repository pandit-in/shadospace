"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { Spinner } from "../ui/spinner"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [loadingProvider, setLoadingProvider] = React.useState<
    "google" | "github" | null
  >(null)

  const [loading, setLoading] = React.useState(false)

  async function handleSocial(provider: "google" | "github") {
    setLoadingProvider(provider)
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      })
      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "An error occurred during sign in"))
    } finally {
      setLoadingProvider(null)
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Account created successfully")
        redirect("/")
      }
    } catch {
      toast.error("An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full sm:max-w-sm">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={24} height={24} />
          <h1 className="text-xl font-medium">shadospace</h1>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Field>
              <Button
                variant={"outline"}
                disabled={loadingProvider === "google"}
                onClick={() => handleSocial("google")}
                className="w-full gap-2"
              >
                {loadingProvider === "google" ? <Spinner /> : <FcGoogle />}
                Continue with Google
              </Button>
              <Button
                variant={"outline"}
                disabled={loadingProvider === "github"}
                onClick={() => handleSocial("github")}
                className="w-full gap-2"
              >
                {loadingProvider === "github" ? <Spinner /> : <FaGithub />}
                Continue with github
              </Button>
            </Field>
          </div>
          <form
            className="mt-4"
            id="form-signup"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="gap-3">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-email"
                      placeholder="john.doe@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-password"
                      placeholder="Password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <FieldDescription>
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/legal/terms"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            disabled={loading}
            className="w-full"
            type="submit"
            form="form-signup"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-6">
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="text-red-400" href="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}
