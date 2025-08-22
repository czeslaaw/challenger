import { Calendar } from "lucide-react"
import Image from "next/image"

import { database } from "@/lib/mock-db"

export default async function PopularEvents() {
  const events = await database.getPopularEvents(6, 0)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <h1 className="text-xl text-black md:col-span-3 flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      {events.map((event) => (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 p-2">
            <h1 className="text-sm text-primary-foreground">{event.name}</h1>
            <p className="text-xs text-secondary-foreground">
              {event.location.name}
              {" - "}
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>

          <Image
            role="presentation"
            className="object-cover h-full w-full"
            alt={event.name}
            src={event.imageUrl}
            width={320}
            height={200}
          />
        </div>
      ))}
    </div>
  )
}
