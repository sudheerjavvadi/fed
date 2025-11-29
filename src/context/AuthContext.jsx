import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student', 'admin', or null
  const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
  const [loginError, setLoginError] = useState(null); // Error message for login

  // Registered Accounts (Stores all user accounts)
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    try {
      const raw = localStorage.getItem('registeredAccounts');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Failed to load registered accounts from localStorage', err);
      return [];
    }
  });

  // Registration State (Stores the list of workshop objects the user is registered for)
  const [registrations, setRegistrations] = useState(() => {
    try {
      const raw = localStorage.getItem('registrations');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Failed to load registrations from localStorage', err);
      return [];
    }
  });

  /**
   * Registers a new user account
   * @param {string} fullName - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} role - User's role ('student' or 'admin')
   * @returns {object} - { success: boolean, message: string }
   */
  const registerAccount = (fullName, email, password, role) => {
    setLoginError(null);
    
    // Validate inputs
    if (!fullName || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    // Check if email already exists
    const emailExists = registeredAccounts.some(
      account => account.email.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new account
    const newAccount = {
      id: Date.now().toString(), // Simple unique ID
      fullName,
      email: email.toLowerCase(),
      password, // In production, this should be hashed!
      role,
      createdAt: new Date().toISOString()
    };

    // Add to accounts list
    const updated = [...registeredAccounts, newAccount];
    setRegisteredAccounts(updated);
    
    try {
      localStorage.setItem('registeredAccounts', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to persist registered accounts', err);
      return { success: false, message: 'Failed to save account' };
    }

    return { success: true, message: 'Account created successfully' };
  };

  /**
   * Authenticates user login with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {object} - { success: boolean, message: string }
   */
  const login = (email, password, role) => {
    setLoginError(null);

    // Validate inputs
    if (!email || !password) {
      const error = 'Email and password are required';
      setLoginError(error);
      return { success: false, message: error };
    }

    // Find account by email and password
    const account = registeredAccounts.find(
      acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (!account) {
      const error = 'Invalid email or password';
      setLoginError(error);
      return { success: false, message: error };
    }

    // Check if role matches (optional, can be removed if allowing cross-role login)
    if (role && account.role !== role) {
      const error = 'Role does not match registered account';
      setLoginError(error);
      return { success: false, message: error };
    }

    // Successful login
    setIsLoggedIn(true);
    setUserRole(account.role);
    setCurrentUser(account);

    // Redirect after successful login
    if (account.role === 'admin') {
      navigate('/admin');
    } else if (account.role === 'student') {
      navigate('/');
    }

    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
    setLoginError(null);
    setRegistrations([]); // Clear registrations on logout
    navigate('/'); 
  };

  /**
   * Checks if a user is already registered for a specific workshop.
   * @param {string} workshopId 
   * @returns {boolean}
   */
  const isRegistered = (workshopId) => {
    return registrations.some(w => w.id === workshopId);
  };
  
  /**
   * Adds a workshop to the registrations list.
   * @param {object} workshop - The full workshop object to register for.
   * @returns {boolean} - true if successful, false if already registered.
   */
  const registerWorkshop = (workshop) => {
    if (!isRegistered(workshop.id)) {
      const updated = [...registrations, workshop];
      setRegistrations(updated);
      try {
        localStorage.setItem('registrations', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist registrations', err);
      }
      return true;
    }
    return false;
  };
  
  /**
   * Removes a workshop from the registrations list by ID.
   * This is called when the 'Unregister' button is clicked.
   * @param {string} workshopId 
   */
  const unregisterWorkshop = (workshopId) => {
    // Remove from state and persist the updated registrations list
    const updated = registrations.filter(w => w.id !== workshopId);
    setRegistrations(updated);
    try {
      localStorage.setItem('registrations', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to persist updated registrations', err);
    }

    // Also clear any locally stored completion state for this workshop so
    // re-registering requires completing quizzes again before generating a certificate.
    try {
      const key = 'completedModules';
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data[workshopId]) {
          delete data[workshopId];
          localStorage.setItem(key, JSON.stringify(data));
        }
      }
    } catch (err) {
      console.error('Failed to clear completed modules for workshop', workshopId, err);
    }
  };

  // The value exposed to consumers
  const contextValue = {
    isLoggedIn,
    userRole,
    currentUser,
    registrations, // The list of workshops the student is enrolled in
    login,
    logout,
    loginError,
    registerAccount,
    isRegistered, 
    registerWorkshop,
    unregisterWorkshop, // Essential for the unregister button logic
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};