import { EventWithLocation, getEvents, getLocations } from "./mock-data"

export const database = {
  getPopularEvents: async (
    amount: number,
    offset: number
  ): Promise<EventWithLocation[]> => {
    await fakeNetworkDelay()
    const events = getEvents()
    const locations = getLocations()

    return events
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset)
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
  getEvent: async (id: number) => {
    const events = await getEvents()

    return events.find((event) => event.id === id) ?? null
  },
}

function fakeNetworkDelay(min: number = 100, max: number = 500) {
  const ms = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, ms))
}
