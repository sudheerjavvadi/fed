import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PostTrainingResources() {
  const { registrations, isLoggedIn } = useAuth();
  const [resources, setResources] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [userWorkshops, setUserWorkshops] = useState([]);
  const [activeTab, setActiveTab] = useState('my'); // 'my' or 'open'
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [selectedResource, setSelectedResource] = useState(null); // For resource detail modal

  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      // Load materials
      const materialsRaw = localStorage.getItem('trainingMaterials');
      if (materialsRaw) {
        setMaterials(JSON.parse(materialsRaw));
      }

      // Get user's workshops (from registrations passed via context)
      setUserWorkshops(registrations);

      // Load additional resources
      const resourcesRaw = localStorage.getItem('postTrainingResources');
      if (resourcesRaw) {
        setResources(JSON.parse(resourcesRaw));
      }
    } catch (err) {
      console.error('Error loading resources', err);
    }

    // Listen for storage changes (e.g., from certificate generation)
    const handleStorageChange = () => {
      try {
        const updated = localStorage.getItem('registrations');
        if (updated) {
          setUserWorkshops(JSON.parse(updated));
        }
      } catch (err) {
        console.error('Error syncing registrations', err);
      }
    };

    window.addEventListener('storageChange', handleStorageChange);
    return () => window.removeEventListener('storageChange', handleStorageChange);
  }, [isLoggedIn, registrations]);

  const getWorkshopName = (id) => {
    const workshops = [
      { id: 'wk-1', title: 'Advanced React Patterns' },
      { id: 'wk-2', title: 'UI/UX Design Fundamentals' }
    ];
    return workshops.find(w => w.id === id)?.title || id;
  };

  const getFilteredMaterials = () => {
    // When user selects a workshop, filter materials for that workshop
    if (!selectedWorkshop) return materials;
    return materials.filter(m => m.workshopId === selectedWorkshop);
  };

  const getFilteredResources = () => {
    if (!selectedWorkshop) return resources;
    return resources.filter(r => r.workshopId === selectedWorkshop);
  };

  if (!isLoggedIn) {
    return (
      <div className="post-training-container">
        <div className="login-prompt">
          <h2>Please log in to access post-training resources</h2>
          <p>Complete a workshop to unlock exclusive training materials and resources.</p>
        </div>
      </div>
    );
  }

  const filteredMaterials = getFilteredMaterials();
  const filteredResources = getFilteredResources();

  // Determine which of the user's registrations are completed/certified
  const myCompletedWorkshops = userWorkshops.filter(w => {
    return w && (w.status === 'completed' || w.completed === true || w.certificateIssued === true);
  });

  const myCompletedIds = myCompletedWorkshops.map(w => w.workshopId || w.id);

  return (
    <div className="post-training-container layout-with-sidebar">
      <aside className="resources-sidebar">
        <h3>Resources</h3>
        <nav>
          <button
            className={`sidebar-tab ${activeTab === 'my' ? 'active' : ''}`}
            onClick={() => setActiveTab('my')}
          >
            My Resources
          </button>
          <button
            className={`sidebar-tab ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open Resources
          </button>
        </nav>

        <div className="sidebar-summary">
          <div><strong>Registered:</strong> {userWorkshops.length}</div>
          <div><strong>Completed:</strong> {myCompletedWorkshops.length}</div>
        </div>
      </aside>

      <main className="resources-main">
        <h1 className="page-title">📚 Post-Training Resources</h1>
        <p className="subtitle">Access comprehensive learning materials and resources for your completed workshops</p>

        {/* Workshop Filter (only show user's workshops) */}
        <div className="filter-section">
          <h3>Filter by Workshop:</h3>
          <div className="workshop-filter">
            <button
              className={`filter-btn ${selectedWorkshop === '' ? 'active' : ''}`}
              onClick={() => setSelectedWorkshop('')}
            >
              All Workshops ({userWorkshops.length})
            </button>
            {userWorkshops.map(workshop => (
              <button
                key={workshop.workshopId || workshop.id}
                className={`filter-btn ${selectedWorkshop === (workshop.workshopId || workshop.id) ? 'active' : ''}`}
                onClick={() => setSelectedWorkshop(workshop.workshopId || workshop.id)}
              >
                {getWorkshopName(workshop.workshopId || workshop.id)}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional content based on tab */}
        {activeTab === 'my' ? (
          <section className="resources-section">
            <h2>📄 Training Materials (My Resources)</h2>

            {filteredMaterials.filter(m => myCompletedIds.length === 0 ? false : myCompletedIds.includes(m.workshopId)).length === 0 ? (
              <div className="no-resources">
                <p>No training materials available for your completed workshops yet.</p>
              </div>
            ) : (
              <div className="materials-list">
                {filteredMaterials
                  .filter(m => myCompletedIds.length === 0 ? false : myCompletedIds.includes(m.workshopId))
                  .map(material => (
                    <div key={material.id} className="resource-card">
                      <div className="resource-header">
                        <span className="resource-type">
                          {material.type === 'document' && '📄'}
                          {material.type === 'video' && '🎥'}
                          {material.type === 'resource' && '📚'}
                          {material.type === 'template' && '📋'}
                        </span>
                        <h3>{material.title}</h3>
                      </div>

                      {material.description && (
                        <p className="resource-description">{material.description}</p>
                      )}

                      <div className="resource-meta">
                        <span>📅 {material.uploadDate}</span>
                        <span>⬇️ {material.downloads} downloads</span>
                      </div>

                      <button
                        className="btn-access"
                        onClick={() => window.open(material.url, '_blank')}
                      >
                        📥 Access Material
                      </button>
                    </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="resources-section">
            <h2>🌐 Open Resources</h2>
            {filteredResources.length === 0 ? (
              <div className="no-resources">
                <p>No open resources available yet. Check back later.</p>
              </div>
            ) : (
              <div className="materials-list">
                {filteredResources.map(res => (
                  <div className="resource-card" key={res.id}>
                    <div className="resource-header">
                      <span className="resource-type">{res.type === 'link' ? '🔗' : '📚'}</span>
                      <h3>{res.title}</h3>
                    </div>
                    {res.description && <p className="resource-description">{res.description}</p>}
                    <div className="resource-meta">
                      <span>📅 {res.addedDate || res.uploadDate || ''}</span>
                    </div>
                    <button className="btn-access" onClick={() => {
                      setSelectedResource(res);
                      window.open(res.url, '_blank');
                    }}>Open Resource</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      {/* Additional Resources Section */}
      <section className="resources-section">
        <h2>💡 Learning Resources</h2>
        
        <div className="resources-grid">
          <div className="learning-resource">
            <h3>📖 Documentation</h3>
            <p>Official documentation and technical guides for the course topics.</p>
            <button className="btn-resource">View Documentation</button>
          </div>

          <div className="learning-resource">
            <h3>🎯 Practice Projects</h3>
            <p>Hands-on projects to reinforce your learning and build your portfolio.</p>
            <button className="btn-resource">View Projects</button>
          </div>

          <div className="learning-resource">
            <h3>🤝 Community Forum</h3>
            <p>Connect with other students, ask questions, and share your progress.</p>
            <button className="btn-resource">Join Forum</button>
          </div>

          <div className="learning-resource">
            <h3>🎓 Advanced Courses</h3>
            <p>Continue your learning journey with advanced and specialized courses.</p>
            <button className="btn-resource">Explore Courses</button>
          </div>

          <div className="learning-resource">
            <h3>📊 Assessment Tools</h3>
            <p>Test your knowledge with quizzes and practical assessments.</p>
            <button className="btn-resource">Start Assessment</button>
          </div>

          <div className="learning-resource">
            <h3>🏆 Career Path</h3>
            <p>Get guidance on career opportunities and skill development paths.</p>
            <button className="btn-resource">Explore Careers</button>
          </div>
        </div>
      </section>

      {/* Recommended Resources */}
      <section className="resources-section">
        <h2>⭐ Recommended Resources</h2>
        
        <div className="recommended-items">
          <div className="recommended-card">
            <span className="tag">Popular</span>
            <h3>React Hooks Deep Dive</h3>
            <p>Master React Hooks with practical examples and best practices.</p>
            <div className="card-meta">
              <span>📚 Article</span>
              <span>⏱️ 15 min read</span>
            </div>
            <button className="btn-read">Read Now</button>
          </div>

          <div className="recommended-card">
            <span className="tag">New</span>
            <h3>UI/UX Design Principles</h3>
            <p>Essential principles for creating user-centered designs.</p>
            <div className="card-meta">
              <span>🎥 Video</span>
              <span>⏱️ 45 min</span>
            </div>
            <button className="btn-read">Watch Now</button>
          </div>

          <div className="recommended-card">
            <span className="tag">Featured</span>
            <h3>Building Accessible Websites</h3>
            <p>Learn how to create inclusive digital experiences for all users.</p>
            <div className="card-meta">
              <span>📄 Guide</span>
              <span>⏱️ 20 min read</span>
            </div>
            <button className="btn-read">Explore</button>
          </div>
        </div>
      </section>

      {/* Resources Summary */}
      <section className="resources-summary">
        <h2>📊 Your Learning Stats</h2>
        <div className="stats-grid-resources">
        <div className="stat-item">
            <span className="stat-icon">🎓</span>
            <span className="stat-label">Workshops Completed</span>
            <span className="stat-count">{userWorkshops.length}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">📚</span>
            <span className="stat-label">Materials Accessed</span>
            <span className="stat-count">{filteredMaterials.length}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-label">Certificates Earned</span>
            <span className="stat-count">{Math.floor(userWorkshops.length * 0.8)}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <span className="stat-label">Learning Hours</span>
            <span className="stat-count">{userWorkshops.length * 12}</span>
          </div>
        </div>
      </section>
      </main>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="resource-modal-overlay" onClick={() => setSelectedResource(null)}>
          <div className="resource-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-modal-close" onClick={() => setSelectedResource(null)}>✕</button>
            
            <h2 className="modal-title">{selectedResource.title}</h2>
            
            <div className="modal-subtitle">
              {selectedResource.type === 'link' ? 'Resources' : 'Open Resources'} — {selectedResource.type}
            </div>

            <div className="modal-divider"></div>

            {selectedResource.description && (
              <p className="modal-body-text">{selectedResource.description}</p>
            )}

            <div className="modal-actions">
              <button 
                className="btn-close-modal" 
                onClick={() => setSelectedResource(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
