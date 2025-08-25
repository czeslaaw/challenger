import { Calendar } from "lucide-react"

import { database } from "@/lib/mock-db"

import { EventCard } from "../EventCard"

export default async function PopularEvents() {
  const events = database.getPopularEvents(6, 0)

  return (
    <>
      <h1 className="text-xl text-black dark:text-white flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      <ul className="list-none grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {events.map((event, index) => (
          <li key={event.id}>
            <EventCard event={event} priority={index < 4} />
          </li>
        ))}
      </ul>
    </>
  )
}
