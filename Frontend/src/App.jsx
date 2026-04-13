import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Bokning from './pages/Bokning';
import Member from './pages/Member';
function App() {

  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member" element={<Member />} />
          <Route path="/bokning" element={<Bokning />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
