import { useState } from 'react';

const Settings = () => {
  // State for various settings
  const [profile, setProfile] = useState({
    username: 'admin',
    email: 'admin@example.com',
    fullName: 'Admin User',
  });
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    password: '',
    confirmPassword: '',
  });
  const [exportData, setExportData] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Handle profile updates
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Simulate theme application (in a real app, update CSS or context)
    console.log(`Theme changed to: ${e.target.value}`);
  };

  // Handle notification toggle
  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle security changes
  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  // Toggle two-factor authentication
  const toggleTwoFactor = () => {
    setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
    console.log(`Two-factor authentication ${security.twoFactor ? 'disabled' : 'enabled'}`);
  };

  // Handle password update
  const handlePasswordUpdate = () => {
    if (security.password && security.password === security.confirmPassword) {
      console.log('Password updated successfully');
      setShowPasswordModal(false);
      setSecurity({ ...security, password: '', confirmPassword: '' });
    } else {
      alert('Passwords do not match!');
    }
  };

  // Simulate export data
  const handleExport = () => {
    const data = {
      profile,
      notifications,
      security: { twoFactor: security.twoFactor },
    };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    setExportData(url);
    console.log('Data exported');
  };

  // Handle import file
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          setProfile(importedData.profile || profile);
          setNotifications(importedData.notifications || notifications);
          setSecurity(prev => ({
            ...prev,
            twoFactor: importedData.security?.twoFactor || false,
          }));
          console.log('Data imported successfully');
        } catch (error) {
          alert('Invalid file format!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Profile</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleProfileChange}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Email"
          />
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleProfileChange}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Username"
          />
          <button
            onClick={() => console.log('Profile saved:', profile)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Theme Customization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Appearance</h3>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
        >
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationToggle('email')}
              className="mr-2"
            />
            Email Notifications
          </label>
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationToggle('sms')}
              className="mr-2"
            />
            SMS Notifications
          </label>
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationToggle('push')}
              className="mr-2"
            />
            Push Notifications
          </label>
          <button
            onClick={() => console.log('Notifications saved:', notifications)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Notifications
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Security</h3>
        <div className="space-y-4">
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              checked={security.twoFactor}
              onChange={toggleTwoFactor}
              className="mr-2"
            />
            Enable Two-Factor Authentication
          </label>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Data Management</h3>
        <div className="space-y-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Export Settings
          </button>
          {exportData && (
            <a
              href={exportData}
              download="settings.json"
              className="text-indigo-400 hover:underline"
            >
              Download Exported Data
            </a>
          )}
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
            <input
              type="password"
              name="password"
              value={security.password}
              onChange={handleSecurityChange}
              className="w-full p-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={security.confirmPassword}
              onChange={handleSecurityChange}
              className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="Confirm Password"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;