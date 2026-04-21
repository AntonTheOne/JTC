import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import { getAllGigs } from '../services/GigService';
import { getAllBookings } from '../services/bookingService';
import './PagesCss/AdminHome.css';

function AdminHome() {
  const [posts, setPosts] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllPosts().then(data => setPosts(data));
    getAllGigs().then(data => setGigs(data));
    getAllBookings().then(data => setBookings(data));
  }, []);

  const pendingBookings = bookings.filter(b => b.status === 'Pending');

  return (
    <div className="admin-home">
      <div className="admin-home-header">
        <h1 className="admin-home-title">Dashboard</h1>
        <p className="admin-home-sub">Välkommen till JTC admin!</p>
      </div>

      <div className="admin-stat-cards">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Inlägg</div>
          <div className="admin-stat-number">{posts.length}</div>
          <div className="admin-stat-sub">publicerade</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Spelningar</div>
          <div className="admin-stat-number">{gigs.length}</div>
          <div className="admin-stat-sub">tillagda</div>
        </div>
        <div className="admin-stat-card highlight">
          <div className="admin-stat-label">Bokningar</div>
          <div className="admin-stat-number">{pendingBookings.length}</div>
          <div className="admin-stat-sub">väntar på svar</div>
        </div>
      </div>

      <div className="admin-recent">
        <div className="admin-recent-header">
          <h2 className="admin-recent-title">Senaste bokningsförfrågningar</h2>
        </div>
        {pendingBookings.length === 0 ? (
          <p className="admin-recent-empty">Inga väntande bokningar!</p>
        ) : (
          pendingBookings.map(booking => (
            <div key={booking.id} className="admin-recent-row">
              <div>
                <div className="admin-recent-name">{booking.contactName}</div>
                <div className="admin-recent-date">
                  {new Date(booking.eventDate).toLocaleDateString('sv-SE')}
                </div>
              </div>
              <span className="admin-badge pending">Väntar</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminHome;