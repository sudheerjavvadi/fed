// src/components/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- NEW IMPORT

const LoginPage = () => {
  const { login, loginError } = useAuth(); // Use the login function from context
  const [selectedRole, setSelectedRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // CAPTCHA state
  const [captcha, setCaptcha] = useState(null);
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Generate a new CAPTCHA question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    if (operation === '+') {
      answer = num1 + num2;
    } else if (operation === '-') {
      answer = num1 - num2;
    } else {
      answer = num1 * num2;
    }

    setCaptcha({
      num1,
      num2,
      operation,
      answer: answer.toString()
    });
    setUserCaptchaAnswer('');
    setCaptchaError('');
  };

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setCaptchaError('');

    // Validate CAPTCHA first
    if (!userCaptchaAnswer.trim()) {
      setCaptchaError('Please answer the CAPTCHA question');
      return;
    }

    if (userCaptchaAnswer.trim() !== captcha.answer) {
      setCaptchaError('Incorrect CAPTCHA answer. Please try again.');
      generateCaptcha(); // Generate new CAPTCHA for security
      return;
    }

    // CAPTCHA verified, proceed with login
    const result = login(email, password, selectedRole);
    
    if (!result.success) {
      setError(result.message);
    } else {
      // Reset form on successful login
      setEmail('');
      setPassword('');
      setUserCaptchaAnswer('');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">📖</div>
          <h2>Login to WorkshopFlow</h2>
          <p className="login-subtitle">
            Access your learning dashboard and manage your workshops.
          </p>
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}

        <form className="login-form" onSubmit={handleLogin}> 
          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* CAPTCHA Section */}
          <div className="captcha-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
            <label>Security Verification (CAPTCHA)</label>
            {captcha && (
              <div className="captcha-question" style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ddd' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                  What is {captcha.num1} {captcha.operation} {captcha.num2}?
                </p>
              </div>
            )}
            <input 
              type="text" 
              id="captcha" 
              placeholder="Enter your answer"
              value={userCaptchaAnswer}
              onChange={(e) => setUserCaptchaAnswer(e.target.value)}
              required
              style={{ marginBottom: '8px' }}
            />
            <button 
              type="button" 
              onClick={generateCaptcha}
              style={{ 
                fontSize: '12px', 
                padding: '6px 12px', 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc', 
                borderRadius: '3px', 
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              🔄 Refresh CAPTCHA
            </button>
            {captchaError && <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '8px' }}>{captchaError}</p>}
          </div>

          {/* Role Selection */}
          <div className="role-selection">
            <label>Role</label>
            <div className="roles">
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={selectedRole === 'student'}
                  onChange={() => setSelectedRole('student')}
                />
                Student
              </label>
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="admin" 
                  checked={selectedRole === 'admin'}
                  onChange={() => setSelectedRole('admin')}
                />
                Admin
              </label>
            </div>
          </div>

          <button type="submit" className="login-submit-button">
            Login
          </button>
        </form>

        <p className="register-link-text">
          Don't have an account? <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>

      <footer className="login-footer">
        © 2025 WorkshopFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;