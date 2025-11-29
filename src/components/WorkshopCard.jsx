// src/components/WorkshopCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const WorkshopCard = ({ workshop }) => {
  const { id, audience, title, topic, image } = workshop; // Destructure the ID

  return (
    <div className="workshop-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" />
      </div>
      
      <div className="card-content">
        <span className={`audience-tag tag-${audience.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
          {audience}
        </span>
        
        <h3 className="card-title">{title}</h3>
        
        <div className="card-topic">
          <span className="icon">🗓️</span> {/* Updated icon for topic/details */}
          <span className="topic-text">{topic}</span>
        </div>
        
        {/* Change to Link with dynamic path */}
        <Link to={`/workshops/${id}`} className="view-details-link">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default WorkshopCard;