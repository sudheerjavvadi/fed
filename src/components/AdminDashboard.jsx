// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentAdminChat from './StudentAdminChat';
import CreateWorkshop from './CreateWorkshop';
import StudentManagement from './StudentManagement';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import AdminAnalytics from './AdminAnalytics';
import TrainingMaterials from './TrainingMaterials';
import WorkshopScheduling from './WorkshopScheduling';
import RegistrationManagement from './RegistrationManagement';
import AdminResources from './AdminResources';

const defaultWorkshopsData = [
  { id: 'wk-1', title: "Advanced React Patterns", topic: "Technology", scheduleDate: "Aug 15, 2024", scheduleTime: "7:30 PM" },
  { id: 'wk-2', title: "UI/UX Design Fundamentals", topic: "Arts", scheduleDate: "Aug 20, 2024", scheduleTime: "11:50 AM" },
];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [customWorkshops, setCustomWorkshops] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customWorkshops');
      if (raw) {
        setCustomWorkshops(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error loading custom workshops', err);
    }
  }, []);

  const allWorkshops = [...defaultWorkshopsData, ...customWorkshops];

  const handleDeleteWorkshop = (id) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      const updated = customWorkshops.filter(w => w.id !== id);
      setCustomWorkshops(updated);
      localStorage.setItem('customWorkshops', JSON.stringify(updated));
    }
  };

  // Determine which nav item is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 64, height: 40, background: '#602484', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderRadius: 4 }}>WF</div>
            <div>
              <h3 style={{ margin: 0, color: '#602484' }}>WorkshopFlow</h3>
            </div>
          </div>
        </div>
        <div className="sidebar-header">
            <Link to="/" className="nav-link">Workshops</Link>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`nav-item ${isActive('/admin')}`}> Dashboard</Link>
          <Link to="/admin/analytics" className={`nav-item ${isActive('/admin/analytics')}`}> Analytics</Link>
          <Link to="/admin/registrations" className={`nav-item ${isActive('/admin/registrations')}`}> Registrations</Link>
          <Link to="/admin/students" className={`nav-item ${isActive('/admin/students')}`}> Students</Link>
          <Link to="/admin/scheduling" className={`nav-item ${isActive('/admin/scheduling')}`}> Scheduling</Link>
          <Link to="/admin/materials" className={`nav-item ${isActive('/admin/materials')}`}> Materials</Link>
          <Link to="/admin/resources" className={`nav-item ${isActive('/admin/resources')}`}>Open Resources</Link>
          <Link to="/admin/workshops" className={`nav-item ${isActive('/admin/workshops')}`}> Workshops</Link>
          <Link to="/admin/create-workshop" className={`nav-item ${isActive('/admin/create-workshop')}`}>➕ Create Workshop</Link>
          <Link to="/admin/reports" className={`nav-item ${isActive('/admin/reports')}`}> Reports</Link>
          <Link to="/admin/settings" className={`nav-item ${isActive('/admin/settings')}`}> Settings</Link>
        </nav>

        <div className="admin-user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <div className="user-name">Admin User</div>
            <div className="user-email">admin@worknest.com</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="dashboard-header-bar">
          <button 
             onClick={() => setIsChatOpen(!isChatOpen)} 
             className="admin-chat-button"
             title="Chat with Students"
          >
              Student Messages
          </button>
          <button 
             onClick={logout} 
             className="logout-button"
          >
             Logout
          </button>
        </div>

        <Routes>
          {/* Default Dashboard */}
          <Route path="/" element={
            <>
              <h2 className="dashboard-title">Admin Dashboard</h2>
              <div className="dashboard-section-header">
                <h3>Manage Workshops</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link to="/admin/create-workshop" className="create-workshop-button">+ Create Workshop</Link>
                  <Link to="/admin/scheduling" className="create-workshop-button">+ Create Training Session</Link>
                </div>
              </div>

              {/* Workshop Table */}
              <table className="workshop-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Schedule</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allWorkshops.map((workshop) => (
                    <tr key={workshop.id}>
                      <td className="table-title">{workshop.title}</td>
                      <td className="table-category">{workshop.topic || workshop.category}</td>
                      <td className="table-schedule">{workshop.scheduleDate} {workshop.scheduleTime}</td>
                      <td>{workshop.id.includes('custom') ? ' Custom' : ' Default'}</td>
                      <td className="table-actions">
                        <span className="action-link">Edit</span>
                        {workshop.id.includes('custom') && (
                          <>
                            {' | '}
                            <span 
                              className="action-link delete"
                              onClick={() => handleDeleteWorkshop(workshop.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              Delete
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          } />

          {/* Admin Analytics Route */}
          <Route path="/analytics" element={<AdminAnalytics />} />

          {/* Registration Management Route */}
          <Route path="/registrations" element={<RegistrationManagement />} />

          {/* Student Management Route */}
          <Route path="/students" element={<StudentManagement />} />

          {/* Workshop Scheduling Route */}
          <Route path="/scheduling" element={<WorkshopScheduling />} />

          {/* Training Materials Route */}
          <Route path="/materials" element={<TrainingMaterials />} />

          {/* Admin Open Resources */}
          <Route path="/resources" element={<AdminResources />} />

          {/* Workshops Management Route */}
          <Route path="/workshops" element={
            <>
              <h2 className="dashboard-title">Workshop Management</h2>
              <div className="dashboard-section-header">
                <h3>All Workshops</h3>
                <Link to="/admin/create-workshop" className="create-workshop-button">+ Create Workshop</Link>
              </div>

              <table className="workshop-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Schedule</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allWorkshops.map((workshop) => (
                    <tr key={workshop.id}>
                      <td className="table-title">{workshop.title}</td>
                      <td className="table-category">{workshop.topic || workshop.category}</td>
                      <td className="table-schedule">{workshop.scheduleDate} {workshop.scheduleTime}</td>
                      <td>{workshop.id.includes('custom') ? '🆕 Custom' : '📌 Default'}</td>
                      <td className="table-actions">
                        <span className="action-link">Edit</span>
                        {workshop.id.includes('custom') && (
                          <>
                            {' | '}
                            <span 
                              className="action-link delete"
                              onClick={() => handleDeleteWorkshop(workshop.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              Delete
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          } />

          {/* Create Workshop Route */}
          <Route path="/create-workshop" element={<CreateWorkshop />} />

          {/* Reports Route */}
          <Route path="/reports" element={<AdminReports />} />

          {/* Settings Route */}
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>

      {/* Chat Modal */}
      <StudentAdminChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <style jsx>{`
        .dashboard-header-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e0e0e0;
          background: #f9f9f9;
        }

        .admin-chat-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 14px;
        }

        .admin-chat-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .admin-chat-button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;