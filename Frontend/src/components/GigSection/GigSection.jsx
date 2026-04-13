import { useEffect, useState } from 'react';
import { getAllGigs } from '../../services/GigService';
import './GigSection.css';

function GigSection() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    getAllGigs().then(data => setGigs(data));
  }, []);

  return (
    <section className="gig-section">
      <h2 className="gig-heading">Spelningar</h2>
      <div className="gig-grid">
        {gigs.map(gig => (
          <div key={gig.id} className="gig-card">
            <div className="gig-img-wrap">
              {gig.imageUrl && (
                <img src={gig.imageUrl} alt={gig.venue} className="gig-img" />
              )}
              <div className="gig-date-badge">
                {new Date(gig.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div className="gig-body">
              <div className="gig-venue">{gig.venue}</div>
              <div className="gig-city">{gig.city}</div>
              {gig.ticketUrl && (
                <a href={gig.ticketUrl} target="_blank" rel="noreferrer" className="gig-ticket">Köp biljetter</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GigSection;