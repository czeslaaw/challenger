"use client"
import { SearchEventsResponse } from "@/app/api/events/search/route"
import { EventWithLocation, LocationItem } from "@/lib/mock-data"
import { debounce } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Funnel } from "lucide-react"

export function Search({ locations }: { locations: LocationItem[] }) {
  const router = useRouter()

  const [query, setQuery] = useState<string>("")
  const [highlightedEventId, setHighlightedEventId] = useState<number | null>(null)
  const [results, setResults] = useState<EventWithLocation[]>([])
  const [selectedLocationsIds, setSelectedLocationsIds] = useState<number[]>([])

  const abortControllerRef = useRef<AbortController | null>(null)
  const debouncedSearchRef = useRef(
    debounce(async (query: string, locationIds: number[]) => {
      abortControllerRef.current?.abort()
      const newAbortController = new AbortController()
      abortControllerRef.current = newAbortController

      if (query) {
        try {
          const { results } = await fetchSearchResults(query, locationIds, newAbortController.signal)
          setResults(results)
        } catch {
          setResults([])
        }
      } else {
        setResults([])
      }
    }, 300)
  )

  useEffect(() => {
    debouncedSearchRef.current(query, selectedLocationsIds)
  }, [query, selectedLocationsIds])

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (highlightedEventId !== null) {
        const nextIndex = results.findIndex((event) => event.id === highlightedEventId) + 1
        setHighlightedEventId(results[nextIndex]?.id ?? null)
      } else {
        setHighlightedEventId(results[0]?.id ?? null)
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (highlightedEventId !== null) {
        const prevIndex = results.findIndex((event) => event.id === highlightedEventId) - 1
        setHighlightedEventId(results[prevIndex]?.id ?? null)
      } else {
        setHighlightedEventId(results[results.length - 1]?.id ?? null)
      }
    }
    if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedEventId === null) {
        // @todo: maybe create a search result page?
      } else {
        router.push(`/event/${highlightedEventId}`)
        setQuery("")
        setHighlightedEventId(null)
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search events
          </label>
          <input
            className="w-full h-10 p-2 rounded-sm border-1 dark:border-gray-300"
            id="search"
            type="search"
            name="search"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
          />
        </div>
        <button
          className="px-4 rounded-sm bg-primary text-white"
          popoverTarget="filterPopover"
          aria-label="Filter by location"
        >
          <Funnel />
        </button>
        <div
          popover="auto"
          id="filterPopover"
          className="fixed inset-0 m-auto p-4 w-max border-1 rounded-md bg-white dark:bg-gray-950 w-64"
        >
          <div className="flex flex-col gap-2">
            {locations.map((location) => (
              <label key={location.id} className="flex items-center dark:text-white gap-2">
                <input
                  type="checkbox"
                  checked={selectedLocationsIds.includes(location.id)}
                  onChange={() => {
                    if (selectedLocationsIds.includes(location.id)) {
                      setSelectedLocationsIds(selectedLocationsIds.filter((id) => id !== location.id))
                    } else {
                      setSelectedLocationsIds([...selectedLocationsIds, location.id])
                    }
                  }}
                />
                {location.name}
              </label>
            ))}
            <button className="mt-2 text-sm text-gray-500" onClick={() => setSelectedLocationsIds([])}>
              Clear all
            </button>
          </div>
        </div>
      </div>
      {results.length > 0 && (
        <ul className="absolute z-1 top-auto w-full rounded-b-md border-1 border-gray-300 bg-white dark:bg-gray-950">
          {results.map((event) => (
            <li
              className={`p-2 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:dark:bg-gray-800 ${
                highlightedEventId === event.id ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
              key={event.id}
            >
              <Link
                href={`/event/${event.id}`}
                className="flex gap-2 items-center"
                onClick={() => {
                  setQuery("")
                  setHighlightedEventId(null)
                }}
              >
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  width={600}
                  height={400}
                  className="rounded-sm h-8 w-8 object-cover"
                />
                <span className="font-semibold">{event.name}</span>
                <span className="text-gray-500">{event.location.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

async function fetchSearchResults(query: string, locationIds: number[], abortSignal: AbortSignal) {
  const queryParams = new URLSearchParams({
    query,
  })

  if (locationIds.length) {
    queryParams.append("locationIds", locationIds.join(","))
  }

  const response = await fetch(`/api/events/search?${queryParams.toString()}`, {
    signal: abortSignal,
  })

  return response.json() as Promise<SearchEventsResponse>
}
