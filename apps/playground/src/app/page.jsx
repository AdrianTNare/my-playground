import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Now from '../components/Now'
import Work from '../components/Work'
import Stack from '../components/Stack'
import About from '../components/About'
import Contact from '../components/Contact'
import AccentPicker from '../components/AccentPicker'

export default function Page() {
  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main className="mx-auto max-w-[940px] px-[clamp(18px,4vw,34px)]">
        <Hero />
        <Now />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>
      <AccentPicker />
    </div>
  )
}
