import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
// Use the centralized data source
import workshopsData from '../data/workshops'; 

// Helper to find workshop from the imported data
const findWorkshopById = (id) => workshopsData.find(w => w.id === id); 

// --- VideoPlayerModal Component ---
const VideoPlayerModal = ({ videoId, onClose }) => {
    // If no video ID is provided, return null (nothing to render)
    if (!videoId) return null;

    const embedUrl = `https://youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    return (
        // Overlay covers the entire screen
        <div className="video-modal-overlay" onClick={onClose}>
            {/* Modal content prevents click-through to close when clicked inside */}
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="video-player-wrapper">
                    <iframe
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Workshop Video Player"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
// ------------------------------------


const WorkshopDetailPage = () => {
    const { id } = useParams();
    const { isLoggedIn, userRole, registerWorkshop, isRegistered } = useAuth();
    
    // State management
    const [workshop, setWorkshop] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); 
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null); 
    const [showCertModal, setShowCertModal] = useState(false);
    const [certName, setCertName] = useState('');
    const [allQuizzesCompleted, setAllQuizzesCompleted] = useState(false);


    useEffect(() => {
        // Load data directly from the complete workshops.js file
        const foundWorkshop = findWorkshopById(id);
        
        if (foundWorkshop) {
            setWorkshop(foundWorkshop); 
        } else {
             // If ID is invalid, workshop remains null, and the loading message is shown
             console.error(`Workshop with ID ${id} not found.`);
        }
    }, [id]);

    // Compute whether all quiz modules for this workshop are completed (stored in localStorage)
    const computeAllQuizzesCompleted = () => {
        try {
            const key = 'completedModules';
            const raw = localStorage.getItem(key);
            const data = raw ? JSON.parse(raw) : {};
            const completed = data[workshop?.id] || [];

            const quizModuleIds = (workshop?.modules || [])
                .map((m, idx) => (m.lessons.some(l => l.type === 'quiz') ? String(idx + 1) : null))
                .filter(Boolean);

            // If there are no quiz modules, treat as not ready for certificate
            if (quizModuleIds.length === 0) return false;

            return quizModuleIds.every(mid => completed.includes(mid));
        } catch (err) {
            console.error('Error checking completed modules', err);
            return false;
        }
    };

    useEffect(() => {
        setAllQuizzesCompleted(computeAllQuizzesCompleted());

        // Listen to storage changes so certificate button updates across tabs
        const onStorage = (e) => {
            if (e.key === 'completedModules' || e.key === null) {
                setAllQuizzesCompleted(computeAllQuizzesCompleted());
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [workshop]);

    // Handle Registration Logic
    const handleRegister = () => {
        if (!isLoggedIn || userRole !== 'student') {
            setShowLoginError(true);
            setTimeout(() => setShowLoginError(false), 4000); 
            return;
        }

        if (registerWorkshop(workshop)) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        }
    };

    // Handle certificate generation (clicked in modal)
    const handleGenerateCertificateConfirm = () => {
        if (!certName.trim()) return alert('Please enter a name for the certificate.');

        // Try to open a new window — may be blocked by popup blockers
        const win = window.open('', '_blank');
        if (!win) {
            alert('Popup blocked. Please allow popups for this site to print the certificate.');
            return;
        }

        const issuedOn = new Date().toLocaleDateString();
        const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificate of Completion</title>
  <style>
    body {
      font-family: 'Georgia', serif;
      background: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
    .cert {
      max-width: 1000px;
      margin: 0 auto;
      border: 15px solid #6a1b9a;
      padding: 60px 80px;
      background: #fff;
      text-align: center;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .cert h1 {
      font-size: 48px;
      color: #6a1b9a;
      margin: 0 0 30px 0;
      font-weight: normal;
      letter-spacing: 2px;
    }
    .cert .intro {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }
    .cert .name {
      font-size: 42px;
      font-weight: bold;
      margin: 30px 0;
      color: #000;
      border-bottom: 3px solid #6a1b9a;
      padding-bottom: 15px;
    }
    .cert .statement {
      font-size: 18px;
      color: #333;
      margin: 30px 0;
      line-height: 1.6;
    }
    .cert .workshop {
      font-size: 24px;
      font-weight: bold;
      color: #6a1b9a;
      margin: 15px 0;
    }
    .cert .date {
      margin-top: 50px;
      color: #555;
      font-size: 16px;
    }
    .cert .seal {
      margin-top: 40px;
      font-size: 60px;
    }
  </style>
</head>
<body>
  <div class="cert">
    <h1>Certificate of Completion</h1>
    <p class="intro">This is to certify that</p>
    <div class="name">${certName}</div>
    <p class="statement">has successfully completed the workshop</p>
    <div class="workshop">${workshop.title}</div>
    <div class="seal">★</div>
    <div class="date">Issued on: ${issuedOn}</div>
  </div>
  <script>
    setTimeout(function() {
      window.print();
    }, 500);
  </script>
</body>
</html>`;

        // Write and close document
        try {
            win.document.write(html);
            win.document.close();
            win.focus();
        } catch (err) {
            // In some browsers writing to the new window can fail if blocked
            console.error('Error generating certificate:', err);
            alert('Unable to open print window. Please try disabling popup blockers or use a different browser.');
            setShowCertModal(false);
            return;
        }

        // Mark workshop as completed in registration
        try {
            const updated = registrations.map(reg => {
                if (reg.id === workshop.id) {
                    return { ...reg, certificateIssued: true, status: 'completed' };
                }
                return reg;
            });
            // Update localStorage directly
            localStorage.setItem('registrations', JSON.stringify(updated));
            // Trigger re-render by setting state
            window.dispatchEvent(new Event('storageChange'));
        } catch (err) {
            console.error('Failed to mark workshop as completed', err);
        }

        setShowCertModal(false);
    };
    
    // Crucial check: if workshop is null, render a loading state (prevents crash)
    if (!workshop) {
        return <div className="loading-message">Loading workshop details...</div>;
    }

    const registrationStatus = isRegistered(workshop.id);

    return (
        <>
            {/* 1. Video Player Modal */}
            <VideoPlayerModal 
                videoId={playingVideoId} 
                onClose={() => setPlayingVideoId(null)} 
            />

            {/* 2. Main Workshop Content */}
            <div className="workshop-detail-container">
                {/* Header with image left and info aside on the right */}
                <div className="detail-header-card">
                    <div className="detail-image-wrapper">
                        <img src={workshop.image} alt={workshop.title} className="detail-image" />
                        <div className="detail-hero-overlay">
                            <p className="detail-hero-audience">{workshop.audience}</p>
                            <h1 className="detail-hero-title">{workshop.title}</h1>
                            <p className="detail-hero-description">{workshop.description}</p>
                        </div>
                    </div>

                    <div className="detail-info-box">
                        <div>
                            <div className="meta-item"><strong>{workshop.scheduleDate}</strong></div>
                            <div className="meta-item muted-text">{workshop.scheduleTime} • {workshop.duration}</div>
                        </div>

                        <div style={{ marginTop: 18 }}>
                            <button 
                                onClick={handleRegister} 
                                className={`register-button ${registrationStatus ? 'registered' : ''}`}
                                disabled={registrationStatus}
                            >
                                {registrationStatus ? '✔️ Already Registered' : 'Register for Workshop'}
                            </button>

                            {/* Generate Certificate button - visible only when all quizzes completed and user is registered */}
                            {allQuizzesCompleted && registrationStatus && (
                                <button
                                    className="generate-certificate-button"
                                    style={{ marginTop: 12 }}
                                    onClick={() => setShowCertModal(true)}
                                >
                                    🎓 Generate Certificate
                                </button>
                            )}
                        </div>

                        <div style={{ marginTop: 18 }}>
                            <h4 style={{ margin: 0 }}>About the Instructor</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                                <div className="instructor-avatar">{workshop.instructorName.charAt(0)}</div>
                                <div>
                                    <div className="instructor-name">{workshop.instructorName}</div>
                                    <div className="instructor-expertise muted-text">{workshop.instructorTopic}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="detail-main-content">
                    {/* Tabs */}
                    <div className="detail-tabs">
                        <button 
                            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            {workshop.detailsTab}
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'modules' ? 'active' : ''}`}
                            onClick={() => setActiveTab('modules')}
                        >
                            {workshop.modulesTab}
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'instructor' ? 'active' : ''}`}
                            onClick={() => setActiveTab('instructor')}
                        >
                            {workshop.instructorTab}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content-panel">
                        {/* DETAILS TAB */}
                        {activeTab === 'details' && (
                            <div className="details-tab-content">
                                <h3 className="section-title">Description</h3>
                                <p className="section-text">{workshop.description}</p>

                                <h3 className="section-title">Schedule</h3>
                                <div className="schedule-meta-grid">
                                    <div><p className="meta-label">Date</p><p className="meta-value">{workshop.scheduleDate}</p></div>
                                    <div><p className="meta-label">Time</p><p className="meta-value">{workshop.scheduleTime}</p></div>
                                    <div><p className="meta-label">Duration</p><p className="meta-value">{workshop.duration}</p></div>
                                    <div><p className="meta-label">Audience</p><p className="meta-value">{workshop.audience}</p></div>
                                </div>
                            </div>
                        )}

                        {/* MODULES/CURRICULUM TAB */}
                        {activeTab === 'modules' && (
                            <div className="modules-tab-content">
                                <h3 className="section-title">Learning Modules</h3>
                                {!registrationStatus ? (
                                    <div className="registration-required-message">
                                        {/* Registration is required to access modules this message is not working */}
                                        <h4>Registration Required</h4>
                                        <p>Please register for this workshop to access the learning modules.</p>
                                        <button 
                                            onClick={handleRegister} 
                                            className="register-button"
                                        >
                                            Register Now
                                        </button>
                                    </div>
                                ) : (
                                    <div className="module-list">
                                    {/* CRASH FIX: This will now safely map over the modules from workshops.js */}
                                    {/* Using optional chaining '?' as an extra safeguard, though workshop.modules should be guaranteed */}
                                    {workshop.modules?.map((moduleItem, index) => (
                                        <div key={index} className="module-item">
                                            <div className="module-header">
                                                <span className="module-number">Module {index + 1}</span>
                                                <h4 className="module-title-text">{moduleItem.title}</h4>
                                            </div>
                                            <ul className="lesson-list">
                                                {moduleItem.lessons.map((lesson, lessonIndex) => (
                                                    <li key={lessonIndex} className={`lesson-item lesson-type-${lesson.type}`}>
                                                        <span className="lesson-icon">{lesson.type === 'video' ? '🎬' : lesson.type === 'quiz' ? '📝' : '📄'}</span>
                                                        <p className="lesson-name">{lesson.name}</p>
                                                        
                                                        {lesson.type === 'video' && lesson.videoId ? (
                                                            <button 
                                                                className="play-video-button"
                                                                onClick={() => setPlayingVideoId(lesson.videoId)}
                                                            >
                                                                ▶️ Play Video
                                                            </button>
                                                        ) : lesson.type === 'article' ? (
                                                            <Link
                                                                to={`/reading/${workshop.id}/module/${index + 1}/lesson/${lessonIndex}`}
                                                                className="read-article-link"
                                                            >
                                                                📖 Read
                                                            </Link>
                                                        ) : (
                                                            <span className="lesson-duration">{lesson.duration}</span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* Exam/Quiz button */}
                                            {/*please change my exam link path to another name and link to previous link action*/}
                                            {moduleItem.lessons.some(l => l.type === 'quiz') && (
                                                <Link
                                                    to={`/exam/${workshop.id}/module/${index + 1}`}
                                                    state={{ from: `/workshops/${workshop.id}` }}
                                                    className="module-exam-link"
                                                >
                                                    Take Module Assessment →
                                                </Link>
                                            )}
                                            
                                            {/* Link to feedback page for the last module */}
                                            {index === workshop.modules.length - 1 && (
                                                <div style={{ marginTop: 12 }}>
                                                    <Link
                                                        to={`/feedback/${workshop.id}/${index + 1}`}
                                                        className="module-feedback-link"
                                                        state={{ from: `/workshops/${workshop.id}` }}
                                                    >
                                                        Leave Module Feedback →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        )}
                        
                        {/* INSTRUCTOR TAB */}
                        {activeTab === 'instructor' && (
                            <div className="instructor-tab-content">
                                <h3 className="section-title">About the Instructor</h3>
                                <div className="instructor-card">
                                    <div className="instructor-avatar">
                                        {workshop.instructorName.charAt(0)}
                                    </div>
                                    <div className="instructor-info">
                                        <p className="instructor-name">{workshop.instructorName}</p>
                                        <p className="instructor-expertise">{workshop.instructorTopic}</p> 
                                    </div>
                                </div>
                                <p className="instructor-bio">
                                    {workshop.instructorName} is a seasoned professional with over 10 years of experience in {workshop.instructorTopic}. 
                                    They have trained hundreds of students and professionals globally, specializing in practical, hands-on learning.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* SUCCESS MESSAGE BLOCK */}
                {showSuccess && (
                    <div className="success-message-toast">
                        <p className="toast-title">Registration Successful!</p>
                        <p className="toast-subtitle">You have been registered for **"{workshop.title}"**.</p>
                    </div>
                )}

                {/* ERROR MESSAGE BLOCK - Login Required */}
                {showLoginError && (
                    <div className="error-message-toast">
                        <p className="toast-title">Login Required</p>
                        <p className="toast-subtitle">Please login as a student to register for this workshop.</p>
                    </div>
                )}
                {/* Certificate Modal */}
                {showCertModal && (
                    <div
                        className="cert-modal-overlay"
                        onClick={() => setShowCertModal(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000
                        }}
                    >
                        <div
                            className="cert-modal-content"
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: '#fff',
                                borderRadius: 10,
                                padding: 24,
                                width: '92%',
                                maxWidth: 640,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                position: 'relative'
                            }}
                        >
                            <button
                                className="cert-modal-close"
                                onClick={() => setShowCertModal(false)}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: 12,
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: 22,
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ marginTop: 4, marginBottom: 8 }}>Generate Certificate</h3>
                            <p style={{ marginTop: 0, marginBottom: 12, color: '#444' }}>
                                Enter the full name to appear on the certificate. This will be printed exactly as entered.
                            </p>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#333' }}>Full name</label>
                            <input
                                type="text"
                                value={certName}
                                onChange={e => setCertName(e.target.value)}
                                placeholder="e.g. John Doe"
                                className="cert-name-input"
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    fontSize: 16,
                                    borderRadius: 6,
                                    border: '1px solid #cfcfcf',
                                    boxSizing: 'border-box',
                                    marginBottom: 14
                                }}
                            />
                            <div className="cert-modal-actions" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button
                                    className="generate-certificate-confirm"
                                    onClick={handleGenerateCertificateConfirm}
                                    style={{
                                        padding: '10px 14px',
                                        background: '#6a1b9a',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 6,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Generate & Print
                                </button>
                                <button
                                    className="cert-modal-cancel"
                                    onClick={() => setShowCertModal(false)}
                                    style={{
                                        padding: '10px 14px',
                                        background: '#f3f3f3',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                        borderRadius: 6,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WorkshopDetailPage;