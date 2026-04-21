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
import AdminBokning from './pages/AdminBokning';
import AdminGigsPage from './pages/AdminGigs';
import AdminMembersPage from './pages/AdminMembersPage';
import AdminGalleryPage from './pages/AdminGalleryPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<AdminHome />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="bokning" element={<AdminBokning />} />
            <Route path="gigs" element={<AdminGigsPage />} />
            <Route path="members" element={<AdminMembersPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App