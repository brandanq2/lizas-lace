import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import InstagramFeed from './components/InstagramFeed/InstagramFeed'
import Footer from './components/Footer/Footer'
import { PageWrapper, Main } from './App.styles'

export default function App() {
  return (
    <PageWrapper>
      <Navbar />
      <Main>
        <Hero />
        <InstagramFeed />
      </Main>
      <Footer />
    </PageWrapper>
  )
}
