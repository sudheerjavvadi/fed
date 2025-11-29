import React, { useEffect, useState } from 'react';
import AddResource from './AddResource';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('postTrainingResources');
      setResources(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error('Failed to load open resources', err);
    }
  }, []);

  const handleAdded = (newRes) => {
    const updated = [newRes, ...resources];
    setResources(updated);
    try { localStorage.setItem('postTrainingResources', JSON.stringify(updated)); } catch (err) { console.error(err); }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this resource?')) return;
    const updated = resources.filter(r => r.id !== id);
    setResources(updated);
    try { localStorage.setItem('postTrainingResources', JSON.stringify(updated)); } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">Open Resources (Admin)</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button className="btn-upload" onClick={() => setShowForm(s => !s)}>
          {showForm ? 'Close' : '➕ Add Resource'}
        </button>
      </div>

      {showForm && <AddResource onAdded={handleAdded} />}

      <div className="resources-list-admin">
        {resources.length === 0 ? (
          <div className="empty-message">No resources added yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Workshop</th><th>Type</th><th>URL</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.workshopId || 'General'}</td>
                  <td>{r.type}</td>
                  <td><a href={r.url} target="_blank" rel="noreferrer">Open</a></td>
                  <td><button className="action-btn delete" onClick={() => handleDelete(r.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
