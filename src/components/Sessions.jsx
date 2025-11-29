import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import workshopsData from '../data/workshops';

export default function Sessions() {
  const { isLoggedIn, userRole, registerWorkshop, registrations } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, ongoing, completed
  const [showTimetable, setShowTimetable] = useState(false);
  const [localRegistrations, setLocalRegistrations] = useState(registrations || []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('workshopSessions');
      if (raw) {
        const data = JSON.parse(raw);
        setSessions(data);
      }

      // Load user registrations (local copy)
      const regRaw = localStorage.getItem('registrations');
      if (regRaw) {
        const regData = JSON.parse(regRaw);
        setLocalRegistrations(regData);
      }
    } catch (err) {
      console.error('Error loading data', err);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#ff9800';
      case 'ongoing':
        return '#4caf50';
      case 'completed':
        return '#2196f3';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return '⏱️';
      case 'ongoing':
        return '🔴';
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📅';
    }
  };

  // Get user's registered sessions
  const getRegisteredSessions = () => {
    return sessions.filter(session => 
      (localRegistrations || []).some(reg => reg.id === session.workshopId)
    );
  };

  const registeredSessions = getRegisteredSessions();

  const isWorkshopRegistered = (workshopId) => {
    return (localRegistrations || []).some(w => w.id === workshopId);
  };

  const handleRegisterClick = (session) => {
    // Find workshop object by id
    const wk = workshopsData.find(w => w.id === session.workshopId) || { id: session.workshopId, title: session.title };
    const success = registerWorkshop(wk);
    if (success) {
      // update local state copy
      const raw = localStorage.getItem('registrations');
      const updated = raw ? JSON.parse(raw) : [];
      setLocalRegistrations(updated);

      // increment enrolled count in workshopSessions
      try {
        const ssRaw = localStorage.getItem('workshopSessions');
        if (ssRaw) {
          const ss = JSON.parse(ssRaw).map(s => s.id === session.id ? {...s, enrolled: (s.enrolled || 0) + 1} : s);
          localStorage.setItem('workshopSessions', JSON.stringify(ss));
          setSessions(ss);
        }
      } catch (err) {
        console.error('Failed to update enrolled count', err);
      }

      alert('Registered for workshop successfully');
    } else {
      alert('You are already registered for this workshop');
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming').length;
  const ongoingSessions = sessions.filter(s => s.status === 'ongoing').length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;

  if (!isLoggedIn) {
    return (
      <div className="sessions-container">
        <div className="login-required">
          <h2>🔒 Login Required</h2>
          <p>Please log in to view and participate in sessions.</p>
          <Link to="/login" className="btn-primary">Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sessions-container">
      <div className="sessions-layout">
        <aside className="sessions-sidebar">
          <h3 className="sidebar-title">Sessions</h3>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-btn ${!showTimetable ? 'active' : ''}`}
              onClick={() => setShowTimetable(false)}
            >
              Session Registration
            </button>
            <button
              className={`sidebar-btn ${showTimetable ? 'active' : ''}`}
              onClick={() => setShowTimetable(true)}
            >
              My Timetable
            </button>
          </nav>
        </aside>

        <main className="sessions-main">
          <div className="sessions-header">
            <h1>📅 Live Sessions</h1>
            <p>Join workshops and interact with instructors and other participants</p>
          </div>

          {/* Stats Cards */}
          <div className="sessions-stats">
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-number">{upcomingSessions}</div>
            <div className="stat-label">Upcoming</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-content">
            <div className="stat-number">{ongoingSessions}</div>
            <div className="stat-label">Live Now</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{completedSessions}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Timetable View */}
      {showTimetable ? (
        <div className="timetable-section">
          <h2 className="timetable-title">My Registered Sessions Timetable</h2>
          {registeredSessions.length === 0 ? (
            <div className="no-timetable-sessions">
              <p>📭 You haven't registered for any sessions yet.</p>
              <p className="subtitle">Register for workshops to see your timetable here!</p>
            </div>
          ) : (
            <div className="timetable-wrapper">
              <table className="timetable">
                <thead>
                  <tr>
                    <th>Workshop</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Instructor</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredSessions.map(session => (
                    <tr key={session.id} className={`timetable-row status-${session.status}`}>
                      <td className="col-title">
                        <strong>{session.title}</strong>
                      </td>
                      <td className="col-date">📅 {session.date}</td>
                      <td className="col-time">⏰ {session.time}</td>
                      <td className="col-duration">⏱️ {session.duration}</td>
                      <td className="col-instructor">👨‍🏫 {session.instructor}</td>
                      <td className="col-status">
                        <span className="status-badge" style={{ backgroundColor: getStatusColor(session.status) }}>
                          {getStatusIcon(session.status)} {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </td>
                      <td className="col-actions">
                        {(session.status === 'ongoing' || session.status === 'upcoming') && (
                          <div className="action-links">
                            <Link to={`/session/${session.workshopId}/qna`} className="quick-link qna-link">Q&A</Link>
                            <Link to={`/session/${session.workshopId}/chat`} className="quick-link chat-link">Chat</Link>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <>
      {/* Filter Tabs */}
      <div className="sessions-filter">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Sessions ({sessions.length})
        </button>
        <button
          className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
          onClick={() => setFilter('ongoing')}
        >
          Live Now
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

          {/* Sessions List */}
          <div className="sessions-list">
        {filteredSessions.length === 0 ? (
          <div className="no-sessions">
            <p>📭 No {filter !== 'all' ? filter : ''} sessions available</p>
          </div>
        ) : (
          filteredSessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header-row">
                <div className="session-title-section">
                  <h3 className="session-title">{session.title}</h3>
                  <span className="session-status" style={{ 
                    backgroundColor: getStatusColor(session.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.85em',
                    fontWeight: 600
                  }}>
                    {getStatusIcon(session.status)} {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="session-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <div>
                    <p className="meta-label">Date</p>
                    <p className="meta-value">{session.date}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏰</span>
                  <div>
                    <p className="meta-label">Time</p>
                    <p className="meta-value">{session.time}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <div>
                    <p className="meta-label">Duration</p>
                    <p className="meta-value">{session.duration}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <div>
                    <p className="meta-label">Capacity</p>
                    <p className="meta-value">{session.enrolled || 0}/{session.capacity}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">👨‍🏫</span>
                  <div>
                    <p className="meta-label">Instructor</p>
                    <p className="meta-value">{session.instructor}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <div>
                    <p className="meta-label">Location</p>
                    <p className="meta-value">{session.location}</p>
                  </div>
                </div>
              </div>

              <p className="session-description">{session.description}</p>

              {/* Session Actions */}
              <div className="session-actions">
                {(session.status === 'ongoing' || session.status === 'upcoming') && (
                  <>
                    <Link
                      to={`/session/${session.workshopId}/qna`}
                      className="session-action-btn qna-btn"
                    >
                      💬 Q&A
                    </Link>
                    <Link
                      to={`/session/${session.workshopId}/chat`}
                      className="session-action-btn chat-btn"
                    >
                      🗨️ Chat
                    </Link>

                    {/* Register Button (if not already registered) */}
                    {!isWorkshopRegistered(session.workshopId) ? (
                      <button
                        className="session-action-btn register-btn"
                        onClick={() => handleRegisterClick(session)}
                      >
                        ➕ Register
                      </button>
                    ) : (
                      <button className="session-action-btn registered" disabled>
                        ✔️ Registered
                      </button>
                    )}
                  </>
                )}
                <Link
                  to={`/workshops/${session.workshopId}`}
                  className="session-action-btn details-btn"
                >
                  📖 View Details
                </Link>
              </div>
            </div>
          ))
        )}
          </div>
        </>
      )}
        </main>
      </div>
    </div>
  );
}
