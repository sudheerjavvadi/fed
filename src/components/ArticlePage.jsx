import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../data/workshops';

const findWorkshopById = (id) => workshopsData.find(w => w.id === id);

const ArticlePage = () => {
    const { workshopId, moduleId, lessonIndex } = useParams();
    const navigate = useNavigate();

    const workshop = findWorkshopById(workshopId);
    if (!workshop) return <div className="loading-message">Workshop not found.</div>;

    const module = workshop.modules?.[Number(moduleId) - 1];
    if (!module) return <div className="loading-message">Module not found.</div>;

    const lesson = module.lessons?.[Number(lessonIndex)];
    if (!lesson) return <div className="loading-message">Lesson not found.</div>;

    const content = lesson.content || `<h2>${lesson.name}</h2><p>Article content not provided for this lesson.</p>`;

    return (
        <div className="article-page-container" style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← Back</button>

            <div className="article-card" style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}>
                <h1 style={{ marginTop: 0 }}>{lesson.name}</h1>
                <p style={{ color: '#666', marginTop: 0 }}>{workshop.title} — {module.title}</p>
                <hr style={{ margin: '18px 0' }} />

                <div className="article-content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default ArticlePage;
