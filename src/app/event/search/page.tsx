import { EventCard } from "@/app/components/EventCard"
import { database } from "@/lib/mock-db"

interface SearchResultsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const { query, location } = await searchParams

  const queryNormalized = typeof query === "string" ? query.trim() : ""
  const locationId = database.getLocations().find((loc) => loc.slug === location)?.id
  const events = database.searchEvents(queryNormalized, locationId ? [locationId] : [])

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Search results for: "{query}"</h1>
      {events.length ? (
        <ul className="list-none grid grid-cols-1 gap-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </section>
  )
}
