import Fuse from "fuse.js"
import { EventWithLocation, getEvents, getLocations } from "./mock-data"

export const database = {
  getEventsWithLocation: async (locationIds: number[]): Promise<EventWithLocation[]> => {
    const events = getEvents()
    const locations = getLocations()

    return events
      .filter((event) => (locationIds.length ? locationIds.includes(event.locationId) : true))
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
  getPopularEvents: async (amount: number, offset: number): Promise<EventWithLocation[]> => {
    const events = await database.getEventsWithLocation([])

    return events.toSorted((a, b) => b.alerts - a.alerts).slice(offset, amount + offset)
  },
  searchEvents: async (query: string, locationIds: number[]) => {
    const events = await database.getEventsWithLocation(locationIds)

    const options = {
      includeScore: true,
      keys: ["name", { name: "description", weight: 0.5 }],
    }
    const fuse = new Fuse(events, options)
    const results = fuse.search(query)

    return results.map((result) => result.item)
  },
  getEvent: async (id: number) => {
    const events = await database.getEventsWithLocation([])

    return events.find((event) => event.id === id) ?? null
  },
  getLocations: () => {
    return getLocations()
  },
}
