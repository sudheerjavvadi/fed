import React, { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'WorkNest',
    adminEmail: 'admin@worknest.com',
    maxStudentsPerWorkshop: 50,
    certificateTemplate: 'standard',
    emailNotifications: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    darkMode: false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-page-title">Admin Settings</h1>

      {saved && (
        <div className="success-message">✓ Settings saved successfully!</div>
      )}

      {/* General Settings */}
      <div className="settings-section">
        <h2 className="settings-title">General Settings</h2>
        <div className="settings-group">
          <label>Site Name</label>
          <input 
            type="text" 
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
            placeholder="Enter site name"
          />
        </div>
        <div className="settings-group">
          <label>Admin Email</label>
          <input 
            type="email" 
            value={settings.adminEmail}
            onChange={(e) => handleChange('adminEmail', e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
      </div>

      {/* Workshop Settings */}
      <div className="settings-section">
        <h2 className="settings-title">Workshop Settings</h2>
        <div className="settings-group">
          <label>Max Students Per Workshop</label>
          <input 
            type="number" 
            value={settings.maxStudentsPerWorkshop}
            onChange={(e) => handleChange('maxStudentsPerWorkshop', parseInt(e.target.value))}
            min="1"
            max="500"
          />
        </div>
        <div className="settings-group">
          <label>Certificate Template</label>
          <select 
            value={settings.certificateTemplate}
            onChange={(e) => handleChange('certificateTemplate', e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="professional">Professional</option>
            <option value="formal">Formal</option>
          </select>
        </div>
      </div>

      {/* Feature Settings */}
      <div className="settings-section">
        <h2 className="settings-title">Feature Management</h2>
        <div className="settings-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            <span>Email Notifications</span>
          </label>
          <p className="setting-description">Send email updates to students about course progress</p>
        </div>

        <div className="settings-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={settings.analyticsEnabled}
              onChange={(e) => handleChange('analyticsEnabled', e.target.checked)}
            />
            <span>Analytics</span>
          </label>
          <p className="setting-description">Track and display analytics dashboard</p>
        </div>

        <div className="settings-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
            />
            <span>Dark Mode</span>
          </label>
          <p className="setting-description">Enable dark mode for the admin panel</p>
        </div>
      </div>

      {/* Maintenance */}
      <div className="settings-section">
        <h2 className="settings-title">Maintenance</h2>
        <div className="settings-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            />
            <span>Maintenance Mode</span>
          </label>
          <p className="setting-description">Disable access for students (admin can still access)</p>
        </div>

        <button className="btn-danger">Clear All Student Data</button>
        <button className="btn-danger">Clear Cache</button>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn-save" onClick={handleSave}>💾 Save Settings</button>
      </div>
    </div>
  );
}
