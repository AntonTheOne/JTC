import { useState } from 'react';
import { apiPost } from '../../services/api';
import './BokningSection.css';

function BokningSection() {
  const [form, setForm] = useState({
    contactName: '',
    email: '',
    eventDate: '',
    message: ''
  });

  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await apiPost('/api/bookingrequest', form);
    setSent(true);
  }

  return (
    <section className="bokning-section">
      <div className="bokning-header">
        <h2 className="bokning-heading">Boka JTC</h2>
        <p className="bokning-intro">Är ni intresserade av att boka JTC? Fyll i formuläret så hör vi av oss så snart vi kan med besked!</p>
      </div>

      {sent ? (
        <p className="bokning-success">Tack för din förfrågan! Vi återkommer så snart vi kan.</p>
      ) : (
        <>
          <div className="bokning-grid">
            <div className="bokning-field">
              <label>Namn</label>
              <input type="text" name="contactName" placeholder="Ditt namn" value={form.contactName} onChange={handleChange} />
            </div>
            <div className="bokning-field">
              <label>E-post</label>
              <input type="email" name="email" placeholder="din@mail.se" value={form.email} onChange={handleChange} />
            </div>
            <div className="bokning-field">
              <label>Datum</label>
              <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
            </div>
            <div className="bokning-field">
              <label>Plats</label>
              <input type="text" name="venue" placeholder="Evenemangplats" value={form.venue || ''} onChange={handleChange} />
            </div>
          </div>

          <div className="bokning-field">
            <label>Meddelande</label>
            <textarea name="message" placeholder="Berätta mer om ert event..." value={form.message} onChange={handleChange} />
          </div>

          <div className="bokning-footer">
            <div className="bokning-kontakt">
              <span>Mail: <a href="mailto:JTCcoverband@gmail.com">JTCcoverband@gmail.com</a></span>
              <span>Facebook: <a href="https://www.facebook.com/JTC.band" target="_blank" rel="noreferrer">facebook.com/JTC.band</a></span>
            </div>
            <button className="bokning-btn" onClick={handleSubmit}>Skicka förfrågan</button>
          </div>
        </>
      )}
    </section>
  );
}

export default BokningSection;