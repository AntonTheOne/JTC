import { useEffect, useState } from 'react';
import { getMembers, addMember, updateMember, deleteMember } from '../../services/memberService';
import './AdminMembers.css';

function AdminMembers() {
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [form, setForm] = useState({ name: '', role: '', bio: '', imageUrl: '' });

    const loadMembers = () => {
        getMembers()
            .then(data => setMembers(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadMembers();
    }, []);

    const openCreateForm = () => {
        setForm({ name: '', role: '', bio: '', imageUrl: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (member) => {
        setForm({
            name: member.name || '',
            role: member.role || '',
            bio: member.bio || '',
            imageUrl: member.imageUrl || '',
        });
        setEditingId(member.id);
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
            await updateMember(editingId, form);
        } else {
            await addMember(form);
        }

        closeForm();
        loadMembers();
    };

    const handleDelete = async (id) => {
        await deleteMember(id);
        setConfirmDeleteId(null);
        loadMembers();
    };

    return (
        <div className="admin-members-section">
            <div className="admin-members-header">
                <h1>Medlemmar</h1>
                <button className="admin-members-create-btn" onClick={openCreateForm}>
                    + Lägg till medlem
                </button>
            </div>

            <div className="admin-members-card">
                {members.length === 0 && (
                    <div className="admin-members-empty">Inga medlemmar än.</div>
                )}
                {members.map(member => (
                    <div key={member.id} className="admin-members-row">
                        <div className="admin-members-thumb">
                            {member.imageUrl ? (
                                <img src={member.imageUrl} alt={member.name} />
                            ) : (
                                <div className="admin-members-thumb-placeholder">
                                    {member.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                            )}
                        </div>
                        <div className="admin-members-info">
                            <div className="admin-members-name">{member.name}</div>
                            <div className="admin-members-role">{member.role}</div>
                        </div>
                        <div className="admin-members-actions">
                            <button
                                className="admin-members-icon-btn edit"
                                onClick={() => openEditForm(member)}
                                title="Redigera"
                            >
                                ✎
                            </button>
                            <button
                                className="admin-members-icon-btn delete"
                                onClick={() => setConfirmDeleteId(member.id)}
                                title="Ta bort"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="admin-members-modal-overlay" onClick={closeForm}>
                    <div className="admin-members-modal" onClick={e => e.stopPropagation()}>
                        <h2>{editingId ? 'Redigera medlem' : 'Ny medlem'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-members-field">
                                <label>Namn</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-members-field">
                                <label>Roll</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    placeholder="T.ex. Sångare, Gitarrist"
                                    required
                                />
                            </div>
                            <div className="admin-members-field">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </div>
                            <div className="admin-members-field">
                                <label>Bild-URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="admin-members-modal-actions">
                                <button type="button" className="admin-members-cancel-btn" onClick={closeForm}>
                                    Avbryt
                                </button>
                                <button type="submit" className="admin-members-save-btn">
                                    Spara
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDeleteId && (
                <div className="admin-members-modal-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="admin-members-modal admin-members-modal-small" onClick={e => e.stopPropagation()}>
                        <h2>Är du säker?</h2>
                        <p>Medlemmen kommer tas bort permanent.</p>
                        <div className="admin-members-modal-actions">
                            <button className="admin-members-cancel-btn" onClick={() => setConfirmDeleteId(null)}>
                                Avbryt
                            </button>
                            <button className="admin-members-delete-btn" onClick={() => handleDelete(confirmDeleteId)}>
                                Ta bort
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminMembers;