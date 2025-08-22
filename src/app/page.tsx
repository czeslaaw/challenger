import { Logo } from "./components/Logo"
import PopularEvents from "./components/PopularEvents"
import { Search } from "./components/Search"

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
      <Logo />
      <Search />
      <PopularEvents />
    </main>
  )
}
