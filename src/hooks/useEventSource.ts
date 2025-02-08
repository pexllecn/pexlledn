"use client"

import { useState, useEffect } from "react"

export function useEventSource(url: string) {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<Event | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      setData(event.data)
    }

    eventSource.onerror = (error) => {
      setError(error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [url])

  return { data, error }
}

