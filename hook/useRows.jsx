import { useMemo } from 'react'

export default function useRow (body) {
  const row = useMemo(() => body, [body])
  return row
}
