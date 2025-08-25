import Image from "next/image"

import Link from "next/link"
import { EventWithLocation } from "@/lib/mock-data"

export function EventCard({ event, priority }: { event: EventWithLocation; priority?: boolean }) {
  return (
    <Link href={`/event/${event.id}`} className="flex flex-col gap-1">
      <Image
        className="object-cover h-full w-full aspect-video rounded-lg"
        alt={event.name}
        src={event.imageUrl}
        width={320}
        height={200}
        priority={priority}
      />
      <p className="text-sm text-foreground dark:text-primary-foreground">{event.name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {event.location.name}
        {" - "}
        {new Date(event.date).toLocaleDateString()}
      </p>
    </Link>
  )
}
