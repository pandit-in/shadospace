"use client"

import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import Image from "next/image"

export default function LoadingButton({
  loading,
  disabled,
  logo,
  label,
  loadingLabel,
  onClick,
}: {
  loading?: boolean
  disabled?: boolean
  label: string
  loadingLabel?: string
  logo?: string
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
          {logo ? <Image src={logo} width={18} height={18} alt="logo" /> : null}
          {label}
        </>
      )}
    </Button>
  )
}
