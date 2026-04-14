import { useEffect, useState } from 'react';
import { getAllPosts, addPost, deletePost, updatePost } from '../../services/postService';
import './AdminPosts.css';

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    imageUrl: '',
    createdAt: new Date().toISOString().split('T')[0]
  });
  const [editingPost, setEditingPost] = useState(null);

  function handleEdit(post) {
  setEditingPost(post);
  setForm(post);
  setShowForm(true);
}

  useEffect(() => {
    getAllPosts().then(data => setPosts(data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit() {
  if (editingPost) {
    await updatePost({ ...form, id: editingPost.id });
  } else {
    await addPost(form);
  }

  const updated = await getAllPosts();
  setPosts(updated);

  setShowForm(false);
  setEditingPost(null);

  setForm({
    title: '',
    content: '',
    imageUrl: '',
    createdAt: new Date().toISOString().split('T')[0]
  });
}

  async function handleDelete(id) {
    if (!confirm("Är du säker på att du vill ta bort detta inlägg?")) return;

    await deletePost(id);

    const updated = await getAllPosts();
    setPosts(updated);
  }



  return (
    <div className="admin-posts">
      <div className="admin-posts-header">
        <h1 className="admin-posts-title">Inlägg</h1>
        <button className="admin-btn-red" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Avbryt' : '+ Skapa inlägg'}
        </button>
      </div>

      {showForm && (
        <div className="admin-posts-form">
          <div className="admin-posts-form-title">Nytt inlägg</div>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Titel</label>
              <input type="text" name="title" placeholder="Rubrik..." value={form.title} onChange={handleChange} />
            </div>
            <div className="admin-form-field">
              <label>Bild URL</label>
              <input type="text" name="imageUrl" placeholder="https://..." value={form.imageUrl} onChange={handleChange} />
            </div>
          </div>
          <div className="admin-form-field">
            <label>Innehåll</label>
            <textarea name="content" placeholder="Skriv något..." value={form.content} onChange={handleChange} />
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-ghost" onClick={() => setShowForm(false)}>Avbryt</button>
            <button className="admin-btn-red" onClick={handleSubmit}>{editingPost ? "Uppdatera" : "Lägg till"}</button>
          </div>
        </div>
      )}

      <div className="admin-posts-list">
        {posts.map(post => (
          <div key={post.id} className="admin-post-row">
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="admin-post-img" />}
            <div className="admin-post-info">
              <div className="admin-post-title">{post.title}</div>
              <div className="admin-post-date">{new Date(post.createdAt).toLocaleDateString('sv-SE')}</div>
            </div>
            <div className="admin-post-actions">
              <button className="admin-icon-btn edit" onClick={() => handleEdit(post)}> ✏️</button>
              <button className="admin-icon-btn delete" onClick={() => handleDelete(post.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPosts;