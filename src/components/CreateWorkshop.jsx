import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateWorkshop() {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState(() => {
    try {
      const raw = localStorage.getItem('customWorkshops');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Error loading custom workshops', err);
      return [];
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    audience: 'Beginners',
    topic: 'Technology',
    scheduleDate: '',
    scheduleTime: '',
    duration: '',
    instructorName: '',
    instructorTopic: '',
    description: '',
    image: '/images/code-screen.jpg'
  });

  const [modules, setModules] = useState([
    { id: 1, title: '', lessons: [] }
  ]);

  const [newLesson, setNewLesson] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModuleChange = (id, title) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, title } : m));
  };

  const addModule = () => {
    const newId = Math.max(...modules.map(m => m.id), 0) + 1;
    setModules(prev => [...prev, { id: newId, title: `Module ${newId}`, lessons: [] }]);
  };

  const deleteModule = (id) => {
    if (modules.length > 1) {
      setModules(prev => prev.filter(m => m.id !== id));
    } else {
      alert('You must have at least one module');
    }
  };

  const addLesson = () => {
    if (!newLesson.name || !newLesson.type) {
      alert('Please fill in lesson name and type');
      return;
    }

    const module = modules.find(m => m.id === selectedModuleId);
    const updatedModules = modules.map(m => {
      if (m.id === selectedModuleId) {
        return {
          ...m,
          lessons: [...m.lessons, { ...newLesson, id: Date.now() }]
        };
      }
      return m;
    });

    setModules(updatedModules);
    setNewLesson({ type: 'video', name: '', duration: '', videoId: '', content: '' });
  };

  const deleteLesson = (moduleId, lessonId) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        };
      }
      return m;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!formData.title || !formData.scheduleDate || !formData.instructorName) {
      alert('Please fill in all required fields');
      return;
    }

    if (modules.length === 0 || modules.some(m => !m.title)) {
      alert('Please add at least one module with a title');
      return;
    }

    // Create new workshop
    const newWorkshop = {
      id: `wk-custom-${Date.now()}`,
      audience: formData.audience,
      title: formData.title,
      topic: formData.topic,
      image: formData.image,
      scheduleDate: formData.scheduleDate,
      scheduleTime: formData.scheduleTime,
      duration: formData.duration,
      instructorName: formData.instructorName,
      instructorTopic: formData.instructorTopic,
      description: formData.description,
      detailsTab: 'Details',
      instructorTab: 'Instructor',
      modulesTab: 'Modules',
      modules: modules.map(({ id, ...rest }) => rest)
    };

    // Save to localStorage
    const updatedWorkshops = [...workshops, newWorkshop];
    setWorkshops(updatedWorkshops);
    localStorage.setItem('customWorkshops', JSON.stringify(updatedWorkshops));

    // Show success and reset
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        audience: 'Beginners',
        topic: 'Technology',
        scheduleDate: '',
        scheduleTime: '',
        duration: '',
        instructorName: '',
        instructorTopic: '',
        description: '',
        image: '/images/code-screen.jpg'
      });
      setModules([{ id: 1, title: '', lessons: [] }]);
    }, 2000);
  };

  return (
    <div className="create-workshop-container">
      <h1 className="create-workshop-title">Create New Workshop</h1>

      {submitted && (
        <div className="success-message-toast">
          <p className="toast-title">Workshop Created!</p>
          <p className="toast-subtitle">Your workshop has been successfully created and saved.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-workshop-form">
        
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label>Workshop Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Advanced React Patterns"
              value={formData.title}
              onChange={handleFormChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Audience *</label>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleFormChange}
                className="form-input"
              >
                <option>Beginners</option>
                <option>Professionals</option>
                <option>Students</option>
                <option>Hobbyists</option>
              </select>
            </div>

            <div className="form-group">
              <label>Topic *</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleFormChange}
                className="form-input"
              >
                <option>Technology</option>
                <option>Arts</option>
                <option>Business</option>
                <option>Science</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Describe what students will learn..."
              value={formData.description}
              onChange={handleFormChange}
              className="form-input"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        {/* Schedule Information Section */}
        <div className="form-section">
          <h2>Schedule Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleFormChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="scheduleTime"
                value={formData.scheduleTime}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 120 minutes"
                value={formData.duration}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Instructor Information Section */}
        <div className="form-section">
          <h2>Instructor Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Instructor Name *</label>
              <input
                type="text"
                name="instructorName"
                placeholder="e.g., John Doe"
                value={formData.instructorName}
                onChange={handleFormChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Expertise Area</label>
              <input
                type="text"
                name="instructorTopic"
                placeholder="e.g., Web Development"
                value={formData.instructorTopic}
                onChange={handleFormChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="form-section">
          <div className="section-header">
            <h2>Learning Modules</h2>
            <button
              type="button"
              onClick={addModule}
              className="btn-add-module"
            >
              + Add Module
            </button>
          </div>

          {modules.map((module, idx) => (
            <div key={module.id} className="module-form-card">
              <div className="module-header-form">
                <input
                  type="text"
                  placeholder={`Module ${idx + 1} Title`}
                  value={module.title}
                  onChange={(e) => handleModuleChange(module.id, e.target.value)}
                  className="module-title-input"
                />
                <button
                  type="button"
                  onClick={() => deleteModule(module.id)}
                  className="btn-delete-module"
                >
                  Delete Module
                </button>
              </div>

              {/* Lessons for this module */}
              <div className="lessons-list">
                {module.lessons.length === 0 ? (
                  <p className="empty-lessons">No lessons added yet</p>
                ) : (
                  module.lessons.map(lesson => (
                    <div key={lesson.id} className="lesson-item-form">
                      <div className="lesson-info">
                        <span className="lesson-type-badge">{lesson.type.toUpperCase()}</span>
                        <span className="lesson-name">{lesson.name}</span>
                        {lesson.duration && <span className="lesson-duration">{lesson.duration}</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLesson(module.id, lesson.id)}
                        className="btn-delete-lesson"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Lesson button */}
              {selectedModuleId === module.id && (
                <div className="add-lesson-form">
                  <div className="lesson-input-row">
                    <select
                      value={newLesson.type || 'video'}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, type: e.target.value }))}
                      className="form-input"
                    >
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                      <option value="quiz">Quiz</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Lesson name"
                      value={newLesson.name || ''}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                    />

                    <input
                      type="text"
                      placeholder="Duration (e.g., 30 min)"
                      value={newLesson.duration || ''}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                      className="form-input"
                    />

                    <button
                      type="button"
                      onClick={addLesson}
                      className="btn-add-lesson"
                    >
                      Add
                    </button>
                  </div>

                  {newLesson.type === 'video' && (
                    <input
                      type="text"
                      placeholder="YouTube Video ID"
                      value={newLesson.videoId || ''}
                      onChange={(e) => setNewLesson(prev => ({ ...prev, videoId: e.target.value }))}
                      className="form-input"
                    />
                  )}
                </div>
              )}

              {selectedModuleId !== module.id && (
                <button
                  type="button"
                  onClick={() => setSelectedModuleId(module.id)}
                  className="btn-edit-module"
                >
                  + Add Lesson to this Module
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Create Workshop
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
