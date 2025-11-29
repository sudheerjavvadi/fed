import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegistrationManagement() {
  const { registrations } = useAuth();
  const [registrationList, setRegistrationList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('registrations');
      if (raw) {
        const parsedRegs = JSON.parse(raw);
        setRegistrationList(parsedRegs);
      }
    } catch (err) {
      console.error('Error loading registrations', err);
      setRegistrationList(registrations || []);
    }
  }, [registrations]);

  const handleApproveRegistration = (index) => {
    const updated = [...registrationList];
    if (updated[index]) {
      updated[index].status = 'approved';
      localStorage.setItem('registrations', JSON.stringify(updated));
      setRegistrationList(updated);
    }
  };

  const handleRejectRegistration = (index) => {
    const updated = [...registrationList];
    if (updated[index]) {
      updated[index].status = 'rejected';
      localStorage.setItem('registrations', JSON.stringify(updated));
      setRegistrationList(updated);
    }
  };

  const handleDeleteRegistration = (index) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      const updated = registrationList.filter((_, i) => i !== index);
      localStorage.setItem('registrations', JSON.stringify(updated));
      setRegistrationList(updated);
    }
  };

  const getWorkshopName = (id) => {
    const workshops = {
      'wk-1': 'Advanced React Patterns',
      'wk-2': 'UI/UX Design Fundamentals'
    };
    return workshops[id] || id;
  };

  const filteredRegistrations = registrationList.filter(reg => {
    const matchesFilter = filter === 'all' || reg.status === filter;
    const matchesSearch = searchTerm === '' || 
      reg.workshopTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.workshopId.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'approved':
        return { bg: '#c8e6c9', color: '#2e7d32' };
      case 'rejected':
        return { bg: '#ffccbc', color: '#d84315' };
      case 'pending':
        return { bg: '#ffe0b2', color: '#e65100' };
      default:
        return { bg: '#e0e0e0', color: '#333' };
    }
  };

  const stats = {
    total: registrationList.length,
    approved: registrationList.filter(r => r.status === 'approved').length,
    pending: registrationList.filter(r => r.status === 'pending').length,
    rejected: registrationList.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">📋 Registration Management</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)' }}>
            📊
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Registrations</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4caf50, #66bb6a)' }}>
            ✓
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff9800, #ffb74d)' }}>
            ⏳
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f44336, #ef5350)' }}>
            ✗
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="registration-controls">
        <div className="search-box">
          <input 
            type="text"
            placeholder="🔍 Search by workshop or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-section">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            ✓ Approved ({stats.approved})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            ⏳ Pending ({stats.pending})
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            ✗ Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Workshop</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">No registrations found</td>
              </tr>
            ) : (
              filteredRegistrations.map((reg, index) => {
                const statusColor = getStatusBadgeColor(reg.status || 'pending');
                return (
                  <tr key={index}>
                    <td>
                      <div className="workshop-info">
                        <strong>{getWorkshopName(reg.workshopId)}</strong>
                        <small>{reg.workshopId}</small>
                      </div>
                    </td>
                    <td>
                      {new Date(reg.registrationDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span 
                        className="status-badge"
                        style={statusColor}
                      >
                        {reg.status === 'approved' && '✓ Approved'}
                        {reg.status === 'rejected' && '✗ Rejected'}
                        {reg.status === 'pending' && '⏳ Pending'}
                      </span>
                    </td>
                    <td>
                      <span className="priority-badge">
                        {Math.random() > 0.5 ? '🔴 High' : '🟢 Normal'}
                      </span>
                    </td>
                    <td className="action-cell">
                      {reg.status === 'pending' && (
                        <>
                          <button 
                            className="action-btn view"
                            onClick={() => handleApproveRegistration(index)}
                          >
                            ✓ Approve
                          </button>
                          <button 
                            className="action-btn message"
                            onClick={() => handleRejectRegistration(index)}
                          >
                            ✗ Reject
                          </button>
                        </>
                      )}
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteRegistration(index)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="bulk-actions">
        <h3>📤 Bulk Actions</h3>
        <div className="action-buttons">
          <button className="btn-bulk">📧 Send Notifications</button>
          <button className="btn-bulk">📥 Export to CSV</button>
          <button className="btn-bulk">📊 Generate Report</button>
        </div>
      </div>
    </div>
  );
}
