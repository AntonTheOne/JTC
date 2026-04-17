import { useEffect, useState } from 'react';
import './AdminGigs.css';

function AdminGigs() {
    const [gigs, setGigs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [form, setForm] = useState({ venue: '', city: '', date: '', ticketUrl: '' });

    useEffect(() => {
        loadGigs();
    }, []);

    const loadGigs = () => {
        fetch('http://localhost:8000/api/gig')
            .then(res => res.json())
            .then(data => setGigs(data));
    };

    const openCreateForm = () => {
        setForm({ venue: '', city: '', date: '', ticketUrl: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (gig) => {
        setForm({
            venue: gig.venue || '',
            city: gig.city || '',
            date: gig.date ? gig.date.substring(0, 16) : '',
            ticketUrl: gig.ticketUrl || '',
        });
        setEditingId(gig.id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            venue: form.venue,
            city: form.city,
            date: form.date ? new Date(form.date).toISOString() : null,
            ticketUrl: form.ticketUrl,
        };

        if (editingId) {
            await fetch(`http://localhost:8000/api/gig/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingId, ...payload }),
            });
        } else {
            await fetch('http://localhost:8000/api/gig', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }

        closeForm();
        loadGigs();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/api/gig/${id}`, {
            method: 'DELETE',
        });
        setConfirmDeleteId(null);
        loadGigs();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('sv-SE');
    };

    return (
        <div className="admin-gigs-section">
            <div className="admin-gigs-header">
                <h1>Spelningar</h1>
                <button className="admin-gigs-create-btn" onClick={openCreateForm}>
                    + Skapa spelning
                </button>
            </div>

            <div className="admin-gigs-card">
                {gigs.length === 0 && (
                    <div className="admin-gigs-empty">Inga spelningar än.</div>
                )}
                {gigs.map(gig => (
                    <div key={gig.id} className="admin-gigs-row">
                        <div className="admin-gigs-info">
                            <div className="admin-gigs-venue">{gig.venue}</div>
                            <div className="admin-gigs-meta">
                                {gig.city} &nbsp;·&nbsp; {formatDate(gig.date)}
                            </div>
                        </div>
                        <div className="admin-gigs-actions">
                            <button
                                className="admin-gigs-icon-btn edit"
                                onClick={() => openEditForm(gig)}
                                title="Redigera"
                            >
                                ✎
                            </button>
                            <button
                                className="admin-gigs-icon-btn delete"
                                onClick={() => setConfirmDeleteId(gig.id)}
                                title="Ta bort"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="admin-gigs-modal-overlay" onClick={closeForm}>
                    <div className="admin-gigs-modal" onClick={e => e.stopPropagation()}>
                        <h2>{editingId ? 'Redigera spelning' : 'Ny spelning'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-gigs-field">
                                <label>Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={form.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-gigs-field">
                                <label>Stad</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-gigs-field">
                                <label>Datum & tid</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-gigs-field">
                                <label>Biljettlänk (valfri)</label>
                                <input
                                    type="url"
                                    name="ticketUrl"
                                    value={form.ticketUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="admin-gigs-modal-actions">
                                <button type="button" className="admin-gigs-cancel-btn" onClick={closeForm}>
                                    Avbryt
                                </button>
                                <button type="submit" className="admin-gigs-save-btn">
                                    Spara
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDeleteId && (
                <div className="admin-gigs-modal-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="admin-gigs-modal admin-gigs-modal-small" onClick={e => e.stopPropagation()}>
                        <h2>Är du säker?</h2>
                        <p>Spelningen kommer tas bort permanent.</p>
                        <div className="admin-gigs-modal-actions">
                            <button className="admin-gigs-cancel-btn" onClick={() => setConfirmDeleteId(null)}>
                                Avbryt
                            </button>
                            <button className="admin-gigs-delete-btn" onClick={() => handleDelete(confirmDeleteId)}>
                                Ta bort
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminGigs;