import { Calendar } from "lucide-react"
import Image from "next/image"

import { database } from "@/lib/mock-db"
import Link from "next/link"

export default async function PopularEvents() {
  const events = await database.getPopularEvents(6, 0)

  return (
    <>
      <h1 className="text-xl text-black dark:text-white flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      <ul className="list-none grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`} className="flex flex-col gap-1">
              <Image
                role="presentation"
                className="object-cover h-full w-full aspect-video rounded-lg"
                alt={event.name}
                src={event.imageUrl}
                width={320}
                height={200}
              />
              <p className="text-sm text-foreground dark:text-primary-foreground">{event.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {event.location.name}
                {" - "}
                {new Date(event.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
