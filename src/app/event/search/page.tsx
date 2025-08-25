import { EventCard } from "@/app/components/EventCard"
import { database } from "@/lib/mock-db"
import { CircleX, Funnel } from "lucide-react"

interface SearchResultsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const { query, location } = await searchParams
  const locations = database.getLocations()

  const queryNormalized = typeof query === "string" ? query.trim() : ""
  const selectedLocation = locations.find((loc) => loc.slug === location)
  const selectedLocationId = selectedLocation?.id
  const events = database.searchEvents(queryNormalized, selectedLocationId ? [selectedLocationId] : [])
  const foundLocationsIds = events.map((event) => event.location.id)
  const foundLocations = locations.filter((loc) => foundLocationsIds.includes(loc.id))

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Search results for: "{query}"</h1>
      <div className="flex-col gap-4">
        <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
          <Funnel />
          <span> Filter by location</span>
        </div>
        <ul className="list-none flex gap-4 flex-wrap mb-4">
          {foundLocations.map((loc) => (
            <li key={loc.id} className="flex gap-2 items-center border-1 rounded-lg p-2">
              <a href={`/event/search?query=${query}&location=${loc.slug}`}>{loc.name}</a>
              {loc.id === selectedLocationId && (
                <a href={`/event/search?query=${query}`} aria-label={`Clear filter for ${loc.name}`}>
                  <CircleX />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      {events.length ? (
        <ul className="list-none grid grid-cols-1 gap-3">
          {events.map((event, index) => (
            <li key={event.id}>
              <EventCard event={event} priority={index < 2} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </section>
  )
}
