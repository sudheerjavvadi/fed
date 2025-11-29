import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Using the real context

const MyRegistrationsPage = () => {
    // Use the actual AuthContext hook
    const { registrations, unregisterWorkshop, userRole } = useAuth();
    
    // State to show a temporary success/undo message
    const [unregisteredMessage, setUnregisteredMessage] = useState(null);

    // Filter registrations to ensure only valid student roles see the page content
    const isStudent = userRole === 'student';

    // Handler for unregister button
    const handleUnregister = (workshopId, workshopTitle) => {
        if (window.confirm(`Are you sure you want to unregister from "${workshopTitle}"?`)) {
            unregisterWorkshop(workshopId);
            setUnregisteredMessage(`Successfully unregistered from: ${workshopTitle}`);
            setTimeout(() => setUnregisteredMessage(null), 4000); // Clear message after 4 seconds
        }
    };

    if (!isStudent) {
        return <div className="access-denied-message">Access Denied. Please log in as a student to view your registrations.</div>;
    }

    return (
        <div className="my-registrations-page-container">
            <h1 className="registrations-page-title">My Registered Workshops</h1>
            <p className="registrations-page-subtitle">View and manage the workshops you have enrolled in.</p>

            {registrations.length === 0 ? (
                <div className="empty-registrations-message">
                    <p className="message-text">You are not currently registered for any workshops.</p>
                    <Link to="/" className="browse-link">Browse Workshops →</Link>
                </div>
            ) : (
                <div className="registration-list">
                    {registrations.map((workshop) => (
                        <div key={workshop.id} className="registered-card">
                            <div className="card-image-wrapper">
                                {/* Using the URL from the WorkshopCard logic, but placeholder for this component */}
                                <img 
                                    src={workshop.image || `https://via.placeholder.com/300x150?text=${workshop.title}`} 
                                    alt={workshop.title} 
                                    className="card-image" 
                                />
                            </div>
                            <div className="card-details">
                                <p className="card-audience">{workshop.audience}</p>
                                <h3 className="card-title">{workshop.title}</h3>
                                
                                <p className="card-time">
                                  <span className="icon">📅</span> 
                                  {workshop.date} at {workshop.time}
                                </p>
                                
                                <div className="card-actions-row">
                                    <Link to={`/workshops/${workshop.id}`} className="view-details-link">
                                      View Details →
                                    </Link>
                                    
                                    <button 
                                        onClick={() => handleUnregister(workshop.id, workshop.title)}
                                        className="unregister-button"
                                    >
                                        Unregister
                                    </button>
                                </div>
                              </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Unregistered Message Toast */}
            {unregisteredMessage && (
                <div className="toast-message-bottom">
                    {unregisteredMessage}
                </div>
            )}
        </div>
    );
};

export default MyRegistrationsPage;