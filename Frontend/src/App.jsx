import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Bokning from './pages/Bokning';
import Member from './pages/Member';
import Gig from './pages/Gig';
import Gallery from './pages/Gallery';
import AdminHome from './pages/AdminHome';
import AdminLayout from './components/AdminLayout/AdminLayout';
import AdminPosts from './pages/AdminPostsPage';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member" element={<Member />} />
          <Route path="/bokning" element={<Bokning />} />
          <Route path="/gig" element={<Gig />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="posts" element={<AdminPosts />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App