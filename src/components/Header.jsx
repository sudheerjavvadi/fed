// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- NEW IMPORT
import StudentAdminChat from './StudentAdminChat';

const Header = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-left">
          <span className="logo-name">WorkshopFlow</span>
          <nav>
            {/* Workshop Link */}
            <Link to="/" className="nav-link">Workshops</Link>

            {/* NEW: My Registrations Link (Only for Students) */}
            {isLoggedIn && userRole === 'student' && (
              <>
                <Link to="/my-registrations" className="nav-link">My Registrations</Link>
                <Link to="/resources" className="nav-link"> Resources</Link>
                <Link to="/sessions" className="nav-link"> Sessions</Link>
              </>
            )}
            {isLoggedIn && userRole === 'admin' && (
              <Link to="/admin" className="nav-link">              Admin</Link>
            )}

          </nav>
        </div>
        
        <div className="header-right">
          {/* Pro Membership Button (Only for Students) */}
          {isLoggedIn && userRole === 'student' && (
            <Link to="/pro-membership" className="pro-button-link">
              <button 
                className="pro-button"
                title="Upgrade to Pro"
              >
                 Go Pro
              </button>
            </Link>
          )}

          {/* Chat Button (Only for Students) */}
          {isLoggedIn && userRole === 'student' && (
            <button 
              className="chat-button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              title="Open Support Chat"
            >
              💬 Chat
            </button>
          )}

          {/* Login / Logout Button */}
          {isLoggedIn ? (
            <button className="login-button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-button-link">
              <button className="login-button">
                → Login
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Chat Modal */}
      <StudentAdminChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <style jsx>{`
        .header-right {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pro-button-link {
          text-decoration: none;
        }

        .pro-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #333;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 14px;
        }

        .pro-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
        }

        .pro-button:active {
          transform: translateY(0);
        }

        .chat-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 14px;
        }

        .chat-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .chat-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .header-right {
            gap: 8px;
          }

          .pro-button {
            padding: 8px 12px;
            font-size: 12px;
          }

          .chat-button {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;