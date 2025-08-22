import Fuse from "fuse.js"
import { EventWithLocation, getEvents, getLocations } from "./mock-data"

export const database = {
  getEventsWithLocation: async (
    locationId: number | null
  ): Promise<EventWithLocation[]> => {
    await fakeNetworkDelay()

    const events = getEvents()
    const locations = getLocations()

    return events
      .filter((event) => (locationId ? event.locationId === locationId : true))
      .map((event) => {
        const location = locations.find((loc) => loc.id === event.locationId)

        if (!location) {
          throw new Error(`Location not found for event ${event.id}`)
        }

        return {
          ...event,
          location,
        }
      })
  },
  getPopularEvents: async (
    amount: number,
    offset: number
  ): Promise<EventWithLocation[]> => {
    const events = await database.getEventsWithLocation(null)

    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset)
  },
  searchEvents: async (query: string, locationId: number | null) => {
    const events = await database.getEventsWithLocation(locationId)

    const options = {
      includeScore: true,
      keys: ["name", { name: "description", weight: 0.5 }],
    }
    const fuse = new Fuse(events, options)
    const results = fuse.search(query)

    return results.map((result) => result.item)
  },
  getEvent: async (id: number) => {
    await fakeNetworkDelay()

    const events = getEvents()

    return events.find((event) => event.id === id) ?? null
  },
}

function fakeNetworkDelay(min: number = 100, max: number = 500) {
  const ms = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, ms))
}
