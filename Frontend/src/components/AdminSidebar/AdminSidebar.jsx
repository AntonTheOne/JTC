import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">JTC</div>
        <div className="admin-sidebar-sub">Admin</div>
      </div>

      <nav className="admin-nav">
        <Link to="/admin" className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link to="/admin/posts" className={`admin-nav-item ${isActive('/admin/posts') ? 'active' : ''}`}>
          Inlägg
        </Link>
        <Link to="/admin/gigs" className={`admin-nav-item ${isActive('/admin/gigs') ? 'active' : ''}`}>
          Spelningar
        </Link>
        <Link to="/admin/members" className={`admin-nav-item ${isActive('/admin/members') ? 'active' : ''}`}>
          Medlemmar
        </Link>
        <Link to="/admin/gallery" className={`admin-nav-item ${isActive('/admin/gallery') ? 'active' : ''}`}>
          Galleri
        </Link>
        <Link to="/admin/bokning" className={`admin-nav-item ${isActive('/admin/bokning') ? 'active' : ''}`}>
          Bokningar
        </Link>
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/" className="admin-back-link">← Till hemsidan</Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;