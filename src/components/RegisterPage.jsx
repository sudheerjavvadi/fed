// src/components/RegisterPage.jsx (CORRECTED)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const RegisterPage = () => {
  // 1. Initialize state for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student'); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { registerAccount, login } = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault(); // CRITICAL: Prevents default page refresh
    
    setError('');
    setSuccess('');
    
    // Register the account
    const result = registerAccount(fullName, email, password, selectedRole);
    
    if (result.success) {
      setSuccess(result.message);
      // Auto-login after successful registration
      setTimeout(() => {
        login(email, password, selectedRole);
      }, 500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page-container"> 
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">📖</div> 
          <h2>Create an Account</h2>
          <p className="login-subtitle">
            Join WorkshopFlow to start your learning journey today.
          </p>
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '15px', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '4px' }}>{success}</div>}

        {/* 2. ADD onSubmit handler */}
        <form className="login-form" onSubmit={handleRegistration}> 
          
          <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="John Doe"
            value={fullName} // ADDED: Value binding
            onChange={(e) => setFullName(e.target.value)} // ADDED: Change handler
            required
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="m@example.com"
            value={email} // ADDED: Value binding
            onChange={(e) => setEmail(e.target.value)} // ADDED: Change handler
            required
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder=""
            value={password} // ADDED: Value binding
            onChange={(e) => setPassword(e.target.value)} // ADDED: Change handler
            required
          />

          {/* Role Selection (Controlled) */}
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
            Create Account
          </button>
        </form>

        <p className="register-link-text">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>

      <footer className="login-footer">
        © 2025 WorkshopFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;