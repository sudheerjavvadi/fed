import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function WorkshopScheduling() {
  const { registrations } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [workshopSessions, setWorkshopSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    workshopId: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: 30,
    instructor: '',
    location: 'Online',
    status: 'scheduled'
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('workshopSchedules');
      if (raw) {
        setSchedule(JSON.parse(raw));
      }

      const sessionsRaw = localStorage.getItem('workshopSessions');
      if (sessionsRaw) {
        setWorkshopSessions(JSON.parse(sessionsRaw));
      }
    } catch (err) {
      console.error('Error loading schedules', err);
    }
  }, []);

  const handleAddSchedule = (e) => {
    e.preventDefault();

    if (!formData.workshopId || !formData.date || !formData.startTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newSchedule = {
      id: `schedule-${Date.now()}`,
      ...formData,
      createdDate: new Date().toLocaleDateString(),
      enrolledCount: Math.floor(Math.random() * 20)
    };

    const updated = [...schedule, newSchedule];
    setSchedule(updated);
    localStorage.setItem('workshopSchedules', JSON.stringify(updated));

    // Also add/update a corresponding entry in `workshopSessions` so students see it
    try {
      const sessionsRaw = localStorage.getItem('workshopSessions');
      const sessions = sessionsRaw ? JSON.parse(sessionsRaw) : [];
      const newSession = {
        id: newSchedule.id,
        workshopId: newSchedule.workshopId,
        title: getWorkshopName(newSchedule.workshopId),
        date: newSchedule.date,
        time: newSchedule.startTime,
        duration: newSchedule.endTime ? `${newSchedule.startTime} - ${newSchedule.endTime}` : newSchedule.startTime,
        instructor: newSchedule.instructor,
        location: newSchedule.location,
        capacity: newSchedule.capacity,
        status: newSchedule.status,
        description: '',
        enrolled: newSchedule.enrolledCount || 0
      };

      const updatedSessions = [...sessions, newSession];
      localStorage.setItem('workshopSessions', JSON.stringify(updatedSessions));
      setWorkshopSessions(updatedSessions);
    } catch (err) {
      console.error('Failed to sync workshopSessions', err);
    }

    setFormData({
      workshopId: '',
      date: '',
      startTime: '',
      endTime: '',
      capacity: 30,
      instructor: '',
      location: 'Online',
      status: 'scheduled'
    });
    setShowForm(false);
    alert('Workshop schedule added successfully!');
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm('Delete this schedule?')) {
      const updated = schedule.filter(s => s.id !== id);
      setSchedule(updated);
      localStorage.setItem('workshopSchedules', JSON.stringify(updated));

      // Remove from workshopSessions as well
      try {
        const sessionsRaw = localStorage.getItem('workshopSessions');
        if (sessionsRaw) {
          const sessions = JSON.parse(sessionsRaw).filter(ss => ss.id !== id);
          localStorage.setItem('workshopSessions', JSON.stringify(sessions));
          setWorkshopSessions(sessions);
        }
      } catch (err) {
        console.error('Failed to remove session from workshopSessions', err);
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = schedule.map(s => 
      s.id === id ? {...s, status: newStatus} : s
    );
    setSchedule(updated);
    localStorage.setItem('workshopSchedules', JSON.stringify(updated));

    // Update status in workshopSessions too
    try {
      const sessionsRaw = localStorage.getItem('workshopSessions');
      if (sessionsRaw) {
        const sessions = JSON.parse(sessionsRaw).map(ss => ss.id === id ? {...ss, status: newStatus} : ss);
        localStorage.setItem('workshopSessions', JSON.stringify(sessions));
        setWorkshopSessions(sessions);
      }
    } catch (err) {
      console.error('Failed to sync status to workshopSessions', err);
    }
  };

  const getWorkshopName = (id) => {
    const workshops = [
      { id: 'wk-1', title: 'Advanced React Patterns' },
      { id: 'wk-2', title: 'UI/UX Design Fundamentals' }
    ];
    return workshops.find(w => w.id === id)?.title || id;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return '#bbdefb';
      case 'ongoing': return '#fff9c4';
      case 'completed': return '#c8e6c9';
      case 'cancelled': return '#ffccbc';
      default: return '#e0e0e0';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'scheduled': return '📅 Scheduled';
      case 'ongoing': return '🔴 Ongoing';
      case 'completed': return '✓ Completed';
      case 'cancelled': return '✗ Cancelled';
      default: return status;
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">📅 Workshop Scheduling</h1>

      {/* Add Schedule Form */}
      {showForm ? (
        <div className="schedule-form-container">
          <h2>Add New Workshop Schedule</h2>
          <form onSubmit={handleAddSchedule}>
            <div className="form-row">
              <div className="form-group">
                <label>Workshop *</label>
                <select
                  value={formData.workshopId}
                  onChange={(e) => setFormData({...formData, workshopId: e.target.value})}
                >
                  <option value="">Select Workshop</option>
                  <option value="wk-1">Advanced React Patterns</option>
                  <option value="wk-2">UI/UX Design Fundamentals</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  placeholder="Instructor name"
                />
              </div>

              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                  min="1"
                  max="500"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="Online">Online</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">Add Schedule</button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button className="btn-upload" onClick={() => setShowForm(true)}>
          ➕ Add New Schedule
        </button>
      )}

      {/* Schedule Table */}
      <div className="schedule-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Workshop</th>
              <th>Date & Time</th>
              <th>Instructor</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-message">No schedules created yet</td>
              </tr>
            ) : (
              schedule.map(sched => (
                <tr key={sched.id}>
                  <td><strong>{getWorkshopName(sched.workshopId)}</strong></td>
                  <td>
                    {sched.date} <br/>
                    <small>{sched.startTime} - {sched.endTime}</small>
                  </td>
                  <td>{sched.instructor || 'TBD'}</td>
                  <td>{sched.location}</td>
                  <td>{sched.capacity}</td>
                  <td>{sched.enrolledCount}</td>
                  <td>
                    <select 
                      className="status-select"
                      style={{ backgroundColor: getStatusColor(sched.status) }}
                      value={sched.status}
                      onChange={(e) => handleStatusChange(sched.id, e.target.value)}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="action-btn view"
                      onClick={() => alert('View details for: ' + sched.id)}
                    >
                      View
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteSchedule(sched.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Calendar View Info */}
      <div className="schedule-info">
        <h3>📊 Schedule Summary</h3>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Total Schedules</span>
            <span className="info-value">{schedule.length}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Scheduled</span>
            <span className="info-value">{schedule.filter(s => s.status === 'scheduled').length}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Completed</span>
            <span className="info-value">{schedule.filter(s => s.status === 'completed').length}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Total Capacity</span>
            <span className="info-value">{schedule.reduce((sum, s) => sum + s.capacity, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
