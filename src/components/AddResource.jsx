import React, { useState } from 'react';

export default function AddResource({ onAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    url: '',
    workshopId: '',
    type: 'link'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.url) {
      alert('Please provide title and URL');
      return;
    }

    const newRes = {
      id: `res-${Date.now()}`,
      title: form.title,
      description: form.description,
      url: form.url,
      workshopId: form.workshopId,
      type: form.type,
      addedDate: new Date().toLocaleDateString()
    };

    onAdded && onAdded(newRes);
    setForm({ title: '', description: '', url: '', workshopId: '', type: 'link' });
  };

  return (
    <div className="add-resource-form">
      <h3>Add Open Resource</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Workshop ID (optional)</label>
            <input value={form.workshopId} onChange={(e) => setForm({...form, workshopId: e.target.value})} placeholder="wk-1 or leave blank" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>URL *</label>
            <input value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
              <option value="link">Link</option>
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="resource">Resource</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">Add Resource</button>
        </div>
      </form>
    </div>
  );
}
