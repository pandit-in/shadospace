"use client"

import React from "react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { Spinner } from "../ui/spinner"

export default function LoadingButton({
  loading,
  disabled,
  icon,
  label,
  loadingLabel,
  onClick,
}: {
  loading?: boolean
  disabled?: boolean
  label: string
  loadingLabel?: string
  icon?: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      disabled={disabled || loading}
      variant={"outline"}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner />
          <span>{loadingLabel}</span>
        </div>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </Button>
  )
}
