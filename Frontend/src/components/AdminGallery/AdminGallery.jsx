import { useEffect, useState } from 'react';
import './AdminGallery.css';

function AdminGallery() {
    const [images, setImages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [form, setForm] = useState({ imageUrl: '', caption: '' });

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = () => {
        fetch('http://localhost:8000/api/gallery')
            .then(res => res.json())
            .then(data => setImages(data));
    };

    const openCreateForm = () => {
        setForm({ imageUrl: '', caption: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (image) => {
        setForm({
            imageUrl: image.imageUrl || '',
            caption: image.caption || '',
        });
        setEditingId(image.id);
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

        if (editingId) {
            await fetch(`http://localhost:8000/api/gallery/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingId, ...form }),
            });
        } else {
            await fetch('http://localhost:8000/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        }

        closeForm();
        loadImages();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/api/gallery/${id}`, {
            method: 'DELETE',
        });
        setConfirmDeleteId(null);
        loadImages();
    };

    return (
        <div className="admin-gallery-section">
            <div className="admin-gallery-header">
                <h1>Galleri</h1>
                <button className="admin-gallery-create-btn" onClick={openCreateForm}>
                    + Lägg till bild
                </button>
            </div>

            <div className="admin-gallery-card">
                {images.length === 0 ? (
                    <div className="admin-gallery-empty">Inga bilder än.</div>
                ) : (
                    <div className="admin-gallery-grid">
                        {images.map(image => (
                            <div key={image.id} className="admin-gallery-tile">
                                {image.imageUrl ? (
                                    <img src={image.imageUrl} alt={image.caption || ''} />
                                ) : (
                                    <div className="admin-gallery-placeholder">Ingen bild</div>
                                )}
                                <div className="admin-gallery-tile-actions">
                                    <button
                                        className="admin-gallery-tile-btn"
                                        onClick={() => openEditForm(image)}
                                        title="Redigera"
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className="admin-gallery-tile-btn"
                                        onClick={() => setConfirmDeleteId(image.id)}
                                        title="Ta bort"
                                    >
                                        🗑
                                    </button>
                                </div>
                                {image.caption && (
                                    <div className="admin-gallery-tile-caption">
                                        {image.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <div className="admin-gallery-modal-overlay" onClick={closeForm}>
                    <div className="admin-gallery-modal" onClick={e => e.stopPropagation()}>
                        <h2>{editingId ? 'Redigera bild' : 'Ny bild'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-gallery-field">
                                <label>Bild-URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div className="admin-gallery-field">
                                <label>Bildtext</label>
                                <input
                                    type="text"
                                    name="caption"
                                    value={form.caption}
                                    onChange={handleChange}
                                    placeholder="T.ex. Liveframträdande på Pustervik"
                                />
                            </div>
                            {form.imageUrl && (
                                <div className="admin-gallery-preview">
                                    <img src={form.imageUrl} alt="Förhandsvisning" />
                                </div>
                            )}
                            <div className="admin-gallery-modal-actions">
                                <button type="button" className="admin-gallery-cancel-btn" onClick={closeForm}>
                                    Avbryt
                                </button>
                                <button type="submit" className="admin-gallery-save-btn">
                                    Spara
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDeleteId && (
                <div className="admin-gallery-modal-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="admin-gallery-modal admin-gallery-modal-small" onClick={e => e.stopPropagation()}>
                        <h2>Är du säker?</h2>
                        <p>Bilden kommer tas bort permanent.</p>
                        <div className="admin-gallery-modal-actions">
                            <button className="admin-gallery-cancel-btn" onClick={() => setConfirmDeleteId(null)}>
                                Avbryt
                            </button>
                            <button className="admin-gallery-delete-btn" onClick={() => handleDelete(confirmDeleteId)}>
                                Ta bort
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminGallery;