import { database } from "@/lib/mock-db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Map, MapPin } from "lucide-react"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = database.getEvent(Number(id))

  if (!event) {
    notFound()
  }

  return (
    <article>
      <section>
        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
        <Image src={event.imageUrl} alt={event.name} width={600} height={400} className="rounded-lg w-full" />
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 dark:text-gray-200">{event.description}</p>
          <div className="flex gap-2 items-center">
            <Calendar size={20} />
            <span className="font-semibold">Date:</span>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
        </div>
      </section>
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mt-6 mb-2">
          <Map />
          <span>Location</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Image
            src={event.location.imageUrl}
            alt={event.location.name}
            width={600}
            height={400}
            className="grid-span-2 rounded-lg w-full"
            unoptimized
          />
          <div className="flex flex-col gap-4">
            <p className="text-xl text-black dark:text-gray-200">{event.location.name}</p>
            <address className="flex gap-2">
              <MapPin size={20} />
              <span className="font-semibold not-italic">Address:</span>
              <span>
                {event.location.city}, {event.location.country}
              </span>
            </address>
          </div>
        </div>
      </section>
    </article>
  )
}
