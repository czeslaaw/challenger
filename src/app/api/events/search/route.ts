import { EventWithLocation } from "@/lib/mock-data"
import { database } from "@/lib/mock-db"

export interface SearchEventsResponse {
  results: EventWithLocation[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get("query")
  const rawLocationIds = searchParams.get("locationIds")
  const locationIds = rawLocationIds ? rawLocationIds.split(",").map(Number) : []

  if (query === null) {
    return new Response("Query parameter is required", { status: 400 })
  }
  if (locationIds !== null && locationIds.some((id) => Number.isNaN(id))) {
    return new Response("Invalid locationIds parameter", { status: 400 })
  }

  const response: SearchEventsResponse = {
    results: await database.searchEvents(query, locationIds),
  }

  return Response.json(response)
}
