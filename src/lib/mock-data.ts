// Location is JS global, so we use LocationItem
export interface LocationItem {
  id: number
  name: string
  slug: string
  city: string
  country: string
  imageUrl: string
}

const locations: LocationItem[] = [
  {
    id: 1,
    name: "Biddinghuizen",
    slug: "biddinghuizen",
    city: "Dronten",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Biddinghuizen",
  },
  {
    id: 2,
    name: "Recreatiegebied Spaarnwoude",
    slug: "recreatiegebied-spaarnwoude",
    city: "Velsen",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Recreatiegebied+Spaarnwoude",
  },
  {
    id: 3,
    name: "Ziggo Dome",
    slug: "ziggo-dome",
    city: "Amsterdam",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Ziggo+Dome",
  },
  {
    id: 4,
    name: "Ficarystraat 9",
    slug: "ficarystraat-9",
    city: "Nijmegen",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Ficarystraat+9",
  },
  {
    id: 5,
    name: "Evenemententerrein Walibi",
    slug: "evenemententerrein-walibi",
    city: "Biddinghuizen",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Evenemententerrein+Walibi",
  },
  {
    id: 6,
    name: "Lichtenvoorde Zwarte Cross",
    slug: "lichtenvoorde-zwarte-cross",
    city: "Lichtenvoorde",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=Lichtenvoorde+Zwarte+Cross",
  },
  {
    id: 7,
    name: "AFAS Live",
    slug: "afas-live",
    city: "Amsterdam",
    country: "Netherlands",
    imageUrl: "https://placehold.co/600x400?text=AFAS+Live",
  },
]

export function getLocations() {
  return locations
}

// Event is JS global so we use EventItem
export interface EventItem {
  id: number
  name: string
  alerts: number
  date: string
  locationId: number
  description: string | null
  imageUrl: string
}

export interface EventWithLocation extends EventItem {
  location: LocationItem
}

const events: EventItem[] = [
  {
    id: 1,
    name: "Lowlands Festival",
    alerts: 950,
    date: "2021-08-20T10:00:00+02:00",
    locationId: 1,
    description:
      "Tickets for Lowlands Festival live in Biddinghuizen are never sold out with TicketSwap! Safely buy and sell tickets for Lowlands Festival on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/public/202003/lowlands-festival-2020-biddinghuizen-21-august-2020.image.jpeg",
  },
  {
    id: 2,
    name: "Awakenings Festival 2021 | 20th Anniversary",
    alerts: 193,
    date: "2021-06-26T12:00:00+02:00",
    locationId: 2,
    description:
      "Tickets for Awakenings Festival 2021 | 20th Anniversary live in Recreatiegebied Spaarnwoude are never sold out with TicketSwap! Safely buy and sell tickets for Awakenings Festival 2021 | 20th Anniversary on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/public/201912/8e0e134a-bdd0-49ef-8274-92e4d8b14c7a.jpeg",
  },
  {
    id: 3,
    name: "Harry Styles",
    alerts: 781,
    date: "2021-03-27T20:00:00+01:00",
    locationId: 3,
    description: null,
    imageUrl: "https://cdn.ticketswap.com/public/201911/harry-styles-ziggo-dome-06-may-2020.image.jpeg",
  },
  {
    id: 4,
    name: "Down The Rabbit Hole",
    alerts: 967,
    date: "2021-07-02T10:00:00+02:00",
    locationId: 4,
    description:
      "Tickets for Down The Rabbit Hole live in Ficarystraat 9 are never sold out with TicketSwap! Safely buy and sell tickets for Down The Rabbit Hole on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/public/202003/2fefb873-c8b3-452c-a34c-6d81f24f9a0e.jpeg",
  },
  {
    id: 5,
    name: "Defqon.1 Weekend Festival",
    alerts: 931,
    date: "2021-06-25T13:00:00+02:00",
    locationId: 5,
    description:
      "Tickets for Defqon.1 Weekend Festival live in Evenemententerrein Walibi are never sold out with TicketSwap! Safely buy and sell tickets for Defqon.1 Weekend Festival on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/festival-4.jpg",
  },
  {
    id: 6,
    name: "Zwarte Cross",
    alerts: 206,
    date: "2021-07-15T12:00:00+02:00",
    locationId: 6,
    description: null,
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/festival-4.jpg",
  },
  {
    id: 7,
    name: "Queen + Adam Lambert",
    alerts: 113,
    date: "2021-05-29T20:00:00+02:00",
    locationId: 3,
    description:
      "Tickets for Queen + Adam Lambert live in Ziggo Dome are never sold out with TicketSwap! Safely buy and sell tickets for Queen + Adam Lambert on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/concert-1.jpg",
  },
  {
    id: 8,
    name: "The Weeknd",
    alerts: 534,
    date: "2021-10-19T20:00:00+02:00",
    locationId: 3,
    description:
      "Tickets for The Weeknd live in Ziggo Dome are never sold out with TicketSwap! Safely buy and sell tickets for The Weeknd on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/concert-3.jpg",
  },
  {
    id: 9,
    name: "Louis Tomlinson",
    alerts: 972,
    date: "2021-09-04T20:00:00+02:00",
    locationId: 7,
    description:
      "Tickets for Louis Tomlinson live in AFAS Live are never sold out with TicketSwap! Safely buy and sell tickets for Louis Tomlinson on TicketSwap!",
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/concert-7.jpg",
  },
  {
    id: 10,
    name: "Queen + Adam Lambert",
    alerts: 130,
    date: "2021-05-30T20:00:00+02:00",
    locationId: 3,
    description: null,
    imageUrl: "https://cdn.ticketswap.com/static/images/placeholders/concert-1.jpg",
  },
]

export function getEvents() {
  return events
}
