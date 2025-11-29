import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminAnalytics() {
  const { registrations } = useAuth();
  const [customWorkshops, setCustomWorkshops] = useState([]);
  const [stats, setStats] = useState({
    totalWorkshops: 0,
    totalStudents: 0,
    totalRegistrations: 0,
    completionRate: 0
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customWorkshops');
      const custom = raw ? JSON.parse(raw) : [];
      setCustomWorkshops(custom);

      // Calculate stats
      const defaultCount = 2; // wk-1 and wk-2
      const totalWS = defaultCount + custom.length;
      const totalReg = registrations.length;
      const uniqueStudents = new Set(registrations.map(r => r.id)).size;

      setStats({
        totalWorkshops: totalWS,
        totalStudents: uniqueStudents,
        totalRegistrations: totalReg,
        completionRate: totalReg > 0 ? Math.round((uniqueStudents / totalReg) * 100) : 0
      });
    } catch (err) {
      console.error('Error loading analytics', err);
    }
  }, [registrations]);

  return (
    <div className="admin-analytics-container">
      <h1 className="admin-page-title">Analytics & Reports</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>Total Workshops</h3>
          <p className="stat-value">{stats.totalWorkshops}</p>
          <span className="stat-label">Active workshops</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>Total Students</h3>
          <p className="stat-value">{stats.totalStudents}</p>
          <span className="stat-label">Registered users</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <h3>Total Registrations</h3>
          <p className="stat-value">{stats.totalRegistrations}</p>
          <span className="stat-label">Workshop enrollments</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>Completion Rate</h3>
          <p className="stat-value">{stats.completionRate}%</p>
          <span className="stat-label">Avg completion</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h2>Registration Trend</h2>
          <div className="chart-placeholder">
            <div className="bar-chart">
              <div className="bar" style={{ height: '30%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
            </div>
            <p className="chart-note">Last 5 weeks of registrations</p>
          </div>
        </div>

        <div className="chart-card">
          <h2>Workshop Distribution</h2>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <div className="pie-segment" style={{ background: '#6a1b9a', width: '35%' }}></div>
              <div className="pie-segment" style={{ background: '#8e44ad', width: '25%' }}></div>
              <div className="pie-segment" style={{ background: '#b39ddb', width: '40%' }}></div>
            </div>
            <p className="chart-note">Distribution across topics</p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="detailed-stats">
        <h2>Workshop Performance</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Workshop</th>
              <th>Registrations</th>
              <th>Completion %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Advanced React Patterns</td>
              <td>24</td>
              <td>85%</td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td>UI/UX Design Fundamentals</td>
              <td>18</td>
              <td>72%</td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            {customWorkshops.map((ws, idx) => (
              <tr key={idx}>
                <td>{ws.title}</td>
                <td>0</td>
                <td>0%</td>
                <td><span className="badge badge-warning">New</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
