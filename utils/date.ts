import { formatDistanceToNowStrict } from "date-fns"

export function formatDate(date: Date) {
  return formatDistanceToNowStrict(date, { addSuffix: true })
}
