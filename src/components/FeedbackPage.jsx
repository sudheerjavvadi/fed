import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from './FeedbackForm';

const FeedbackPage = () => {
    const { workshopId, moduleId } = useParams();
    const { isLoggedIn, userRole, isRegistered } = useAuth();

    // If not registered, show message with return link
    if (!isRegistered(workshopId)) {
        return (
            <div style={{ padding: 24 }}>
                <h2>Feedback</h2>
                <div style={{ marginTop: 12, padding: 18, border: '1px solid #eee', borderRadius: 8 }}>
                    <p>You must be registered for this workshop to leave feedback.</p>
                    <div style={{ marginTop: 12 }}>
                        <Link to={`/workshops/${workshopId}`}>Return to workshop</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Module Feedback</h2>
            <p style={{ color: '#555' }}>Workshop: {workshopId} — Module: {moduleId}</p>
            <div style={{ marginTop: 12 }}>
                <FeedbackForm workshopId={workshopId} moduleId={moduleId} />
            </div>
        </div>
    );
};

export default FeedbackPage;
