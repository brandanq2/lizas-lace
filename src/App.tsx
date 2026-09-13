import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CartDrawer from './components/CartDrawer/CartDrawer'
import PasswordGate from './components/PasswordGate/PasswordGate'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Product from './pages/Product/Product'
import { PageWrapper, Main } from './App.styles'

export default function App() {
  return (
    <PageWrapper>
      <Navbar />
      <CartDrawer />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<PasswordGate><Shop /></PasswordGate>} />
          <Route path="/product/:handle" element={<PasswordGate><Product /></PasswordGate>} />
        </Routes>
      </Main>
      <Footer />
    </PageWrapper>
  )
}
