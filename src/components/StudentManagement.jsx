import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function StudentManagement() {
  const { registrations } = useAuth();
  const [studentData, setStudentData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      // Collect student data from registrations
      const students = registrations.map((workshop, idx) => ({
        id: idx + 1,
        name: `Student ${idx + 1}`,
        email: `student${idx + 1}@example.com`,
        workshop: workshop.title,
        registrationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: Math.random() > 0.3 ? 'Active' : 'Inactive',
        progress: Math.floor(Math.random() * 100)
      }));
      setStudentData(students);
    } catch (err) {
      console.error('Error loading student data', err);
    }
  }, [registrations]);

  const filteredStudents = filter === 'all' 
    ? studentData 
    : studentData.filter(s => s.status === filter);

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">Student Management</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Students ({studentData.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
          onClick={() => setFilter('Active')}
        >
          Active ({studentData.filter(s => s.status === 'Active').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'Inactive' ? 'active' : ''}`}
          onClick={() => setFilter('Inactive')}
        >
          Inactive ({studentData.filter(s => s.status === 'Inactive').length})
        </button>
      </div>

      {/* Students Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Workshop</th>
              <th>Joined</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-message">No students found</td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>#{student.id}</td>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.workshop}</td>
                  <td>{student.registrationDate}</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{student.progress}%</span>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn message">Message</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
