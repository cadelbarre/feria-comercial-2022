import { useMemo } from 'react'

export default function useColumns (header) {
  const columns = useMemo(() => header, [])
  return columns
}
