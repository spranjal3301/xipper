import Header from "@/components/Header"
import Hero from "@/components/Hero"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}


