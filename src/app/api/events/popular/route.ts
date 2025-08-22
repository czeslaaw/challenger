import { EventWithLocation } from "@/lib/mock-data"
import { database } from "@/lib/mock-db"

export interface PopularEventsResponse {
  events: EventWithLocation[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const amount = Number(searchParams.get("amount")) ?? 5
  const offset = Number(searchParams.get("offset")) ?? 0
  const response: PopularEventsResponse = {
    events: await database.getPopularEvents(amount, offset),
  }

  return Response.json(response)
}
