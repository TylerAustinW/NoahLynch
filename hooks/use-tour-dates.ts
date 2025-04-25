"use client"

import { useState, useEffect } from "react"

export type TourDate = {
  date: string
  time: string
  fullTime: string
  venue: string
  location: string
  ticketLink: string
  sold_out: boolean
}

export function useTourDates() {
  const [tourDates, setTourDates] = useState<TourDate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockTourDates: TourDate[] = [
          {
            date: "June 14, 2023",
            time: "7:00 PM CDT",
            fullTime: "7:00 PM CDT",
            venue: "Magnolia Blues BBQ Company",
            location: "Brookhaven, MS",
            ticketLink:
              "https://www.bandsintown.com/a/15584376-noah-lynch?came_from=281&utm_medium=web&utm_source=artist_event_page&utm_campaign=artist",
            sold_out: false,
          },
        ];
        setTourDates(mockTourDates)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
        setLoading(false)
      }
    }
    fetchTourDates()
  }, [])
  return { tourDates, loading, error }
}
