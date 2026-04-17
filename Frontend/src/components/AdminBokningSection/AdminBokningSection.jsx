import { useEffect, useState } from 'react';
import './AdminBokningSection.css';

function AdminBokningSection() {
    const [bookings, setBookings] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [responses, setResponses] = useState({});
    const [statuses, setStatuses] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/api/bookingrequest')
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const handleStatusChange = (id, status) => {
        setStatuses(prev => ({ ...prev, [id]: status }));
    };

    const handleResponseChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (booking) => {
        const status = statuses[booking.id] || booking.status;
        const adminResponse = responses[booking.id] || '';

        await fetch(`http://localhost:8000/api/bookingrequest/${booking.id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, adminResponse }),
        });

        setBookings(prev =>
            prev.map(b => b.id === booking.id ? { ...b, status, adminResponse } : b)
        );
        setExpandedId(null);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'Confirmed': return 'Bekräftad';
            case 'Declined': return 'Nekad';
            default: return 'Väntar';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Confirmed': return 'badge badge-confirmed';
            case 'Declined': return 'badge badge-declined';
            default: return 'badge badge-pending';
        }
    };

    return (
        <div className="admin-bokning-section">
            <div className="bokning-card">
                {bookings.map(booking => (
                    <div key={booking.id} className="bokning-row">
                        <div
                            className="bokning-row-header"
                            onClick={() => toggleExpand(booking.id)}
                        >
                            <div className="bokning-row-info">
                                <span className="bokning-name">{booking.contactName}</span>
                                <span className="bokning-date">
                                    Event: {new Date(booking.eventDate).toLocaleDateString('sv-SE')}
                                </span>
                            </div>
                            <span className={getStatusClass(booking.status)}>
                                {getStatusLabel(booking.status)}
                            </span>
                            <span className="bokning-arrow">
                                {expandedId === booking.id ? '∨' : '›'}
                            </span>
                        </div>

                        {expandedId === booking.id && (
                            <div className="bokning-details">
                                <div className="bokning-details-grid">
                                    <div>
                                        <div className="field-label">E-post</div>
                                        <div className="field-val">{booking.email}</div>
                                    </div>
                                    <div>
                                        <div className="field-label">Skickad</div>
                                        <div className="field-val">
                                            {new Date(booking.createdAt).toLocaleDateString('sv-SE')}
                                        </div>
                                    </div>
                                </div>
                                <div className="bokning-message">
                                    <div className="field-label">Meddelande</div>
                                    <div className="field-val field-italic">"{booking.message}"</div>
                                </div>
                                {booking.adminResponse && (
                                    <div className="bokning-previous-response">
                                        <div className="field-label">Tidigare svar</div>
                                        <div className="field-val">{booking.adminResponse}</div>
                                    </div>
                                )}
                                <div className="status-row">
                                    {['Pending', 'Confirmed', 'Declined'].map(s => (
                                        <button
                                            key={s}
                                            className={`status-btn ${(statuses[booking.id] || booking.status) === s ? 'status-btn-active' : ''}`}
                                            onClick={() => handleStatusChange(booking.id, s)}
                                        >
                                            {getStatusLabel(s)}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="bokning-textarea"
                                    placeholder="Skriv ett svar till arrangören..."
                                    value={responses[booking.id] ?? (booking.adminResponse || '')}
                                    onChange={e => handleResponseChange(booking.id, e.target.value)}
                                />
                                <button
                                    className="bokning-submit-btn"
                                    onClick={() => handleSubmit(booking)}
                                >
                                    Spara
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBokningSection;