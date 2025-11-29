import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TrainingMaterials() {
  const { registrations } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState('all');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    workshopId: '',
    type: 'document',
    url: ''
  });
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('trainingMaterials');
      if (raw) {
        setMaterials(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error loading materials', err);
    }
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    
    if (!uploadForm.title || !uploadForm.workshopId || !uploadForm.url) {
      alert('Please fill in all required fields');
      return;
    }

    const newMaterial = {
      id: `material-${Date.now()}`,
      title: uploadForm.title,
      description: uploadForm.description,
      workshopId: uploadForm.workshopId,
      type: uploadForm.type,
      url: uploadForm.url,
      uploadDate: new Date().toLocaleDateString(),
      downloads: 0
    };

    const updated = [...materials, newMaterial];
    setMaterials(updated);
    localStorage.setItem('trainingMaterials', JSON.stringify(updated));
    
    setUploadForm({ title: '', description: '', workshopId: '', type: 'document', url: '' });
    setShowUploadForm(false);
    alert('Training material uploaded successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this material?')) {
      const updated = materials.filter(m => m.id !== id);
      setMaterials(updated);
      localStorage.setItem('trainingMaterials', JSON.stringify(updated));
    }
  };

  const handleDownload = (url, title) => {
    const element = document.createElement('a');
    element.href = url;
    element.download = title;
    element.click();
  };

  const filteredMaterials = filter === 'all' 
    ? materials 
    : materials.filter(m => m.type === filter);

  const materialTypes = [
    { value: 'document', label: '📄 Documents', icon: '📄' },
    { value: 'video', label: '🎥 Videos', icon: '🎥' },
    { value: 'resource', label: '📚 Resources', icon: '📚' },
    { value: 'template', label: '📋 Templates', icon: '📋' }
  ];

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">📚 Training Materials</h1>

      {/* Upload Form */}
      {showUploadForm ? (
        <div className="material-upload-form">
          <h2>Upload New Training Material</h2>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label>Material Title *</label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                placeholder="e.g., React Fundamentals Guide"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                placeholder="Brief description of the material"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Workshop *</label>
                <select
                  value={uploadForm.workshopId}
                  onChange={(e) => setUploadForm({...uploadForm, workshopId: e.target.value})}
                >
                  <option value="">Select Workshop</option>
                  <option value="wk-1">Advanced React Patterns</option>
                  <option value="wk-2">UI/UX Design Fundamentals</option>
                </select>
              </div>

              <div className="form-group">
                <label>Material Type *</label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({...uploadForm, type: e.target.value})}
                >
                  <option value="document">📄 Document</option>
                  <option value="video">🎥 Video</option>
                  <option value="resource">📚 Resource</option>
                  <option value="template">📋 Template</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Material URL/Link *</label>
              <input
                type="url"
                value={uploadForm.url}
                onChange={(e) => setUploadForm({...uploadForm, url: e.target.value})}
                placeholder="https://example.com/material.pdf"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">Upload Material</button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => setShowUploadForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          className="btn-upload"
          onClick={() => setShowUploadForm(true)}
        >
          ➕ Upload New Material
        </button>
      )}

      {/* Filter Section */}
      <div className="material-filter-section">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({materials.length})
        </button>
        {materialTypes.map(type => (
          <button 
            key={type.value}
            className={`filter-btn ${filter === type.value ? 'active' : ''}`}
            onClick={() => setFilter(type.value)}
          >
            {type.label} ({materials.filter(m => m.type === type.value).length})
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="materials-grid">
        {filteredMaterials.length === 0 ? (
          <div className="no-materials">
            <p>No training materials found</p>
          </div>
        ) : (
          filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <span className="material-type-badge">
                  {materialTypes.find(t => t.value === material.type)?.icon}
                </span>
                <div className="material-title-section">
                  <h3>{material.title}</h3>
                  <p className="material-workshop">
                    Workshop: {material.workshopId === 'wk-1' ? 'Advanced React' : 'UI/UX Design'}
                  </p>
                </div>
              </div>

              <p className="material-description">{material.description}</p>

              <div className="material-meta">
                <span className="upload-date">📅 {material.uploadDate}</span>
                <span className="downloads">⬇️ {material.downloads} downloads</span>
              </div>

              <div className="material-actions">
                <button 
                  className="btn-download"
                  onClick={() => handleDownload(material.url, material.title)}
                >
                  📥 Download
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(material.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
