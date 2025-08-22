import { EventWithLocation } from "@/lib/mock-data"
import { database } from "@/lib/mock-db"

export interface SearchEventsResponse {
  results: EventWithLocation[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get("query")
  const rawLocationId = searchParams.get("locationId")
  const locationId = rawLocationId ? Number(rawLocationId) : null

  if (query === null) {
    return new Response("Query parameter is required", { status: 400 })
  }
  if (locationId !== null && Number.isNaN(locationId)) {
    return new Response("Invalid locationId parameter", { status: 400 })
  }

  const response: SearchEventsResponse = {
    results: await database.searchEvents(query, locationId),
  }

  return Response.json(response)
}
