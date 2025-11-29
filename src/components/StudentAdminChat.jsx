import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const StudentAdminChat = ({ isOpen, onClose }) => {
  const { isLoggedIn, userRole, currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('studentAdminChat');
      if (raw) {
        setMessages(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error loading chat messages', err);
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      sender: userRole === 'admin' ? 'Admin' : currentUser?.fullName || 'Student',
      senderRole: userRole,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    const updated = [...messages, message];
    setMessages(updated);
    
    try {
      localStorage.setItem('studentAdminChat', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving chat messages', err);
    }
    
    setNewMessage('');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Chat Overlay */}
      {isOpen && (
        <div className="chat-overlay" onClick={onClose}></div>
      )}

      {/* Chat Modal */}
      <div className={`student-admin-chat-modal ${isOpen ? 'active' : ''}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <h3>Support Chat</h3>
          <button className="close-chat-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div className="chat-messages-container">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.senderRole === 'admin' ? 'admin-message' : 'student-message'}`}
              >
                <div className="message-content">
                  <strong>{msg.sender}</strong>
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Section */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="send-btn">
            Send
          </button>
        </form>
      </div>

      <style jsx>{`
        .chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }

        .student-admin-chat-modal {
          position: fixed;
          bottom: -500px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 999;
          transition: bottom 0.3s ease-in-out;
        }

        .student-admin-chat-modal.active {
          bottom: 20px;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          border-radius: 8px 8px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          margin: 0;
          font-size: 16px;
        }

        .close-chat-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-chat-btn:hover {
          opacity: 0.8;
        }

        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          background: #f5f5f5;
        }

        .chat-empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: #999;
        }

        .chat-message {
          margin-bottom: 12px;
          display: flex;
          animation: slideIn 0.3s ease-in-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .student-message {
          justify-content: flex-end;
        }

        .admin-message {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 80%;
          padding: 10px 12px;
          border-radius: 8px;
          word-wrap: break-word;
        }

        .student-message .message-content {
          background: #667eea;
          color: white;
        }

        .admin-message .message-content {
          background: white;
          color: #333;
          border: 1px solid #ddd;
        }

        .message-content strong {
          display: block;
          font-size: 12px;
          margin-bottom: 4px;
          opacity: 0.8;
        }

        .message-content p {
          margin: 0;
          font-size: 14px;
        }

        .message-time {
          font-size: 11px;
          display: block;
          margin-top: 4px;
          opacity: 0.7;
        }

        .chat-input-form {
          padding: 12px;
          background: white;
          border-top: 1px solid #ddd;
          display: flex;
          gap: 8px;
          border-radius: 0 0 8px 8px;
        }

        .chat-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .chat-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }

        .send-btn {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .send-btn:hover {
          background: #5568d3;
        }

        .send-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .student-admin-chat-modal {
            width: 90%;
            left: 5%;
            right: 5%;
            bottom: -600px;
            height: 400px;
          }

          .student-admin-chat-modal.active {
            bottom: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default StudentAdminChat;
