import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './AdminLayout.css';

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <button className="logout-btn" onClick={handleLogout}>Logga ut</button>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;