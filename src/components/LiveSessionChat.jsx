import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LiveSessionChat() {
  const { workshopId } = useParams();
  const { isLoggedIn, userRole } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineCount, setOnlineCount] = useState(Math.floor(Math.random() * 15) + 5);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`sessionChat-${workshopId}`);
      if (raw) {
        setMessages(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error loading chat', err);
    }
  }, [workshopId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      author: userRole === 'admin' ? '👨‍🏫 Instructor' : '👤 Student',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstructor: userRole === 'admin'
    };

    const updated = [...messages, message];
    setMessages(updated);
    localStorage.setItem(`sessionChat-${workshopId}`, JSON.stringify(updated));
    setNewMessage('');
  };

  if (!isLoggedIn) {
    return (
      <div className="chat-container">
        <div className="login-prompt">
          <p>Please log in to join the chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Live Chat</h2>
        <span className="online-badge">🔴 {onlineCount} online</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>👋 Be the first to say hello!</p>
          </div>
        ) : (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className={`message ${msg.isInstructor ? 'instructor' : 'student'}`}
            >
              <div className="message-author">
                <strong>{msg.author}</strong>
                <span className="message-time">{msg.timestamp}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
          maxLength="200"
        />
        <button type="submit" className="btn-send">Send</button>
      </form>
    </div>
  );
}
